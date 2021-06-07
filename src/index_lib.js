import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './redux/store'
import App from './App';
import { MemoryRouter } from 'react-router-dom'

import './index.css'

export const HXChatRoom = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    </React.StrictMode>
  )
}

export const renderHXChatRoom = (dom) => {
  ReactDOM.render(
  <HXChatRoom />,
  dom
  );
}