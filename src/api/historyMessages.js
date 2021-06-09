import WebIM from "../utils/WebIM";
import store from '../redux/store'
import { roomMessages, qaMessages } from '../redux/aciton'
import _ from 'lodash'
// import { LoginName } from '../redux/aciton'


export const getHistoryMessages = () => {
    const roomId = store.getState().extData.chatRoomId;
    var options = {
        queue: roomId,
        isGroup: true,
        count: 10,
        success: function (res) {
            const histrotMsg = _.reverse(res)
            histrotMsg.map((val, key) => {
                const { ext: { msgtype, asker } } = val
                if (msgtype === 0) {
                    store.dispatch(roomMessages(val, { showNotice: false, isHistory: true }))
                } else if ([1, 2].includes(msgtype)) {
                    store.dispatch(qaMessages(val, asker, { showNotice: true, isHistory: true }))
                }
            })
        },
        fail: function (err) {
            console.log('漫游失败', err);
        }
    }
    WebIM.conn.fetchHistoryMessages(options)
}