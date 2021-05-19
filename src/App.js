import React, { useEffect, useState } from 'react';
// import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import LoginIM from './api/login'
import Notice from './components/Notice/Notice'
import MessageBox from './components/MessageBox'
import useIMListen from './hooks/useIMListen'
import ToolBar from './components/ToolBar'
import ChatBox from './components/ChatBox'


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
      {!isEditNotice && (
        <MessageBox />
      )}
      <ToolBar />
      <ChatBox />
      {/* <ToolBar /> */}
      {/* <BrowserRouter>
          <Switch>
            <Route path='/chatroom' component={Notice} />
            <Redirect to='/' />
          </Switch>
        </BrowserRouter> */}
    </div >
  );
}
export default App;

