import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux'
import LoginIM from './api/login'
// import LoginIM from './components/Login'
import Notice from './components/Notice/Notice'
import MessageBox from './components/MessageBox/MessageList'
import useIMListen from './hooks/useIMListen'


import './app.css'

const App = function () {
  const [isEditNotice, isEditNoticeChange] = useState(false)
  useIMListen()
  useEffect(() => {
    LoginIM()
  }, [])

  return (
    <div className="app">
      <Notice isEdit={isEditNotice} isEditNoticeChange={isEditNoticeChange} />
      {!isEditNotice && (<MessageBox />)}
    </div >
  );
}
export default App;

