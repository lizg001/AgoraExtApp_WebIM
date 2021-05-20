import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Button, Input } from 'antd'
import { SmileOutlined } from '@ant-design/icons';
import { Flex, Text } from 'rebass'
import WebIM from '../../utils/WebIM'
import store from '../../redux/store'
import { roomMessages } from '../../redux/aciton'

import './index.css'

const ChatBox = () => {
    const roomId = useSelector((state) => state.room.info.id);
    const [count, setCount] = useState(0)
    const [content, setContent] = useState('')
    const changeCount = (e) => {
        let msgCentent = e.target.value;
        let msgCount = msgCentent.length;
        setCount(msgCount);
        setContent(msgCentent);
    }
    const sendMessage = (roomId, content) => {
        let id = WebIM.conn.getUniqueId();         // 生成本地消息id
        let msg = new WebIM.message('txt', id); // 创建文本消息
        let option = {
            msg: content,          // 消息内容
            to: roomId,               // 接收消息对象(聊天室id)
            chatType: 'chatRoom',            // 群聊类型设置为聊天室
            ext: {
                msgType: 0,             // 消息类型
                roomUuid: '课堂id'
            },                         // 扩展消息
            success: function (id, serverId) {
                console.log('send room text success', id, serverId);
                store.dispatch(roomMessages(msg.body));
                setContent('');
            },                               // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
            fail: function (err) {
                console.log('failed', err);
            }                                // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
        };
        msg.set(option);
        WebIM.conn.send(msg.body);

    }
    return (
        <div className='box'>
            <SmileOutlined className='emoji-icon' />

            <Input.TextArea
                placeholder="请输入内容..."
                onChange={(e) => changeCount(e)}
                className="msg-box"
                value={content}
            />
            <Flex alignItems="center" justifyContent="flex-end" color="#A8ADB2" m='5px' >
                <Text>{count}/100</Text>
                <Button
                    onClick={() => { sendMessage(roomId, content) }}
                    className="msg-btn"
                >
                    发送
                </Button>
            </Flex>

        </div >
    )
}

export default ChatBox;