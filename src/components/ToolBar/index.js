import { useState } from 'react'
import { useSelector } from "react-redux";
import WebIM from '../../utils/WebIM'
import store from '../../redux/store'
import { isReward, isQa } from '../../redux/aciton'
import { Flex, Text } from 'rebass'
import { Switch } from 'antd';
import ChatBox from '../ChatBox'
import { GetRoomInfo } from '../../api/chatroom'
import './index.css'




const ToolBar = ({ hide, isTool }) => {
    console.log('ToolBar----hide', hide);
    console.log('ToolBar----isTool', isTool);
    const [isImg, setIsImg] = useState(false)
    const userName = useSelector((state) => state.loginName);
    const roomId = useSelector((state) => state.room.info.id);
    const roomAdmins = useSelector((state) => state.room.admins);
    const roomOwner = useSelector((state) => state.room.info.owner);
    const isMute = useSelector((state) => state.room.info.mute);
    console.log('isMute---', isMute);
    const isAdmins = roomAdmins.includes(userName) || userName === roomOwner;

    // 赞赏消息
    function onChangeMessage(checked) {
        console.log('onChangeMessage', `switch to ${checked}`);
        store.dispatch(isReward({ checked }))
    }
    // 
    function onChangeMute(checked) {
        console.log('onChangeMute', `switch to ${checked}`);
        if (checked) {
            setAllmute();
        } else {
            removeAllmute();
        }

    }

    function onChangeQa(checked) {
        console.log('onChangeQa', `switch to ${checked}`);
        store.dispatch(isQa({ checked }))
    }

    // 一键禁言
    const setAllmute = () => {
        let options = {
            chatRoomId: roomId    // 聊天室id
        };
        WebIM.conn.disableSendChatRoomMsg(options).then((res) => {
            console.log('禁言----', res)
            GetRoomInfo(roomId);
        })
    }
    // 解除一键禁言
    const removeAllmute = () => {
        let options = {
            chatRoomId: roomId    // 聊天室id
        };
        WebIM.conn.enableSendChatRoomMsg(options).then((res) => {
            console.log('解除禁言---', res)
            GetRoomInfo(roomId);
        })
    }
    return (
        <div>
            {!hide ? (
                <div>
                    {isAdmins ? (
                        <div className='toolBar'>
                            {!isTool && <div>
                                <Flex justifyContent="space-between" alignItems='center' m='5px' height='36px'>
                                    <Flex>
                                        <Switch size="small" onChange={onChangeMessage} />
                                        <Text ml="3px" fontSize="14px" fontWeight="400" color="#7C848C">隐藏赞赏</Text>
                                    </Flex>
                                    <Flex>
                                        <Switch size="small" onChange={onChangeMute} />
                                        <Text ml="3px" fontSize="14px" fontWeight="400" color="#7C848C">全员禁言</Text>
                                    </Flex>
                                </Flex>
                            </div>}
                            <ChatBox isMute={isMute} isAdmins={isAdmins} isImg={isImg} />
                        </div>
                    ) : (
                            <div>
                                <Flex justifyContent="flex-end" alignItems='center' m='5px' height='36px'>
                                    <Switch size="small" onChange={onChangeQa}
                                    />
                                    <Text ml="3px" fontSize="14px" fontWeight="400" color="#7C848C">提问模式</Text>
                                </Flex>
                                <ChatBox isMute={isMute} isAdmins={isAdmins} />
                            </div>

                        )}

                </div>
            ) : (
                    <div></div>
                )}
        </div>
    )
}
export default ToolBar;