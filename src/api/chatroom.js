import WebIM from "../utils/WebIM";
import { message } from 'antd'
import { roomInfo, roomNotice, roomAdmins, roomUsers, roomMuteUsers } from '../redux/aciton'
import store from '../redux/store'
import { setUserInfo } from './userInfo'


// 加入聊天室
export const joinRoom = () => {
    let options = {
        roomId: '148364667715585',   // 聊天室id
        message: 'reason'   // 原因（可选参数）
    }
    WebIM.conn.joinChatRoom(options).then((res) => {
        message.success('已成功加入聊天室！');
        setTimeout(() => {
            message.destroy();
        }, 3000);
        getRoomInfo(options.roomId);
        setUserInfo();
    })

};

// 获取聊天室详情
export const getRoomInfo = (roomId) => {
    let options = {
        chatRoomId: roomId   // 聊天室id
    }
    WebIM.conn.getChatRoomDetails(options).then((res) => {
        store.dispatch(roomInfo(res.data[0]));
        getRoomNotice(roomId);
        getRoomAdmins(roomId);
        getRoomUsers(roomId);
        getRoomMuteList(roomId);
    })
}



// 获取群组公告
export const getRoomNotice = (roomId) => {
    let options = {
        roomId       // 聊天室id                          
    };
    WebIM.conn.fetchChatRoomAnnouncement(options).then((res) => {
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
export const updateRoomNotice = (roomId, noticeCentent) => {
    httpString(noticeCentent)
    let options = {
        roomId: roomId,                 // 聊天室id   
        announcement: newNotice // 公告内容                        
    };
    WebIM.conn.updateChatRoomAnnouncement(options).then((res) => {
        // message.info('修改群组成功！')
        getRoomNotice(res.data.id);
    })
}

// 获取聊天室管理员
export const getRoomAdmins = (roomId) => {
    let options = {
        chatRoomId: roomId   // 聊天室id
    }
    WebIM.conn.getChatRoomAdmin(options).then((res) => {
        store.dispatch(roomAdmins(res.data));
    })
};

// 获取聊天室成员列表
export const getRoomUsers = (roomId) => {
    let options = {
        pageNum: 1,
        pageSize: 100,
        chatRoomId: roomId
    }
    WebIM.conn.listChatRoomMember(options).then((res) => {
        store.dispatch(roomUsers(res.data));
    })
}

// 获取聊天室禁言成员列表
export const getRoomMuteList = (roomId) => {
    let options = {
        chatRoomId: roomId // 聊天室id
    };
    WebIM.conn.getChatRoomMuted(options).then((res) => {
        store.dispatch(roomMuteUsers(res.data));
    })
}