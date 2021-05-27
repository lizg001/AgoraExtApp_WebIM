import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Flex, Text, Image } from 'rebass'
import { Tag, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import store from '../../../redux/store'
import { roomMessages } from '../../../redux/aciton'
import WebIM from '../../../utils/WebIM'
import './msgItem.css'

// 禁言开关
// const onMute = (checked) => {
//     console.log('onMute', checked);
//     if (checked) {

//     }
// }

// 消息渲染
const MessageItem = ({ messageList, isHiedReward, hasEditPermisson, activeKey }) => {
    let roomId = useSelector(state => state.room.info.id)
    // 控制弹框
    const [showModal, setShowModal] = useState('none');
    const [recallMsgId, setRecallMsgId] = useState('');
    let renderMsgs = messageList
    if (isHiedReward) {
        renderMsgs = messageList.filter((item) => item.contentsType !== 'CUSTOM')
    }
    if (!renderMsgs?.length) {
        return (
            <Text textAlign='center' color='#D3D6D8'>暂无消息</Text>
        )
    }

    // 删除消息
    const deleteMsg = (roomId, recallId, activeKey) => {
        debugger
        let id = WebIM.conn.getUniqueId();            //生成本地消息id
        let msg = new WebIM.message('cmd', id); //创建命令消息
        msg.set({
            to: roomId,                        //接收消息对象
            action: 'DEL',                     //用户自定义，cmd消息必填
            chatType: 'chatRoom',
            ext: {
                msgtype: 0,
                msgId: recallId
            },    //用户自扩展的消息内容（群聊用法相同）
            success: function (id, serverMsgId) {
                console.log(id, serverMsgId);
                setShowModal('none')
            }, //消息发送成功回调 
            fail: function (e) {
                console.log("Fail", e); //如禁言、拉黑后发送消息会失败
            }
        });
        WebIM.conn.send(msg.body);
        store.dispatch(roomMessages(msg.body, { showNotice: !activeKey }))
    }
    const openModal = (val) => () => {
        setShowModal('block')
        setRecallMsgId(val)
    }

    return (
        <div >
            <div>
                {renderMsgs.map((message) => {
                    let isTextMsg = message.type === 'txt' || message.contentsType === 'TEXT';
                    let isCustomMsg = message.contentsType === "CUSTOM";
                    let isCmdMsg = message.contentsType === 'COMMAND' || message.type === "cmd"
                    return <div style={{ marginTop: '10px' }} key={message.id}>
                        {
                            isCmdMsg && (
                                <div style={{
                                    display: 'flex', justifyContent: 'center'
                                }}>
                                    <Text fontSize='12px' color='#7C848C'>{message.from || '您'}删除了一条消息</Text>
                                </div>
                            )
                        }
                        {
                            isTextMsg && (
                                <div>
                                    <Flex >
                                        <div>
                                            <Image src={message.ext.avatarUrl || 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-fde5891065510ef51e4c8dc19f6f3aff_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624035646&t=52e70633abb73d7e2e0d2bd3f0446505'}
                                                className='msg-img'
                                            />
                                        </div>
                                        <Flex >
                                            {(message.ext.role === 0) && <Tag className='tags'>主讲老师</Tag>}
                                            {(message.ext.role === 3) && <Tag className='tags'>助教老师</Tag>}
                                            <Text className='msg-sender' ml='8px'>{message.ext.nickName || message.from}</Text>
                                            {hasEditPermisson && (<>
                                                {/* <Switch size="small" title="禁言" onChange={onMute} style={{ marginLeft: '5px' }} /> */}
                                                {/* () => {deleteMsg((roomId, message.id, activeKey))} */}
                                                <DeleteOutlined className='delete-icon' title="删除消息" onClick={openModal(message.id)} />
                                            </>)}
                                        </Flex>
                                    </Flex>
                                    <div className='msg msg-text'>
                                        <Text>{message.msg || message.data}</Text>
                                    </div>
                                </div>
                            )
                        }
                        {
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
                                        <Text mr='2px'>{message.customExts.des}</Text>
                                        <Image src={message.customExts.url} width='24px' height='24px'></Image>
                                    </Flex>
                                </div>
                            )
                        }
                    </div>
                })
                }
            </div>
            {/* 弹窗 */}
            <div style={{ display: `${showModal}` }}>
                <div className='mask'>
                </div>
                <div className='card'>
                    <Text className='crad-text' mt='20px'>确定要删除此消息吗？</Text>
                    <Flex justifyContent='space-between' mt='25px' p='0 10px' >
                        <Button className='cancle-btn' onClick={() => { setShowModal('none') }}>取消</Button>
                        <Button className='ok-btn' onClick={() => { deleteMsg(roomId, recallMsgId, activeKey) }}>确定</Button>
                    </Flex>
                </div>
            </div>

        </div>
    )
}
export default MessageItem