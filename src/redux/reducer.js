
const defaultState = {
    loginName: '',  //当前登陆ID
    room: {         //聊天室详情
        info: {},
        notice: "",
        users: [],
        admins: []
    },
    messages: {     //消息
        list: [],
        qaList: []
    },
    isQa: false,       //是否为提问消息开关
    isReward: false,   //是否隐藏赞赏消息开关
    isUserList: ''  //成员列表
}
const reducer = (state = defaultState, action) => {
    const { type, data } = action;
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
        case 'SAVE_ROOM_MESSAGES':
            let msgs = state.messages.list.concat(data)
            return {
                ...state,
                messages: {
                    ...state.messages,
                    list: msgs
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
            let qaMsgs = state.messages.qaList.concat(data)
            return {
                ...state,
                messages: {
                    ...state.messages,
                    qaList: qaMsgs
                }
            };
        default:
            return state;
    }
}

export default reducer

