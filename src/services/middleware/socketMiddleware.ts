import type { Middleware, MiddlewareAPI } from 'redux';
import type { TAppDispatch, TRootState } from '../../utils/types';
import { TWsActions } from '../../utils/types';

export const socketMiddleware = (wsUrl: string, wsActions: TWsActions ): Middleware => {
    return ((store: MiddlewareAPI<TAppDispatch, TRootState>) => {
      let socket: WebSocket | null = null;

    return next => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsStart, wsClose, onOpen, onClose, onError, onMessage } = wsActions;
 
      if (type === wsStart) {
        socket = new WebSocket(`${wsUrl}${payload}`);
      }
      if (type === wsClose) {
        socket?.close();
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };
        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };
        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onMessage, payload: parsedData });
        };
        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };
      }
      next(action);
    };
    }) as Middleware;
}; 