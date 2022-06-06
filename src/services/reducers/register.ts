import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED
} from "../actions/register";
import { TRegisterUserActions } from '../actions/register';
import { TUserGet } from '../../utils/types';

type TRegisterUserState = {
  user: TUserGet;
  registerRequest: boolean;
  registerFailed: boolean;
  isAuthenticated: boolean;
}

const initialState: TRegisterUserState = {
  user: { 
    email: "",
    name: ""
  },
  registerRequest: false,
  registerFailed: false,
  isAuthenticated: false
}

export const registerReducer = (state = initialState, action: TRegisterUserActions) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        registerFailed: false,
        registerRequest: false,
        isAuthenticated: true,
        user: action.user
      }
    }
    case REGISTER_USER_FAILED: {
      return {
        ...state,
        registerFailed: true,
        registerRequest: false,
      }
    }
    default: {
      return state;
    }
  }
}