// import React from 'react'
import WebIM from '../../utils/WebIM'


const LoginIM = () => {
    let potions = {
        user: "lizg3",
        pwd: "123456",
        appKey: WebIM.config.appkey,
    };
    WebIM.conn.open(potions);
}
export default LoginIM;