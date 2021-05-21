import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Tabs } from 'antd';
import { Text } from 'rebass'
import ToolBar from '../ToolBar'
import MessageItem from './MessageItem'
import UserItem from './UserItem'
import QaMessage from './QaMessage'

import './styles/list.css'

const { TabPane } = Tabs;


// 列表项
const MessageList = () => {
    // 控制 Toolbar 组件是否展示
    const [hide, sethide] = useState(false);
    // 控制 Toolbar 组件是否展示图片 
    const [isTool, setIsTool] = useState(false);
    const userName = useSelector((state) => state.loginName);
    const roomAdmins = useSelector((state) => state.room.admins);
    const roomOwner = useSelector((state) => state.room.info.owner);
    const messageList = useSelector(state => state.messages.list) || [];
    const userList = useSelector(state => state.room.info.affiliations);
    const qaList = useSelector(state => state.messages.qaList) || [];
    const isHide = useSelector(state => state.isReward).checked;
    let arrCount = (messageList.length !== 0);
    let qaCount = (qaList.length !== 0)

    let hasEditPermisson = roomAdmins.includes(userName) || userName === roomOwner;

    const callback = (key) => {
        switch (key) {
            case "1":
                sethide(false)
                break;
            case "2":
                sethide(false);
                setIsTool(true)
                break;
            case "3":
                sethide(true)
                break;
            default:
                break;
        }
    }
    return (
        <div className='message'>
            {hasEditPermisson ? (
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="聊天" key="1">
                        <div className="message-list">
                            {
                                arrCount ? (
                                    <MessageItem messageList={messageList} isHide={isHide} />
                                ) : (
                                        <Text textAlign='center' color='#D3D6D8'>暂无消息</Text>
                                    )
                            }
                        </div>
                        <ToolBar hide={hide} />
                    </TabPane>
                    <TabPane tab="提问" key="2">
                        <div className="message-list">
                            {
                                qaCount ? (
                                    <QaMessage qaList={qaList} />
                                ) : (
                                        <Text textAlign='center' color='#D3D6D8'>暂无提问消息</Text>
                                    )
                            }
                        </div>
                        <ToolBar hide={hide} isTool={isTool} />
                    </TabPane>
                    <TabPane tab="成员" key="3">
                        <div className="user-list">
                            <UserItem userList={userList} />
                        </div>
                    </TabPane>
                </Tabs>
            ) : (
                    <div className="member-msg">
                        {
                            arrCount ? (
                                <MessageItem messageList={messageList} isHide={isHide} />
                            ) : (
                                    <Text textAlign='center' color='#D3D6D8'>暂无消息</Text>
                                )
                        }
                    </div>
                )}

        </div>
    )
}

export default MessageList