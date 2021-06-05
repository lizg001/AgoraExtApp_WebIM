import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Tabs } from 'antd';
import { Text, Flex } from 'rebass'
import _ from 'lodash'
import ToolBar from '../ToolBar'
import MessageItem from './Message/index'
import QuestionMessage from './QaList/QuestionMessage'
import { CHAT_TABS, CHAT_TABS_KEYS } from './constants'
import store from '../../redux/store'
import { removeChatNotification } from '../../redux/aciton'

import './list.css'

const { TabPane } = Tabs;

// 列表项
const MessageList = ({ activeKey, setActiveKey }) => {
  // 控制 Toolbar 组件是否展示
  const [hide, sethide] = useState(true);
  // 控制 Toolbar 组件是否展示图片 
  const [isTool, setIsTool] = useState(false);
  const [qaUser, setQaUser] = useState('');
  const userName = useSelector((state) => state.loginName);
  const userCount = useSelector(state => state.room.info.affiliations_count);
  console.log('userCount-->list', userCount);
  // 判断当前登陆的用户权限
  const isTeacher = useSelector(state => state.loginInfo.ext)
  const messageList = useSelector(state => state.messages.list) || [];
  const notification = useSelector(state => state.messages.notification);

  // 是否隐藏赞赏消息
  const isHiedReward = useSelector(state => state.isReward);
  // 是否为提问消息
  const isHiedQuestion = useSelector(state => state.isQa);
  // 是否有权限
  let hasEditPermisson = (Number(isTeacher) === 1 || Number(isTeacher) === 3)




  // 获取提问列表
  const qaList = useSelector(state => state.messages.qaList) || [];
  let bool = _.find(qaList, (v, k) => {
    return v.showRedNotice
  })
  useEffect(() => {
    if (activeKey === 'USER') {
      sethide(false)
    } else if (activeKey === 'QA') {
      setIsTool(true);
    } else return
  }, [activeKey])
  // 切换 tab 
  const handleTabChange = (key) => {
    setActiveKey(key)
    switch (key) {
      case "CHAT":
        sethide(true);
        setIsTool(false);
        store.dispatch(removeChatNotification(false))
        break;
      case "QA":
        sethide(true);
        setIsTool(true);
        break;
      case "USER":
        sethide(false)
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
                <Text whiteSpace="nowrap">{name === '成员' ? `${name}(${userCount - 1})` : name}</Text>
                {name === '提问' && bool && bool.showRedNotice && (
                  <Text ml="6px" whiteSpace="nowrap" color="red" fontSize='40px'>·</Text>
                )}
                {name !== '提问' && Boolean(notification[key]) && (
                  <Text ml="6px" whiteSpace="nowrap" color="red" fontSize='40px'>·</Text>
                )}
              </Flex>} key={key}>
                <div className={className}>
                  <Component {
                    ...key === CHAT_TABS_KEYS.chat && {
                      messageList,
                      isHiedReward,
                      activeKey
                    }
                  } {...key === CHAT_TABS_KEYS.qa && {
                    getClickUser
                  }} {...key === CHAT_TABS_KEYS.user && {

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
                      <div>
                        <Text textAlign='center' color='#D3D6D8'>暂无消息</Text>
                      </div>
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