import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED
} from "../actions/login";

const initialState = {
  user: {},
  isAuthenticated: false,
  loginRequest: false,
  loginFailed: false
}

export const loginReducer = (state = initialState, action) => {
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
        isAuthenticated: true,
        loginRequest: false,
        loginFailed: false,
        user: action.data.user
      }
    }
    case LOGIN_USER_FAILED: {
      return {
        ...state,
        isAuthenticated: false,
        loginRequest: false,
        loginFailed: true,
      }
    }
    default: {
      return state;
    }
  }
}