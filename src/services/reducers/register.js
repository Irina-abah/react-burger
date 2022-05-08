import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  SET_REGISTER
} from "../actions/register";

const initialState = {
  user: { 
    email: "",
    name: ""
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
    case SET_REGISTER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}