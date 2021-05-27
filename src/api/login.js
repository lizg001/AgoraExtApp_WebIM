import WebIM from "../utils/WebIM";
import store from '../redux/store'
import { LoginName } from '../redux/aciton'

// 登陆
const loginIM = () => {
    const userName = store.getState().extData.userUuid;
    let potions = {
        user: userName,
        pwd: "123456",
        appKey: WebIM.config.appkey,
        success: () => {
            store.dispatch(LoginName(potions.user));
        }
    };
    WebIM.conn.open(potions);
};

export default loginIM;

