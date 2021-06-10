import WebIM from "../utils/WebIM";
import store from '../redux/store'
import { roomMessages, qaMessages, moreHistory, loadGif } from '../redux/aciton'
import { HISTORY_COUNT } from '../components/MessageBox/constants'
import _ from 'lodash'


export const getHistoryMessages = () => {
    store.dispatch(loadGif(true))
    const roomId = store.getState().extData.chatRoomId;
    var options = {
        queue: roomId,
        isGroup: true,
        count: HISTORY_COUNT,
        success: function (res) {
            store.dispatch(loadGif(false))
            if (res.length < HISTORY_COUNT) {
                store.dispatch(moreHistory(false))
            }
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