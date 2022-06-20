import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED
 } from '../actions/reset-pass';
 import { TResetPassActions } from '../actions/reset-pass';

 type TResetPassState = {
  resetRequest: boolean;
  isPasswordReset: boolean;
  resetFailed: boolean;
}

 export const initialState: TResetPassState = {
  resetRequest: false,
  isPasswordReset: false,
  resetFailed: false
}

export const resetReducer = (state = initialState, action: TResetPassActions) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetRequest: true,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetRequest: false,
        isPasswordReset: true,
        resetFailed: false
      }
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetRequest: false,
        resetFailed: true
      }
    }
    default: {
      return state;
    }
  }
}