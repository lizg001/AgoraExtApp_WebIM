
export const LoginName = data => {
    return { type: 'LOGIN_NAME', data }
}

export const roomInfo = data => {
    return { type: 'GET_ROOM_INFO', data }
}
export const roomNotice = data => {
    return { type: 'UPDATE_ROOM_NOTICE', data }
}

export const roomAdmins = data => {
    return { type: 'GET_ROOM_ADMINS', data }
}