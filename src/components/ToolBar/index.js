import { useSelector } from "react-redux";
import { message } from 'antd'
import WebIM from '../../utils/WebIM'
import store from '../../redux/store'
import { isReward, isQa } from '../../redux/aciton'
import { Flex, Text } from 'rebass'
import { Switch } from 'antd';
import ChatBox from '../ChatBox'
import { getRoomInfo } from '../../api/chatroom'
import './index.css'


const ToolBar = ({ hide, isTool, qaUser, activeKey }) => {
    const userName = useSelector((state) => state.loginName);
    const roomId = useSelector((state) => state.room.info.id);
    const roomAdmins = useSelector((state) => state.room.admins);
    const roomOwner = useSelector((state) => state.room.info.owner);
    const isMute = useSelector((state) => state.room.info.mute);
    const isAdmins = roomAdmins.includes(userName) || userName === roomOwner;

    // 渲染赞赏开关
    function onChangeMessage(checked) {
        store.dispatch(isReward({ checked }))
    }
    // 全局禁言开关
    function onChangeMute(checked) {
        if (checked) {
            setAllmute();
        } else {
            removeAllmute();
        }
    }
    // 提问消息开关
    function onChangeQa(checked) {
        console.log('onChangeQa', checked);
        store.dispatch(isQa({ checked }))
    }

    // 一键禁言
    const setAllmute = () => {
        let options = {
            chatRoomId: roomId    // 聊天室id
        };
        WebIM.conn.disableSendChatRoomMsg(options).then((res) => {
            getRoomInfo(roomId);
            message.success('已设置全局禁言');
            setTimeout(() => {
                message.destroy();
            }, 3000);
        })
    }
    // 解除一键禁言
    const removeAllmute = () => {
        let options = {
            chatRoomId: roomId    // 聊天室id
        };
        WebIM.conn.enableSendChatRoomMsg(options).then((res) => {
            getRoomInfo(roomId);
            message.success('已解除全局禁言');
            setTimeout(() => {
                message.destroy();
            }, 3000);
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
                    <ChatBox isMute={isMute} isAdmins={isAdmins} isTool={isTool} qaUser={qaUser} activeKey={activeKey} />
                </div>
            ) : (
                    <div></div>
                )}
        </div>
    )
}
export default ToolBar;