import store from '../redux/store'
import { loginInfo, memberInfo } from '../redux/aciton'
import WebIM from "../utils/WebIM";


// 设置自己的用户属性
export const setUserInfo = () => {
    const userAvatarurl = store.getState().extData.avatarurl;
    const userNickName = store.getState().extData.nickName;
    let options = {
        nickname: userNickName,
        avatarurl: userAvatarurl
    }
    WebIM.conn.updateOwnUserInfo(options).then((res) => {
        store.dispatch(loginInfo(res.data))
    })
}

// 获取用户属性
export const getUserInfo = (member) => {
    let userArr = [];
    member.forEach(user => {
        if (user.member) {
            userArr.push(user.member)
        } else {
            userArr.push(user.owner)
        }
        return
    });
    WebIM.conn.fetchUserInfoById(userArr).then((res) => {
        store.dispatch(memberInfo(res.data))
    })
}