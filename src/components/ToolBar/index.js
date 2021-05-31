import { useSelector } from "react-redux";
// import { message } from 'antd'
import WebIM from '../../utils/WebIM'
import store from '../../redux/store'
import { isReward, isQa } from '../../redux/aciton'
import { Flex, Text } from 'rebass'
import { Switch } from 'antd';
import ChatBox from '../ChatBox'
import { getRoomInfo } from '../../api/chatroom'
import './index.css'


const ToolBar = ({ hide, isTool, qaUser, activeKey }) => {
    // const userName = useSelector((state) => state.loginName);
    const roomId = useSelector((state) => state.room.info.id);
    const isTeacher = useSelector((state) => state.loginInfo.ext);
    // const roomAdmins = useSelector((state) => state.room.admins);
    // const roomOwner = useSelector((state) => state.room.info.owner);
    const isAllMute = useSelector((state) => state.room.info.mute);
    const isChatReward = useSelector(state => state.isReward);
    const isAdmins = Number(isTeacher) === 1 || Number(isTeacher) === 3;


    // 赞赏开关
    const onChangeReward = (val) => {
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
            chatRoomId: roomId    // 聊天室id
        };
        WebIM.conn.disableSendChatRoomMsg(options).then((res) => {
            getRoomInfo(roomId);
            // message.success('已设置全局禁言');
            // setTimeout(() => {
            //     message.destroy();
            // }, 3000);
        })
    }
    // 解除一键禁言
    const removeAllmute = () => {
        let options = {
            chatRoomId: roomId    // 聊天室id
        };
        WebIM.conn.enableSendChatRoomMsg(options).then((res) => {
            getRoomInfo(roomId);
            // message.success('已解除全局禁言');
            // setTimeout(() => {
            //     message.destroy();
            // }, 3000);
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
                                            checked={isChatReward}
                                            onClick={() => { onChangeReward(isChatReward) }} />
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