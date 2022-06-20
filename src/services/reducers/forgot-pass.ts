import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED
 } from '../actions/forgot-pass';
 import type { TForgotPassActions } from '../actions/forgot-pass';

 type TForgotPassState = {
  forgotRequest: boolean;
  isEmailSent: boolean;
  forgotFailed: boolean;
} 

 export const initialState: TForgotPassState = {
  forgotRequest: false,
  isEmailSent: false,
  forgotFailed: false
}

export const forgotReducer = (state = initialState, action: TForgotPassActions) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotRequest: true,
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotRequest: false,
        isEmailSent: true,
        forgotFailed: false
      }
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotRequest: false,
        forgotFailed: true
      }
    }
    default: {
      return state;
    }
  }
}


