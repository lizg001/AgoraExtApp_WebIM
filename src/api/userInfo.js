import store from '../redux/store'
import { loginInfo, memberInfo } from '../redux/aciton'
import WebIM from "../utils/WebIM";


// 设置自己的用户属性
export const setUserInfo = () => {
    const userAvatarurl = store.getState().extData.avatarurl;
    const userNickName = store.getState().extData.nickName;
    const userRoleType = Number(store.getState().extData.roleType);
    console.log('userRoleType---', userRoleType);
    let options = {
        nickname: userNickName,
        avatarurl: userAvatarurl,
        ext: userRoleType
    }
    WebIM.conn.updateOwnUserInfo(options).then((res) => {
        console.log('updateOwnUserInfo---', res.data);
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