import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Tabs } from 'antd';
import { Text, Flex } from 'rebass'
import ToolBar from '../ToolBar'
import MessageItem from './Message/MessageItem'
import QuestionMessage from './QaList/QuestionMessage'
import { CHAT_TABS, CHAT_TABS_KEYS } from './constants'
import store from '../../redux/store'
import { removeChatNotification, removeQaNotification } from '../../redux/aciton'

import './list.css'
// import { FastBackwardFilled } from '@ant-design/icons';

const { TabPane } = Tabs;

// 列表项
const MessageList = ({ activeKey, setActiveKey }) => {
  // 控制 Toolbar 组件是否展示
  const [hide, sethide] = useState(false);
  // 控制 Toolbar 组件是否展示图片 
  const [isTool, setIsTool] = useState(false);
  const [qaUser, setQaUser] = useState('');
  // const [question,serQuestion] = useState(false);
  const userName = useSelector((state) => state.loginName);
  const roomAdmins = useSelector((state) => state.room.admins);
  const roomOwner = useSelector((state) => state.room.info.owner);
  const messageList = useSelector(state => state.messages.list) || [];
  const notification = useSelector(state => state.messages.notification);
  const userList = useSelector(state => state.room.users);
  // 是够隐藏赞赏消息
  const isHiedReward = useSelector(state => state.isReward).checked;
  // 是否为提问消息
  const isHiedQuestion = useSelector(state => state.isQa).checked;
  // 是否有权限
  let hasEditPermisson = roomAdmins.includes(userName) || userName === roomOwner;

  // 切换 tab 
  const handleTabChange = (key) => {
    setActiveKey(key)
    switch (key) {
      case "CHAT":
        sethide(false);
        setIsTool(false);
        store.dispatch(removeChatNotification(false))
        break;
      case "QA":
        sethide(false);
        setIsTool(true);
        store.dispatch(removeQaNotification(false))
        break;
      case "USER":
        sethide(true)
        break;
      default:
        break;
    }
  }

  // 需要拿到选中的提问者id
  const getClickUser = (user) => {
    setQaUser(user)
  }

  return (
    <div className='message'>
      {hasEditPermisson ? (
        <Tabs activeKey={activeKey} onChange={handleTabChange}>
          {
            CHAT_TABS.map(({ key, name, component: Component, className }) => (
              <TabPane tab={<Flex>
                <Text whiteSpace="nowrap">{name}</Text>
                {Boolean(notification[key]) && (
                  console.log('notification', notification[key]),
                  <Text ml="6px" whiteSpace="nowrap" color="red" fontSize='20px'>·</Text>
                )}
              </Flex>} key={key}>
                <div className={className}>
                  <Component {
                    ...key === CHAT_TABS_KEYS.chat && {
                      messageList,
                      isHiedReward,
                      hasEditPermisson,
                      activeKey
                    }
                  } {...key === CHAT_TABS_KEYS.qa && {
                    getClickUser
                  }} {...key === CHAT_TABS_KEYS.user && {
                    userList
                  }} />
                </div>
              </TabPane>
            ))
          }
        </Tabs>
      ) : (
          isHiedQuestion ? (
            <div className="member-msg">
              <QuestionMessage userName={userName} />
            </div>
          ) : (
              <div className="member-msg">
                {
                  messageList.length > 0 ? (
                    <MessageItem messageList={messageList} isHiedReward={isHiedReward} />
                  ) : (
                      <Text textAlign='center' color='#D3D6D8'>暂无消息</Text>
                    )
                }
              </div>
            )
        )}
      <ToolBar hide={hide} isTool={isTool} qaUser={qaUser} activeKey={activeKey} />
    </div>
  )
}
export default MessageList