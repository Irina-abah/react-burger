import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
} from "../actions/register";

const initialState = {
  user: {
    email: "",
    name: "",
    password: ""
  },
  registerRequest: false,
  registerFailed: false,
  isAuthenticated: false
}

export const registerReducer = (state = initialState, action) => {
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
        user: action.payload
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