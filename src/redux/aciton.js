// 登陆ID
export const LoginName = data => {
    return { type: 'LOGIN_NAME', data }
}
// 聊天室详情
export const roomInfo = data => {
    return { type: 'GET_ROOM_INFO', data }
}
// 聊天室公告
export const roomNotice = data => {
    return { type: 'UPDATE_ROOM_NOTICE', data }
}
// 聊天室管理员
export const roomAdmins = data => {
    return { type: 'GET_ROOM_ADMINS', data }
}
// 聊天室成员
export const roomUsers = data => {
    return { type: 'GET_ROOM_USERS', data }
}
// 聊天室禁言成员
export const roomMuteUsers = data => {
    return { type: 'GET_ROOM_MUTE_USERS', data }
}

// 是否开启提问模式
export const isQa = data => {
    return { type: 'QA_MESSAGE_SWITCH', data }
}
// 是否隐藏赞赏消息
export const isReward = data => {
    return { type: 'REWARD_MESSAGE_SWITCH', data }
}
// 聊天室 普通/赞赏 消息
export const roomMessages = (data, options) => {
    return { type: 'SAVE_ROOM_MESSAGES', data, options }
}
// 移除聊天信息提示
export const removeChatNotification = (data) => {
    return { type: 'REMOVE_CHAT_NOTIFICATION', data }
}
// 移除红点消息提示
export const removeQaNotification = (data) => {
    return { type: 'REMOVE_QA_NOTIFICATION', data }
}


// 聊天室提问消息
export const qaMessages = (data, qaSender, options) => {
    return { type: 'SAVE_QA_MESSAGE', data, qaSender, options }
}

//  存个人信息
export const loginInfo = data => {
    return { type: 'SAVE_LOGIN_INFO', data }
}

// 取成员信息
export const memberInfo = (data) => {
    return { type: 'SAVE_MEMBER_INFO', data }
}