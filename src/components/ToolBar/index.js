import React from 'react'
import { useSelector } from "react-redux";
import WebIM from '../../utils/WebIM'
import store from '../../redux/store'
import { isReward, isQa, roomAllMute } from '../../redux/aciton'
import { Flex, Text } from 'rebass'
import { Switch } from 'antd';
import ChatBox from '../ChatBox'
import './index.css'


const ToolBar = ({ hide, isTool, qaUser, activeKey }) => {
    const roomId = useSelector((state) => state.room.info.id);
    const isTeacher = useSelector((state) => state.loginInfo.ext);
    const isAllMute = useSelector((state) => state.isRoomAllMute);
    const isGift = useSelector(state => state.isReward);
    const rommAnnouncement = (useSelector(state => state.room.notice)).slice(1)
    const isAdmins = Number(isTeacher) === 1 || Number(isTeacher) === 3;

    // 赞赏开关
    const onChangeReward = (val) => {
        console.log('onChangeReward', val);
        if (!val) {
            store.dispatch(isReward(true))
        } else {
            store.dispatch(isReward(false))
        }
    }
    // 全局禁言开关
    const onChangeMute = (val) => {
        if (!val) {
            setAllmute();
        } else {
            removeAllmute();
        }
    }
    // 提问消息开关
    function onChangeQa(checked) {
        store.dispatch(isQa({ checked }))
    }

    // 一键禁言
    const setAllmute = () => {
        let options = {
            roomId: roomId,                 // 聊天室id   
            announcement: "1" + rommAnnouncement    // 公告内容                        
        };
        WebIM.conn.updateChatRoomAnnouncement(options).then((res) => {
            store.dispatch(roomAllMute(true))
        })
    }
    // 解除一键禁言
    const removeAllmute = () => {
        let options = {
            roomId: roomId,                 // 聊天室id   
            announcement: "0" + rommAnnouncement    // 公告内容                        
        };
        WebIM.conn.updateChatRoomAnnouncement(options).then((res) => {
            store.dispatch(roomAllMute(false))
        })
    }
    return (
        <div className='footer'>
            {!hide ? (
                <div>
                    {isAdmins ? (
                        <div className='footer-toolBar'>
                            {!isTool && <div>
                                <Flex justifyContent="space-between" alignItems='center' m='5px' height='36px'>
                                    <Flex>
                                        <Switch size="small"
                                            checked={isGift}
                                            onClick={() => { onChangeReward(isGift) }} />
                                        <Text ml="3px" fontSize="14px" fontWeight="400" color="#7C848C">隐藏赞赏</Text>
                                    </Flex>
                                    <Flex>
                                        <Switch size="small"
                                            checked={isAllMute}
                                            onClick={() => { onChangeMute(isAllMute) }} />
                                        <Text ml="3px" fontSize="14px" fontWeight="400" color="#7C848C">全员禁言</Text>
                                    </Flex>
                                </Flex>
                            </div>}
                        </div>
                    ) : (
                            <div>
                                <div>
                                    <Flex justifyContent="flex-end" alignItems='center' m='5px' height='36px'>
                                        <Switch size="small" onChange={onChangeQa}
                                        />
                                        <Text ml="3px" fontSize="14px" fontWeight="400" color="#7C848C">提问模式</Text>
                                    </Flex>
                                </div>
                            </div>
                        )}
                    <ChatBox isAllMute={isAllMute} isTool={isTool} qaUser={qaUser} activeKey={activeKey} />
                </div>
            ) : (
                    <div></div>
                )}
        </div>
    )
}
export default ToolBar;