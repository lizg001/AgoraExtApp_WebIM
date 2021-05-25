import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux'
import LoginIM from './api/login'
import Notice from './components/Notice/Notice'
import MessageBox from './components/MessageBox/MessageList'
import useIMListen from './hooks/useIMListen'
import { CHAT_TABS_KEYS } from './components/MessageBox/constants'

import './app.css'

const App = function () {
  const [isEditNotice, isEditNoticeChange] = useState(false)
  const [activeKey, setActiveKey] = useState(CHAT_TABS_KEYS.chat)
  useIMListen({ currentTab: activeKey })
  useEffect(() => {
    LoginIM();
  }, [])

  return (
    <div className="app">
      <Notice isEdit={isEditNotice} isEditNoticeChange={isEditNoticeChange} />
      {!isEditNotice && (<MessageBox activeKey={activeKey} setActiveKey={setActiveKey} />)}
    </div >
  );
}
export default App;

