import store from '../redux/store'
import { loginInfo, memberInfo } from '../redux/aciton'
import WebIM from "../utils/WebIM";


// 设置自己的用户属性
export const setUserInfo = () => {
    const userAvatarurl = store.getState().extData.avatarurl;
    const userNickName = store.getState().extData.nickName;
    const userRoleType = Number(store.getState().extData.roleType);
    let options = {
        nickname: userNickName,
        avatarurl: userAvatarurl,
        ext: userRoleType
    }
    WebIM.conn.updateOwnUserInfo(options).then((res) => {
        store.dispatch(loginInfo(res.data))
    })
}

// 获取用户属性
export const getUserInfo = (member) => {
    WebIM.conn.fetchUserInfoById(member).then((res) => {
        store.dispatch(memberInfo(res.data))
    })
}