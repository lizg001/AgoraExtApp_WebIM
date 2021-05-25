import React, { useState, useRef } from 'react'
import { useSelector } from "react-redux";
import { Button, Input, message } from 'antd'
import { SmileOutlined, LeftSquareOutlined } from '@ant-design/icons';
import { Flex, Text } from 'rebass'
import WebIM from '../../utils/WebIM'
import store from '../../redux/store'
import { Emoji } from '../../utils/emoji'
import { roomMessages, qaMessages } from '../../redux/aciton'

import './index.css'

const ImageIcon = () => (
    <svg t="1621616563603" className="icon img-icon " viewBox="0 0 1121 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2520" width="16" height="16">
        <path d="M977.326055 0.000244H145.547377A143.830428 143.830428 0 0 0 1.448791 143.465001V821.783926a42.954104 42.954104 0 0 0 0 21.940235v36.810838a143.830428 143.830428 0 0 0 144.098586 143.464757h831.7543a143.830428 143.830428 0 0 0 144.098586-143.464757V143.586891A143.830428 143.830428 0 0 0 977.326055 0.000244zM145.571755 87.322378h831.7543a56.435159 56.435159 0 0 1 56.386404 56.069489v544.849163a965.85789 965.85789 0 0 0-113.089722-130.056836 103.77731 103.77731 0 0 0-88.029097-27.449671c-52.315271 7.484058-109.701174 50.828211-175.13183 132.226481a1046.622332 1046.622332 0 0 0-41.442665 55.19188c-57.654061-79.204247-171.060697-225.472479-267.23206-292.853378a101.510153 101.510153 0 0 0-93.050973-14.041751c-35.396912 11.530812-69.867459 41.442666-104.947456 91.368889a825.220985 825.220985 0 0 0-62.017731 106.044468V143.465001a56.508294 56.508294 0 0 1 56.776452-56.142623z" fill="#A3A6BC" p-id="2521"></path><path d="M743.516287 299.703851a101.827067 101.827067 0 1 0 101.827067-101.827068 101.827067 101.827067 0 0 0-101.827067 101.827068z" fill="#A3A6BC" p-id="2522"></path></svg>
);


