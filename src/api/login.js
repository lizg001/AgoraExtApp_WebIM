import WebIM, { appkey } from "../utils/WebIM";
import store from '../redux/store'
import { LoginName } from '../redux/aciton'

// 登陆
const loginIM = () => {
    const userName = store.getState().extData.userUuid;
    const userPwd = store.getState().extData.password;
    let potions = {
        user: userName,
        pwd: userName,
        appKey: appkey,
        success: () => {
            store.dispatch(LoginName(potions.user));
        }
    };
    WebIM.conn.open(potions);
};

export default loginIM;

