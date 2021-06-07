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
import { CHAT_TABS_KEYS } from '../MessageBox/constants'


const ToolBar = ({ tabKey, hide, isTool, qaUser, activeKey }) => {
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
        // 成员列表不展示footer
        <>
        { tabKey !== CHAT_TABS_KEYS.user && <div className='footer'>
            <>
                {/* 只有聊天模式下才展示toolBar */}
                {tabKey === CHAT_TABS_KEYS.chat && <div className='footer-toolBar'>
                    {isAdmins ? (
                        <div style={{height: 36}}>
                            {!isTool  && 
                                <Flex justifyContent="space-between" alignItems='center' m='0 12px' height='36px'>
                                    <Flex>
                                        <Switch size="small"
                                            checked={isChatReward}
                                            onClick={() => { onChangeReward(isChatReward) }} 
                                            style={{margin: "3px 0"}}/>
                                        <Text className="tb-switch-label">隐藏赞赏</Text>
                                    </Flex>
                                    <Flex>
                                        <Switch size="small"
                                            checked={isAllMute}
                                            onClick={() => { onChangeMute(isAllMute) }} 
                                            style={{margin: "3px 0"}}/>
                                        <Text className="tb-switch-label">全员禁言</Text>
                                    </Flex>
                                </Flex>
                            }
                        </div>
                    ) : (
                        <Flex justifyContent="flex-end" alignItems='center' m='0 12px' height='36px'>
                            <Switch size="small" onChange={onChangeQa}
                            />
                            <Text className="tb-switch-label">提问模式</Text>
                        </Flex>
                    )}
                </div>}
                {/* 聊天输入框 */}
                <ChatBox isAllMute={isAllMute} isTool={isTool} qaUser={qaUser} activeKey={activeKey} />
            </>
        </div>}
        </>
    )
}
export default ToolBar;