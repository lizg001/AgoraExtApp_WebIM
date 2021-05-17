import WebIM from "../utils/WebIM";
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

// 上传/修改 群组公告
export const UpdateRoomNotice = roomId => {
    let options = {
        roomId: '148364667715585',                 // 聊天室id   
        announcement: '家辉培优以高中辅导为核心，包含从预初到高三的课程内容，用线上直播与线下面授相结合的模式。现已拓展为中学全科综合课外辅导机构，成为近几年立足于上海的新晋教育品牌。家辉培优以高中辅导为核心，包含从预初到高三的课程内容，用线上直播与线下面授相结合的模式。现已拓展为中学全科综合课外辅导机构，成为近几年立足于上海的新晋教育品牌。家辉培优以高中辅导为核心，包含从预初到高三的课程内容，用线上直播与线下面授相结合的模式。现已拓展为中学全科综合课外辅导机构，成为近几年立足于上海的新晋教育品牌。家辉培优以高中辅导为核心，包含从预初到高三的课程内容，用线上直播与线下面授相结合的模式。现已拓展为中学全科综合课外辅导机'    // 公告内容                        
    };
    WebIM.conn.updateChatRoomAnnouncement(options).then((res) => {
        console.log('>>> updateNotice', res);
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