import React, { useState, useRef } from 'react'
import { useSelector } from "react-redux";
import { Button, Input } from 'antd'
import { SmileOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Flex, Text } from 'rebass'
import WebIM from '../../utils/WebIM'
import store from '../../redux/store'
import { Emoji } from '../../utils/emoji'
import { roomMessages, qaMessages } from '../../redux/aciton'
import iconSmiley from '../../themes/img/icon-smiley.svg'
import iconImage from '../../themes/img/icon-image.svg'
import './index.css'

// 展示表情
const ShowEomji = ({ getEmoji }) => {
    console.log('展示emoji');
    return (
        <div className='emoji-all'>
            {Emoji.map((emoji, key) => {
                return <span className='emoji-content' key={key} onClick={getEmoji}>
                    {emoji}
                </span>
            })}
        </div>
    )
}

const ChatBox = ({ isAllMute, isTool, qaUser, activeKey }) => {
    const roomId = useSelector((state) => state.room.info.id);
    const teacher = useSelector(state => state.loginInfo.ext)
    // 是否开启了提问模式
    const isQa = useSelector((state) => state.isQa).checked;
    // 获取用户详情
    const userInfo = useSelector((state) => state.loginInfo);
    // 获取课堂ID
    const roomUuid = useSelector(state => state.extData.roomUuid)
    // 获取当前登陆ID 权限
    const roleType = Number(useSelector(state => state.extData.roleType))
    // 获取是否为单人禁言
    const isUserMute = useSelector(state => state.isUserMute)
    // 是否为老师
    const isTeacher = (Number(teacher) === 1 || Number(teacher) === 3)
    const [count, setCount] = useState(0);
    const [content, setContent] = useState('');
    const [isEmoji, setIsEmoji] = useState(false);
    const [isShow, setIsShow] = useState(false)


    // 整体都要改
    //  消息类型 0普通消息，1提问消息，2回答消息
    let msgType = 0;
    //  消息中的提问用户名
    let requestUser = '';
    //  当前登陆ID 
    let loginId = WebIM.conn.context.userId;
    //  从当前登陆用户取的属性头像
    let avatarUrl = userInfo.avatarurl;
    //  从当前登陆用户取的属性昵称
    let userNickName = userInfo.nickname;
    //  isTool 是控制是否显示图片标签
    if (isTool) {
        msgType = 2;
        requestUser = qaUser || loginId
    } else if (isQa) {
        msgType = 1;
        requestUser = qaUser || loginId
    }
    if (!userInfo.avatarurl) {
        avatarUrl = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-0e98d843ef66ae5e9ec846a7c5f98224_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624523290&t=b9ac1951a67c179055c564b21086bd0c';
    }
    if (!userInfo.nickname) {
        userNickName = '学生测试'
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
        setContent(emojiMsg);
    }
    // 输入框消息
    const changeMsg = (e) => {
        let msgCentent = e.target.value;
        msgCentent = msgCentent?.length > 500 ? msgCentent.slice(0,500) : msgCentent;
        setCount(msgCentent.length);
        setContent(msgCentent);
    }
    // 发送消息
    const sendMessage = (roomId, content) => {
        if (content === '') return
        let id = WebIM.conn.getUniqueId();         // 生成本地消息id
        let msg = new WebIM.message('txt', id); // 创建文本消息
        let option = {
            msg: content,          // 消息内容
            to: roomId,               // 接收消息对象(聊天室id)
            chatType: 'chatRoom',            // 群聊类型设置为聊天室
            ext: {
                msgtype: msgType,   // 消息类型
                roomUuid: roomUuid,
                asker: requestUser,
                role: roleType,
                avatarUrl: avatarUrl,
                nickName: userNickName
            },                         // 扩展消息
            success: function (id, serverId) {
                msg.id = serverId;
                msg.body.id = serverId;
                if (msg.body.ext.msgtype === 2) {
                    store.dispatch(qaMessages(msg.body, msg.body.ext.asker, { showNotice: !activeKey }));
                } else if (msg.body.ext.msgtype === 1) {
                    store.dispatch(qaMessages(msg.body, msg.body.ext.asker, { showNotice: !activeKey }));
                } else {
                    store.dispatch(roomMessages(msg.body, { showNotice: !activeKey }));
                }
                setContent('');
                setCount(0);
            },                               // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
            fail: function (err) {
                if (err.type === 501) {
                    setIsShow(true);
                    setTimeout(() => {
                        setIsShow(false);
                    }, 5000);
                }
            }
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
                    msgtype: msgType,   // 消息类型
                    roomUuid: roomUuid,
                    asker: requestUser,
                    role: roleType,
                    avatarUrl: avatarUrl,
                    nickName: userNickName
                },                       // 接收消息对象
                chatType: 'chatRoom',               // 设置为单聊
                onFileUploadError: function () {      // 消息上传失败
                    console.log('onFileUploadError');
                },
                onFileUploadComplete: function (res) {   // 消息上传成功
                    console.log('onFileUploadComplete', res);

                },
                success: function () {                // 消息发送成功
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
    // const isMuted = isAllMute && !isTeacher
    return (
        <div className='chat-box'>
            {/* 是否被禁言 */}
            {!isTeacher && isUserMute && <Flex className='msg-box-mute'>
                <Text className='mute-msg'>您已被禁言</Text>
            </Flex>}
            {/* 是否全局禁言 */}
            {!isTeacher && isAllMute && <Flex className='msg-box-mute'>
                <Text className='mute-msg'>全员禁言中</Text>
            </Flex>}
            {/* 不禁言展示发送框 */}
            {(isTeacher || (!isUserMute && !isAllMute)) 
            && <>
                {
                    isShow && <Flex className='show-error' alignItems='center' justifyContent='center'>
                        <CloseCircleOutlined style={{ color: 'red', paddingLeft: '10px' }} />
                        <Text ml='3px' className='show-error-msg' >发送失败,含有敏感词！</Text>
                    </Flex>
                }
                <Flex justifyContent='flex-start' alignItems='center'>
                    {isEmoji && <ShowEomji getEmoji={getEmoji} />}
                    <img src={iconSmiley} onClick={showEmoji} className="chat-tool-item"/>
                    {isTool && <div onClick={updateImage} className="chat-tool-item">
                        <img src={iconImage} />
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
                <Input.TextArea
                    placeholder="说点什么呗~"
                    onChange={(e) => changeMsg(e)}
                    className="msg-box"
                    autoFocus
                    value={content}
                    onClick={hideEmoji}
                />
                <Flex justifyContent='flex-end' className='btn-tool'>
                    <Text color="#626773" fontSize="12px">{count}/500</Text>
                    <button disabled={count === 0} onClick={() => { sendMessage(roomId, content) }} className="msg-btn">
                        发送
                    </button>
                </Flex>
            </>}
        </div>
    )
}

export default ChatBox;