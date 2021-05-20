import { useEffect } from 'react'
import store from '../redux/store'
import { roomMessages } from '../redux/aciton'
import WebIM from '../utils/WebIM';
import { useHistory } from 'react-router-dom'
import { JoinRoom } from '../api/chatroom'



// WebIM 注册监听回调
const useIMListen = () => {
    const history = useHistory();
    useEffect(() => {
        WebIM.conn.listen({
            onOpened: () => {
                console.log('登陆成功');
                JoinRoom();
                setTimeout(() => {
                    history.push('/chatroom')
                }, 500);
            },
            // 文本消息
            onTextMessage: (message) => {
                console.log('onTextMessage', message);
                store.dispatch(roomMessages(message))
            },
            // 异常回调
            onError: (message) => {
                console.log('onError', message);
            },
            // 聊天室相关监听
            onPresence: (message) => {
                console.log('onPresence', message);
            },
            onCustomMessage: (message) => {
                console.log('onCustomMessage', message);
                store.dispatch(roomMessages(message))
            }
        })
    }, [history])
}
export default useIMListen;