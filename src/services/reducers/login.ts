import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED
} from '../actions/login';
import { TUserGet } from '../../utils/types';
import { TLoginUserActions } from '../actions/login';

type TLoginUserState = {
  user: TUserGet;
  isLoggedIn: boolean;
  loginRequest: boolean;
  loginFailed: boolean;
}

export const initialState: TLoginUserState = {
  user: { 
    email: "",
    name: ""
  },
  isLoggedIn: false,
  loginRequest: false,
  loginFailed: false,
}

export const loginReducer = (state = initialState, action: TLoginUserActions): TLoginUserState=> {
  switch (action.type) {
    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        loginRequest: true,
      };
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        loginRequest: false,
        loginFailed: false,
        user: action.user
      }
    }
    case LOGIN_USER_FAILED: {
      return {
        ...state,
        isLoggedIn: false,
        loginRequest: false,
        loginFailed: true,
      }
    }
    default: {
      return state;
    }
  }
}