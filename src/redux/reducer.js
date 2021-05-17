
const defaultState = {
    loginName: '',
    room: {
        info: {},
        notice: "",
        users: [],
        admins: []
    }

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
            console.log('UPDATE_ROOM_NOTICE');
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
        default:
            return state;
    }
}

export default reducer

