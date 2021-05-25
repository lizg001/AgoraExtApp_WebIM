import store from '../redux/store'
import { loginInfo, memberInfo } from '../redux/aciton'
import WebIM from "../utils/WebIM";


// 设置自己的用户属性
export const setUserInfo = () => {
    let options = {
        nickname: 'web-测试A',
        avatarurl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201603%2F31%2F20160331232507_zuXef.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624388398&t=74d46f9a9372d3cd12a6526bca3b9588'
    }
    WebIM.conn.updateOwnUserInfo(options).then((res) => {
        store.dispatch(loginInfo(res.data))
    })
}

// 获取用户属性
export const getUserInfo = (member) => {
    let userArr = [];
    member.forEach(user => {
        return userArr.push(user.member)
    });
    WebIM.conn.fetchUserInfoById(userArr).then((res) => {
        store.dispatch(memberInfo(res.data))
    })
}