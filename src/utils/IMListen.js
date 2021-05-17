import WebIM from './WebIM';
import { useHistory } from 'react-router-dom'
import { JoinRoom } from '../api/chatroom'



// WebIM 注册监听回调
const IMListen = () => {
    const history = useHistory();
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

    return (
        <div>
            {/* <Route path='/chatroom' component={Notice} /> */}
        </div>
    )
}
export default IMListen;