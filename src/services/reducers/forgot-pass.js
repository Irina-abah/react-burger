import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED
 } from '../actions/forgot-pass';

 const initialState = {
  email: "",
  forgotRequest: false,
  isEmailSent: false,
  forgotFailed: false
}

export const forgotReducer = (state = initialState, action) => {
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
        forgotFailed: false,
        email: action.payload
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


