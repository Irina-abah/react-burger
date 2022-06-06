import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "../actions/logout";
import { TLogoutUserActions } from '../actions/logout';

type TLogoutUserState = {
  logoutRequest: boolean;
  logoutFailed: boolean;
}

const initialState: TLogoutUserState = {
  logoutRequest: false,
  logoutFailed: false
}

export const logoutReducer = (state = initialState, action: TLogoutUserActions) => {
  switch (action.type) {
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: false
      }
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true
      }
    }
    default: {
      return state;
    }
  }
}