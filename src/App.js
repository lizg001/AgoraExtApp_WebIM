import React, { useEffect, useState } from 'react';
import store from './redux/store'
import { extData } from './redux/aciton'
import LoginIM from './api/login'
import Notice from './components/Notice'
import MessageBox from './components/MessageBox/MessageList'
import useIMListen from './IMListen/useIMListen'
import { CHAT_TABS_KEYS } from './components/MessageBox/constants'
import { getPageQuery } from './utils'

import './App.css'

const App = function () {

  const [isEditNotice, isEditNoticeChange] = useState(0) // 0 显示公告  1 编辑公告  2 展示更多内容
  const [activeKey, setActiveKey] = useState(CHAT_TABS_KEYS.chat)
  useIMListen({ currentTab: activeKey })
  useEffect(() => {
    let im_Data = getPageQuery();
    store.dispatch(extData(im_Data));
    LoginIM();
  }, [])

  return (
    <div className="app">
      <Notice isEdit={isEditNotice} isEditNoticeChange={isEditNoticeChange} />
      {isEditNotice === 0 && (<MessageBox activeKey={activeKey} setActiveKey={setActiveKey} />)}
    </div >
  );
}
export default App;

