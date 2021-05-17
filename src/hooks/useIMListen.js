import { useEffect } from 'react'
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
            onError: (message) => {
                console.log('onError', message);
            },
            onPresence: (message) => {
                console.log('onPresence', message);
            }
        })
    }, [history])
}
export default useIMListen;