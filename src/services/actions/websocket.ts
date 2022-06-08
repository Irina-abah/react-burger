import { TOrders } from '../../utils/types';

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_CLOSE: "WS_CONNECTION_CLOSE" = "WS_CONNECTION_CLOSE";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" = "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";

export const wsActions = {
  wsStart: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_CLOSE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

export interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}

export interface IWsConnectionCloseAction {
  readonly type: typeof WS_CONNECTION_CLOSE;
  readonly payload: string;
}

export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly payload: any;

}

export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: any;
}

export interface IWsGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: TOrders;
}

export interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
  readonly payload: any;
}

export interface IWsSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: any;
}

export type TWebSocketActions =
  | IWsConnectionStartAction
  | IWsConnectionCloseAction
  | IWsConnectionSuccessAction
  | IWsConnectionErrorAction
  | IWsGetMessageAction
  | IWsConnectionClosedAction
  | IWsSendMessageAction;

export const wsConnectionStart = () => {
  return {
    type: WS_CONNECTION_START,
    payload: 'all'
  };
};

export const wsConnectionClose = () => {
  return {
    type: WS_CONNECTION_CLOSE
  };
};

export const wsConnectionSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = () => {
  return {
    type: WS_CONNECTION_ERROR
  };
};

export const wsGetMessage = (message: TOrders) => {
  return {
    type: WS_GET_MESSAGE,
    payload: message
  };
};

export const wsConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

export const wsSendMessage = (message: TOrders) => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message
  };
};