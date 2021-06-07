import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Flex, Text, Image } from 'rebass'
import { Tag } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { getRoomMuteList } from '../../../api/chatroom'
import WebIM from '../../../utils/WebIM'
import iconMute from '../../../themes/img/icon-mute.svg'
import iconChat from '../../../themes/img/icon-chat.svg'
import iconDelete from '../../../themes/img/icon-delete.svg'

// 消息渲染
const MessageItem = ({ message, setShowModal, setRecallMsgId }) => {
    const isTeacher = useSelector(state => state.loginInfo.ext)
    // 控制展示的禁言图标
    const [icon, setIcon] = useState(false);
    // 聊天框禁言
    const onSetMute = (message) => {
        let options = {
            chatRoomId: message.to, // 聊天室id
            username: message.from,     // 被禁言的聊天室成员的id
            muteDuration: -1000       // 被禁言的时长，单位ms，如果是“-1000”代表永久
        };
        WebIM.conn.muteChatRoomMember(options).then((res) => {
            getRoomMuteList(message.to);
            setIcon(true);
        })

    }
    // 聊天框移除禁言
    const onRemoveMute = (message) => {
        let options = {
            chatRoomId: message.to, // 聊天室id
            username: message.from        // 解除禁言的聊天室成员的id
        };
        WebIM.conn.removeMuteChatRoomMember(options).then((res) => {
            getRoomMuteList(message.to);
            setIcon(false);
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
    // let isShowIcon = !(message.from === '' || message.ext.role === 3) && (Number(isTeacher) === 1 || Number(isTeacher) === 3)
    let isShowIcon = (Number(isTeacher) === 1 || Number(isTeacher) === 3)


    return (
        <div style={{ marginTop: '16px' }} key={message.id}>
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
                        <img className='msg-img' src={message.ext.avatarUrl || 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-fde5891065510ef51e4c8dc19f6f3aff_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624035646&t=52e70633abb73d7e2e0d2bd3f0446505'}/>
                        <Flex flexDirection="column">
                            <Flex alignItems="center">
                                {/* 主讲/辅导tag */}
                                {(message.ext.role === 1 || message.ext.role === 3) && <Tag className='tags'>
                                    {message.ext.role === 1 && '主讲老师'}{message.ext.role === 3 && '辅导老师'}
                                </Tag>}
                                {/* 昵称/姓名 */}
                                <Text className='msg-sender' color={message.ext.role === 1 || message.ext.role === 3 && '#0099FF'}>{message.ext.nickName || message.from}</Text>
                                {/* 禁言/删除按钮 */}
                                {isShowIcon &&
                                    <>
                                        {!icon ? (
                                            <img src={iconChat} className='message-tool-icon' onClick={() => { onSetMute(message) }} />
                                        ) : (
                                            <img src={iconMute} className='message-tool-icon' onClick={() => { onRemoveMute(message) }} />
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
            {/* {
                isCustomMsg && (
                    <div>
                        <Flex >
                            <div>
                                <Image src={message.ext.avatarUrl || 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-0e98d843ef66ae5e9ec846a7c5f98224_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624523290&t=b9ac1951a67c179055c564b21086bd0c'} className='msg-img' />
                            </div>
                            <Flex >
                                <Text className='msg-sender' ml='8px'>{message.ext.nickName || message.from}</Text>
                            </Flex>
                        </Flex>
                        <Flex className='msg' alignItems='center' ml='28px'>
                            <Text mr='2px' className='admire-msg'>{message.customExts.des}</Text>
                            <Image src={message.customExts.url} width='24px' height='24px'></Image>
                        </Flex>
                    </div>
                )
            } */}
        </div>
    )
}
export default MessageItem