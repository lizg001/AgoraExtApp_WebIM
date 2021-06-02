import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import store from './redux/store'
import { roomMessages, qaMessages, userMute, roomAllMute, extData } from './redux/aciton'
import WebIM, { appkey } from './utils/WebIM';
import LoginIM from './api/login'
import { joinRoom, getRoomInfo, getRoomNotice, getRoomWhileList } from './api/chatroom'
import Notice from './components/Notice'
import MessageBox from './components/MessageBox/MessageList'
import { CHAT_TABS_KEYS } from './components/MessageBox/constants'
import { getPageQuery } from './utils'
import _ from 'lodash'

import './App.css'

const App = function () {
  const history = useHistory();
  const isRoomAllMute = useSelector(state => state.room.notice).slice(0, 1)
  console.log('isRoomAllMute', isRoomAllMute);
  const [isEditNotice, isEditNoticeChange] = useState(false)
  const [activeKey, setActiveKey] = useState(CHAT_TABS_KEYS.chat)
  // useIMListen({ currentTab: activeKey })
  useEffect(() => {
    console.log('-----------11111');
    let im_Data = getPageQuery();
    store.dispatch(extData(im_Data));
    LoginIM();
  }, [])

  useEffect(() => {
    if (Number(isRoomAllMute) === 0) {
      store.dispatch(roomAllMute(false))
    } else if (Number(isRoomAllMute) === 1) {
      store.dispatch(roomAllMute(true))
    }
  }, [isRoomAllMute])

  WebIM.conn.listen({
    onOpened: () => {
      joinRoom();
      setTimeout(() => {
        history.push('/chatroom?chatRoomId=148364667715585&roomUuid=test222&roleType=3&userUuid=lizg8&avatarUrl=https://img2.baidu.com/it/u=1593081528,1330377059&fm=26&fmt=auto&gp=0.jpg&org=easemob-demo&apk=cloudclass&nickName=AB')
      }, 500);
    },
    // 文本消息
    onTextMessage: (message) => {
      console.log('onTextMessage', message);
      const { ext: { msgtype, asker } } = message
      if (msgtype === 0) {
        store.dispatch(roomMessages(message, { showNotice: activeKey !== CHAT_TABS_KEYS.chat }))
      } else if ([1, 2].includes(msgtype)) {
        store.dispatch(qaMessages(message, asker, { showNotice: activeKey !== CHAT_TABS_KEYS.qa && msgtype === 1 }))
      }
    },
    // 异常回调
    onError: (message) => {
      console.log('onError', message);
      const type = JSON.parse(_.get(message, 'data.data')).error_description;
      const resetName = store.getState().extData.userUuid;
      if (message.type === '16') {
        return
      } else if (type === "user not found") {
        let options = {
          username: resetName.toLocaleLowerCase(),
          password: resetName,
          appKey: appkey,
          success: function () {
            LoginIM();
          },
        };
        WebIM.conn.registerUser(options);
      }
    },
    // 聊天室相关监听
    onPresence: (message) => {
      console.log('type-----', message);
      switch (message.type) {
        case "memberJoinChatRoomSuccess":
          getRoomInfo(message.gid);
          break;
        case "leaveChatRoom":
          getRoomInfo(message.gid);
          break;
        case "updateAnnouncement":
          getRoomNotice(message.gid)
          store.dispatch(roomAllMute(!Number(isRoomAllMute)))
          break;
        case 'muteChatRoom':
          getRoomInfo(message.gid);
          break;
        case 'rmChatRoomMute':
          getRoomInfo(message.gid);
          break;
        // 删除聊天室白名单成员
        case 'rmUserFromChatRoomWhiteList':
          getRoomWhileList(message.gid);
          store.dispatch(userMute(false))
          break;
        // 增加聊天室白名单成员
        case 'addUserToChatRoomWhiteList':
          getRoomWhileList(message.gid);
          store.dispatch(userMute(true))
          break;
        default:
          break;
      }
    },
    //  收到自定义消息
    onCustomMessage: (message) => {
      console.log('CUSTOM--', message);
      store.dispatch(roomMessages(message, { showNotice: activeKey !== CHAT_TABS_KEYS.chat }))
    },
    //  收到图片消息
    onPictureMessage: (message) => {
      console.log('onPictureMessage', message);
      store.dispatch(qaMessages(message, message.ext.asker, { showNotice: activeKey !== CHAT_TABS_KEYS.qa }))
    },
    //  收到CMD消息
    onCmdMessage: (message) => {
      console.log('onCmdMessage', message);
      store.dispatch(roomMessages(message, { showNotice: activeKey !== CHAT_TABS_KEYS.chat }))
    },
  })

  return (
    <div className="app">
      <Notice isEdit={isEditNotice} isEditNoticeChange={isEditNoticeChange} />
      {!isEditNotice && (<MessageBox activeKey={activeKey} setActiveKey={setActiveKey} />)}
    </div >
  );
}
export default App;

