import {
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  PATCH_USER_FAILED
} from "../actions/patch-user";
import { TUserGet } from '../../utils/types';
import { TPatchUserActions } from '../actions/patch-user';

type TPatchUserState = {
  user: TUserGet;
  patchUserRequest: boolean;
  isSuccess: boolean;
  patchUserFailed: boolean;
} 

const initialState: TPatchUserState = {
  user: { 
    email: "",
    name: ""
  },
  patchUserRequest: false,
  isSuccess: false,
  patchUserFailed: false
}

export const patchUserReducer = (state = initialState, action: TPatchUserActions) => {
  switch (action.type) {
    case PATCH_USER_REQUEST: {
      return {
        ...state,
        patchUserRequest: true,
      };
    }
    case PATCH_USER_SUCCESS: {
      return {
        ...state,
        patchUserRequest: false,
        patchUserFailed: false,
        isSuccess: true,
        user: action.user
      }
    }
    case PATCH_USER_FAILED: {
      return {
        ...state,
        patchUserRequest: false,
        patchUserFailed: true,
        isSuccess: false
      }
    }
    default: {
      return state;
    }
  }
}