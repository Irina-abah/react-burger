import { TOrders } from "../../utils/types";
import {
  // WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE,
  WS_CONNECTION_CLOSED
} from '../actions/websocket';
import { TWebSocketActions } from '../actions/websocket';

type TWsState = {
  wsConnected: boolean;
  messages: TOrders;
  error?: Event;
}

 const initialState: TWsState = {
  wsConnected: false,
  messages: {
    success: false,
    orders:[],
    total: 0,
    totalToday: 0,
  }
}

export const wsReducer = (state = initialState, action: TWebSocketActions): TWsState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
          error: undefined,
          wsConnected: true
        };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
          error: action.payload,
          wsConnected: false
        };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
          error: undefined,
          wsConnected: false
        };

    case WS_GET_MESSAGE:
      return {
        ...state,
          error: undefined,
          messages: action.payload
        };
    default:
      return state;
  }
}; 