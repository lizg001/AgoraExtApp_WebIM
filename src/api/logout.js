
import WebIM from "../utils/WebIM";

// 退出
export const LogoutIM = () => {
    WebIM.conn.close();
};
