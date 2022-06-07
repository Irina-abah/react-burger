import type { Middleware, MiddlewareAPI } from 'redux';
import type { TApplicationActions, TAppDispatch, TRootState } from '../../utils/types';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE,
  WS_CONNECTION_CLOSED,
  WS_SEND_MESSAGE
} from '../actions/websocket';

export const socketMiddleware = (wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<TAppDispatch, TRootState>) => {
        let socket: WebSocket | null = null;

    return next => (action: TApplicationActions) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
 
      if (type === 'WS_CONNECTION_START') {
            // объект класса WebSocket
        socket = new WebSocket(wsUrl);
      }
      if (socket) {

                // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
        };

                // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
        };

                // функция, которая вызывается при получения события от сервера
        socket.onmessage = event => {
          const { data } = event;
          dispatch({ type: 'WS_GET_MESSAGE', payload: data });
        };
                // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
        };

        if (type === 'WS_SEND_MESSAGE') {
          const message = payload;
                    // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
    }) as Middleware;
}; 