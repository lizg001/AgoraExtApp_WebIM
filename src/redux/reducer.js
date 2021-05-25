import { CHAT_TABS_KEYS } from '../components/MessageBox/constants'
const defaultState = {
    loginName: '',  //当前登陆ID
    loginInfo: {},
    room: {         //聊天室详情
        info: {},
        notice: "",
        users: [],
        admins: [],
        muteList: []
    },
    messages: {     //消息
        list: [],
        qaList: {},
        notification: {
            [CHAT_TABS_KEYS.chat]: false,
            [CHAT_TABS_KEYS.qa]: false
        }
    },
    isQa: false,        //是否为提问消息开关
    isReward: false,    //是否隐藏赞赏消息开关
    isUserList: '',     //成员列表
    userListInfo: {}    //成员信息

}
const reducer = (state = defaultState, action) => {
    const { type, data, qaSender } = action;
    switch (type) {
        case 'LOGIN_NAME':
            return {
                ...state,
                loginName: data
            };
        case 'GET_ROOM_INFO':
            return {
                ...state,
                room: {
                    ...state.room,
                    info: data
                }
            };
        case 'UPDATE_ROOM_NOTICE':
            return {
                ...state,
                room: {
                    ...state.room,
                    notice: data
                }
            };
        case 'GET_ROOM_ADMINS':
            return {
                ...state,
                room: {
                    ...state.room,
                    admins: data
                }
            };
        case 'GET_ROOM_USERS':
            return {
                ...state,
                room: {
                    ...state.room,
                    users: data
                }
            };
        case 'GET_ROOM_MUTE_USERS':
            return {
                ...state,
                room: {
                    ...state.room,
                    muteList: data
                }
            };
        case 'SAVE_ROOM_MESSAGES':
            const { showNotice } = action.options
            let msgs = state.messages.list.concat(data)
            if (data.ext.msgId) {
                msgs = msgs.filter((item) => item.id !== data.ext.msgId)
            }
            return {
                ...state,
                messages: {
                    ...state.messages,
                    list: msgs,
                    notification: {
                        ...state.messages.notification,
                        [CHAT_TABS_KEYS.chat]: showNotice
                    }
                }
            };
        case 'REMOVE_CHAT_NOTIFICATION':
            return {
                ...state,
                messages: {
                    ...state.messages,
                    notification: {
                        ...state.messages.notification,
                        [CHAT_TABS_KEYS.chat]: data
                    }
                }
            };
        case 'QA_MESSAGE_SWITCH':
            return {
                ...state,
                isQa: data
            };
        case 'REWARD_MESSAGE_SWITCH':
            return {
                ...state,
                isReward: data
            };
        case 'SAVE_QA_MESSAGE':
            const qaList = state.messages.qaList
            return {
                ...state,
                messages: {
                    ...state.messages,
                    qaList: {
                        ...qaList,
                        [qaSender]: [...(qaList[qaSender] || []), data],
                    },
                    notification: {
                        ...state.messages.notification,
                        [CHAT_TABS_KEYS.qa]: action.options.showNotice
                    }
                }
            };
        case 'REMOVE_QA_NOTIFICATION':
            return {
                ...state,
                messages: {
                    ...state.messages,
                    notification: {
                        ...state.messages.notification,
                        [CHAT_TABS_KEYS.qa]: data
                    }
                }
            };
        case 'SAVE_LOGIN_INFO':
            return {
                ...state,
                loginInfo: data
            };
        case 'SAVE_MEMBER_INFO':
            // let roomListInfo = _.values(data)
            // console.log('abc>>', roomListInfo);
            return {
                ...state,
                userListInfo: data
            }
        default:
            return state;
    }
}

export default reducer

