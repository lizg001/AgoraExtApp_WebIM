import React from 'react'
import { useSelector } from 'react-redux'
import { Flex, Text, Image } from 'rebass'
import { Tag } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { getRoomWhileList } from '../../../api/chatroom'
import WebIM from '../../../utils/WebIM'
import iconMute from '../../../themes/img/icon-mute.svg'
import iconChat from '../../../themes/img/icon-chat.svg'
import iconDelete from '../../../themes/img/icon-delete.svg'
import avatarUrl from '../../../themes/img/avatar-big@2x.png'

// 消息渲染
const MessageItem = ({ message, setShowModal, setRecallMsgId }) => {
    const isTeacher = useSelector(state => state.loginInfo.ext)
    const roomMuteList = useSelector(state => state.room.muteList)
    // 聊天框禁言
    const onSetMute = (message) => {
        let options = {
            chatRoomId: message.to,   // 聊天室id
            users: [message.from]   // 成员id列表
        };
        WebIM.conn.addUsersToChatRoomWhitelist(options).then((res) => {
            getRoomWhileList(message.to)
        })
    }
    // 聊天框移除禁言
    const onRemoveMute = (message) => {
        let options = {
            chatRoomId: message.to,  // 群组id
            userName: message.from            // 要移除的成员
        }
        WebIM.conn.rmUsersFromChatRoomWhitelist(options).then((res) => {
            getRoomWhileList(message.to)
        })
    }
    // 打开确认框
    const openModal = (val) => {
        setShowModal('block')
        setRecallMsgId(val)
    }

    let isTextMsg = message.type === 'txt' || message.contentsType === 'TEXT';
    let isCustomMsg = message.contentsType === "CUSTOM";
    let isCmdMsg = message.contentsType === 'COMMAND' || message.type === "cmd"
    let isShowIcon = (Number(isTeacher) === 1 || Number(isTeacher) === 3)


    return (
        <div key={message.id}>
            {
                isCmdMsg && (
                    <div style={{
                        display: 'flex', justifyContent: 'center'
                    }}>
                        <Text fontSize='12px' color='#7C848C'>{message.ext.nickName || '您'}删除了一条消息</Text>
                    </div>
                )
            }
            {
                isTextMsg && (
                    <Flex className="msg-list-item">
                        <img className='msg-img' src={message.ext.avatarUrl || avatarUrl}/>
                        <Flex flexDirection="column">
                            <Flex alignItems="center">
                                {/* 主讲/辅导tag */}
                                {(message.ext.role === 1 || message.ext.role === 3) && <Tag className='tags'>
                                    {message.ext.role === 1 && '主讲老师'}{message.ext.role === 3 && '辅导老师'}
                                </Tag>}
                                {/* 昵称/姓名 */}
                                <Text className='msg-sender' color={(message.ext.role === 1 || message.ext.role === 3) && '#0099FF'}>{message.ext.nickName || message.from}</Text>
                                {/* 禁言/删除按钮 */}
                                {isShowIcon &&
                                    <>
                                        {!roomMuteList.includes(message.from) ? (
                                            message.ext.role === 2 && <img src={iconChat} className='message-tool-icon' onClick={() => { onSetMute(message) }} />
                                        ) : (
                                            message.ext.role === 2 && <img src={iconMute} className='message-tool-icon' onClick={() => { onRemoveMute(message) }} />
                                        )}
                                        <img src={iconDelete} className='message-tool-icon' onClick={() => { openModal(message.id) }} />
                                    </>
                                }
                            </Flex>
                            <div className='msg-text'>{message.msg || message.data}</div>
                        </Flex>
                    </Flex>
                )
            }
        </div>
    )
}
export default MessageItem