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
// 是否开启提问模式
export const isQa = data => {
    return { type: 'QA_MESSAGE_SWITCH', data }
}
// 是否隐藏赞赏消息
export const isReward = data => {
    return { type: 'REWARD_MESSAGE_SWITCH', data }
}
// 聊天室 普通/赞赏 消息
export const roomMessages = data => {
    return { type: 'SAVE_ROOM_MESSAGES', data }
}
// 聊天室提问消息
export const qaMessages = data => {
    return { type: 'SAVE_QA_MESSAGE', data }
}
