import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Tabs } from 'antd';
import { Text } from 'rebass'
import ToolBar from '../ToolBar'
import MessageItem from './MessageItem'
import UserItem from './UserItem'

import './list.css'

const { TabPane } = Tabs;


// 列表项
const MessageList = () => {
    // 控制 Toolbar
    const [hide, setHide] = useState(false);
    const userName = useSelector((state) => state.loginName);
    const roomAdmins = useSelector((state) => state.room.admins);
    const roomOwner = useSelector((state) => state.room.info.owner);
    const messageList = useSelector(state => state.messages.list) || [];
    const userList = useSelector(state => state.room.info.affiliations)
    const isHide = useSelector(state => state.isReward).checked;
    let arrCount = (messageList.length !== 0);

    let hasEditPermisson = roomAdmins.includes(userName) || userName === roomOwner;

    const callback = (key) => {
        switch (key) {
            case "1":
                setHide(false)
                break;
            case "2":
                setHide(false)
                break;
            case "3":
                setHide(true)
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
                    </TabPane>
                    <TabPane tab="提问" key="2">
                        <div className="message-list">提问页</div>
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

            <ToolBar hide={hide} />
        </div>
    )
}

export default MessageList