// 展示表情
const ShowEomji = ({ getEmoji }) => {
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

const ChatBox = ({ isMute, isAdmins, isTool, qaUser, activeKey }) => {
    const roomId = useSelector((state) => state.room.info.id);
    const isQa = useSelector((state) => state.isQa).checked;
    const userInfo = useSelector((state) => state.loginInfo);
    const roomOwner = useSelector(state => state.room.info.owner);
    const roomAdmins = useSelector(state => state.room.admins);
    const [count, setCount] = useState(0);
    const [content, setContent] = useState('');
    const [isEmoji, setIsEmoji] = useState(false);

    const logName = WebIM.conn.context.userId;
    const isOwner = logName === roomOwner;
    const isAdmin = roomAdmins.includes(logName);

    let roomUid = localStorage.getItem("roomUuid")
    let qaType = 0;
    let requestUser = '';
    let loginId = WebIM.conn.context.userId;
    let avatarUrl = userInfo.avatarurl;
    let userNickName = userInfo.nickname;
    let roleType = 2;
    if (isTool) {
        qaType = 2;
        requestUser = qaUser || loginId
    } else if (isQa) {
        qaType = 1;
        requestUser = qaUser || loginId
    }
    if (!userInfo.avatarurl) {
        avatarUrl = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-0e98d843ef66ae5e9ec846a7c5f98224_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624523290&t=b9ac1951a67c179055c564b21086bd0c';
    }
    if (!userInfo.nickname) {
        userNickName = '学生测试'
    }

    if (isOwner) {
        roleType = 1;
    } else if (isAdmin) {
        roleType = 3;
    }

    // 发送图片消息，及获取input 值
    const couterRef = useRef();
    const updateImage = () => {
        couterRef.current.focus()
        couterRef.current.click()
    }

    // 获取到点击的表情，加入到输入框
    const getEmoji = (e) => {
        let emojiMsg = content + e.target.innerText;
        setContent(emojiMsg)
    }
    // 输入框消息
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
                msgtype: qaType,   // 消息类型
                roomUuid: roomUid,
                asker: requestUser,
                role: roleType,
                avatarUrl: avatarUrl,
                nickName: userInfo.nickname
            },                         // 扩展消息
            success: function (id, serverId) {
                if (msg.body.ext.msgtype === 2) {
                    store.dispatch(qaMessages(msg.body, msg.body.ext.asker, { showNotice: !activeKey }));
                    // store.dispatch(qaMessages(message, asker, { showNotice: currentTab !== CHAT_TABS_KEYS.qa && msgtype === 1 }))
                } else if (msg.body.ext.msgtype === 1) {
                    store.dispatch(qaMessages(msg.body, msg.body.ext.asker, { showNotice: !activeKey }));
                } else {
                    store.dispatch(roomMessages(msg.body, { showNotice: !activeKey }));
                }
                setContent('');
            },                               // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
            fail: function (err) {
                console.log('err', err);
                if (err.type === 501) {
                    message.error('发送失败，消息内容包含非法字符！');
                    setTimeout(() => {
                        message.destroy();
                    }, 3000);
                }
                // message.error('发送失败，消息内容包含非法字符！');
                // setTimeout(() => {
                //     message.destroy();
                // }, 3000);
            }                                // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
        };
        msg.set(option);
        WebIM.conn.send(msg.body);
    }
    // 发送图片
    const sendImgMessage = (roomId, e) => {
        var id = WebIM.conn.getUniqueId();                   // 生成本地消息id
        var msg = new WebIM.message('img', id);        // 创建图片消息
        let file = WebIM.utils.getFileUrl(e.target)     // 将图片转化为二进制文件
        var allowType = {
            'jpg': true,
            'gif': true,
            'png': true,
            'bmp': true
        };
        if (file.filetype.toLowerCase() in allowType) {
            var option = {
                file: file,
                length: '3000',                       // 视频文件时，单位(ms)
                to: roomId,
                ext: {
                    msgtype: qaType,   // 消息类型
                    roomUuid: '课堂id',
                    asker: requestUser,
                    role: roleType
                },                       // 接收消息对象
                chatType: 'chatRoom',               // 设置为单聊
                onFileUploadError: function () {      // 消息上传失败
                    console.log('onFileUploadError');
                },
                onFileUploadComplete: function (res) {   // 消息上传成功
                    console.log('onFileUploadComplete', res);

                },
                success: function () {                // 消息发送成功
                    console.log('Success');
                    store.dispatch(qaMessages(msg.body, msg.body.ext.asker, { showNotice: !activeKey }));
                },
                fail: function (e) {
                    console.log("Fail", e);              //如禁言、拉黑后发送消息会失败
                },
                flashUpload: WebIM.flashUpload
            };
            msg.set(option);
            WebIM.conn.send(msg.body);
        }
    }
    // 显示表情框
    const showEmoji = () => {
        setIsEmoji(true)
    }
    // 隐藏表情框
    const hideEmoji = () => {
        setIsEmoji(false)
    }

    // 禁言后，判断权限是否遮盖输入框
    const isMuted = isMute && !isAdmins
    return (
        <div className='footer'>
            {isMuted ? (
                <Flex className='msg-box-mute'>
                    <Text className='mute-msg'>全员禁言中</Text>
                </Flex>
            ) : (
                    <div >
                        <Flex justifyContent='flex-start'>
                            {isEmoji && <ShowEomji getEmoji={getEmoji} />}
                            <SmileOutlined className='emoji-icon' onClick={showEmoji} />
                            {isTool && <div onClick={updateImage}
                            >
                                <ImageIcon />
                                <input
                                    id="uploadImage"
                                    onChange={sendImgMessage.bind(this, roomId)}
                                    type="file"
                                    ref={couterRef}
                                    style={{
                                        display: 'none'
                                    }}
                                />
                            </div>}
                        </Flex>
                        <div>
                            <Input.TextArea
                                placeholder="请输入内容..."
                                onChange={(e) => changeMsg(e)}
                                className="msg-box"
                                autoFocus
                                value={content}
                                onClick={hideEmoji}
                            />
                        </div>
                        <Flex justifyContent='flex-end' className='btn-tool'>
                            <Text>{count}/300</Text>
                            <Button
                                onClick={() => { sendMessage(roomId, content) }}
                                className="msg-btn"
                            >
                                发送
                                </Button>
                        </Flex>
                    </div>

                )}
        </div>
    )
    // }
}

export default ChatBox;