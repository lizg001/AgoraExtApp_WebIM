import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import store from './redux/store'
import App from './App';
import { BrowserRouter } from 'react-router-dom'

import './index.css'
// import 'antd/dist/antd.css'

function render(props) {
  const { container } = props;
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
    ,
    container ? container.querySelector('#root') : document.querySelector('#root')
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}

export async function mount(props) {
  console.log('[react16] props from main framework', props);
  render(props);
}

export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}