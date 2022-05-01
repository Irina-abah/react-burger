import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,

  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,

  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "../actions/user";

const initialState = {
  // data: {},
  isAuthenticated: false,
  loginRequest: false,
  loginFailed: false,
  logoutRequest: false,
  logoutFailed: false
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // case LOGIN_USER_REQUEST: {
    //   return {
    //     ...state,
    //     loginRequest: true,
    //   };
    // }
    // case LOGIN_USER_SUCCESS: {
    //   return {
    //     ...state,
    //     isAuthenticated: true,
    //     loginRequest: false,
    //     loginFailed: false,
    //     data: action.data.user
    //   }
    // }
    // case LOGIN_USER_FAILED: {
    //   return {
    //     ...state,
    //     isAuthenticated: false,
    //     loginRequest: false,
    //     loginFailed: true,
    //   }
    // }
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
        logoutFailed: false,
        data: {}
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