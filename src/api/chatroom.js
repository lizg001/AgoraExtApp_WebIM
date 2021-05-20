import WebIM from "../utils/WebIM";
// import { message } from 'antd'
import { roomInfo, roomNotice, roomAdmins } from '../redux/aciton'
import store from '../redux/store'


// 加入聊天室
export const JoinRoom = () => {
    let options = {
        roomId: '148364667715585',   // 聊天室id
        message: 'reason'   // 原因（可选参数）
    }
    WebIM.conn.joinChatRoom(options).then((res) => {
        console.log('>>> JoinRoom', res);
        GetRoomInfo(options.roomId);
    })

};

// 获取聊天室详情
export const GetRoomInfo = (roomId) => {
    let options = {
        chatRoomId: roomId   // 聊天室id
    }
    WebIM.conn.getChatRoomDetails(options).then((res) => {
        console.log('>>> getChatroomInfo', res);
        store.dispatch(roomInfo(res.data[0]));
        GetRoomNotice(roomId);
        GetRoomAdmins(roomId);
    })
}



// 获取群组公告
export const GetRoomNotice = (roomId) => {
    let options = {
        roomId       // 聊天室id                          
    };
    WebIM.conn.fetchChatRoomAnnouncement(options).then((res) => {
        console.log('>>> getRoomAnnouncement', res);
        store.dispatch(roomNotice(res.data.announcement));
    })
};

let newNotice = '';
function httpString(str) {
    var textR = str;
    var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
    if (reg.exec('')) {
        console.log('1111');
    } else {
        newNotice = textR.replace(reg, "<a href='$1$2'>$1$2</a>");
        console.log('textR---', textR);
        return newNotice
    }
}



// 上传/修改 群组公告
export const UpdateRoomNotice = (roomId, noticeCentent) => {
    console.log('UpdateRoomNotice', roomId, noticeCentent);
    httpString(noticeCentent)
    let options = {
        roomId: roomId,                 // 聊天室id   
        announcement: newNotice // 公告内容                        
    };
    WebIM.conn.updateChatRoomAnnouncement(options).then((res) => {
        console.log('>>> updateNotice', res);
        // message.info('修改群组成功！')
        GetRoomNotice(res.data.id);
    })
}

// 获取聊天室管理员
export const GetRoomAdmins = (roomId) => {
    let options = {
        chatRoomId: roomId   // 聊天室id
    }
    WebIM.conn.getChatRoomAdmin(options).then((res) => {
        console.log('>>> GetRoomAdmins', res)
        store.dispatch(roomAdmins(res.data));
    })
};