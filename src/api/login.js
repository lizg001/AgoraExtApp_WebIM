import WebIM from "../utils/WebIM";
import store from '../redux/store'
import { LoginName } from '../redux/aciton'

// 登陆
const LoginIM = () => {
    const username = localStorage.getItem("userName") || '';
    const studentUser = '111222';
    let potions = {
        user: username || studentUser,
        pwd: "123456",
        appKey: WebIM.config.appkey,
        success: () => {
            store.dispatch(LoginName(potions.user));
        }
    };
    WebIM.conn.open(potions);
};

export default LoginIM;

