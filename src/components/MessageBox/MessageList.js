import { useSelector } from 'react-redux'
import { Tabs } from 'antd';
import MessageItem from './MessageItem'
import './list.css'

const { TabPane } = Tabs;

// 列表项
const MessageList = () => {
    // const roomCount = useSelector((state) => state.room.info.affiliations);
    const messageList = useSelector(state => state.message?.list) || []
    return (
        <div>
            <Tabs defaultActiveKey="1" onChange={() => { }}>
                <TabPane tab="聊天" key="1">
                    <div className="message_list">聊天页</div>
                </TabPane>
                <TabPane tab="提问" key="2">
                    <div className="message_list">提问页</div>
                </TabPane>
                <TabPane tab="成员" key="3">
                    <div className="message_list">
                        成员列表
                    </div>
                </TabPane>
            </Tabs>
            {messageList.map(message => (
                <MessageItem message={message} />
            ))}
        </div>
    )
}

export default MessageList