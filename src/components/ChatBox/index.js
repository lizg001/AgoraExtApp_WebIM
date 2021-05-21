import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { Button, Input, message } from 'antd'
import { SmileOutlined } from '@ant-design/icons';
import { Flex, Text } from 'rebass'
import WebIM from '../../utils/WebIM'
import store from '../../redux/store'
import { Emoji } from '../../utils/emoji'
import { roomMessages } from '../../redux/aciton'

import './index.css'

// 展示表情
const ShowEomji = ({ getEmoji }) => {
    console.log('ShowEomji-----');
    return (
        <div className='emoji-all'>
            {Emoji.map(emoji => {
                return <span className='emoji-content'
                    onClick={getEmoji}
                >{emoji}</span>
            })}
        </div>
    )
}

const ChatBox = ({ isMute, isAdmins, isImg }) => {
    console.log('isImg---', isImg);
    const roomId = useSelector((state) => state.room.info.id);
    const [count, setCount] = useState(0);
    const [content, setContent] = useState('');
    const [isEmoji, setIsEmoji] = useState(false);
    const getEmoji = (e) => {
        console.log('e.target.innerText', e.target.innerText);
        const emojiMsg = String(e.target.innerText);
        let msg = '';
        msg += emojiMsg;
        setContent(msg)
    }
    const changeMsg = (e) => {
        let msgCentent = e.target.value;
        let msgCount = msgCentent.length;
        setCount(msgCount);
        setContent(msgCentent);
    }
    // 发送消息
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
                message.error('发送失败，消息内容包含非法字符！');
            }                                // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
        };
        msg.set(option);
        WebIM.conn.send(msg.body);

    }

    // 显示表情框
    const showEmoji = () => {
        setIsEmoji(true)
    }
    // 隐藏表情框
    const hideEmoji = () => {
        console.log('hideEmoji---');
        setIsEmoji(false)
    }

    // 禁言后，判断权限是否遮盖输入框
    const isMuted = isMute && !isAdmins
    return (
        <div className='box'>
            {isMuted ? (
                <Flex className='msg-box-mute'>
                    <Text className='mute-msg'>全员禁言中</Text>
                </Flex>
            ) : (
                    <div className='chat-box'>
                        {isEmoji && <ShowEomji getEmoji={getEmoji} />}

                        <SmileOutlined className='emoji-icon' onClick={showEmoji} />
                        <Input.TextArea
                            placeholder="请输入内容..."
                            onChange={(e) => changeMsg(e)}
                            className="msg-box"
                            autoFocus
                            value={content}
                            onClick={hideEmoji}
                        />
                        <div className='btn-tool'>
                            <Text>{count}/100</Text>
                            <Button
                                onClick={() => { sendMessage(roomId, content) }}
                                className="msg-btn"
                            >
                                发送
                                </Button>
                        </div>
                    </div>

                )}
        </div>
    )
    // }
}

export default ChatBox;