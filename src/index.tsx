import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import { BrowserRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import { rootReducer } from './services/reducers/index';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { socketMiddleware } from './services/middleware/socketMiddleware';
import { WEB_SOCKET } from './utils/constants';
import { wsActions } from './services/actions/websocket';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(WEB_SOCKET, wsActions)));

export const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter basename='/react-burger'>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
