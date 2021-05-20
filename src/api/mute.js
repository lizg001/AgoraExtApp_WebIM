import store from '../redux/store'
import WebIM from "../utils/WebIM";

export const setUserMute = () => {
    let options = {
        chatRoomId: "chatRoomId", // 聊天室id
        username: 'username',     // 被禁言的聊天室成员的id
        muteDuration: -1000       // 被禁言的时长，单位ms，如果是“-1000”代表永久
    };
    WebIM.conn.muteChatRoomMember(options).then((res) => {
        console.log(res)
    })
}

export const removeUserMute = () => {
    let options = {
        chatRoomId: "1000000000000", // 聊天室id
        username: 'username'         // 解除禁言的聊天室成员的id
    };
    conn.removeMuteChatRoomMember(options).then((res) => {
        console.log(res)
    })
}