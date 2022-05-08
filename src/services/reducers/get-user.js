import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED
} from '../actions/get-user';

const initialState = {
  user: { 
    email: "",
    name: ""
  },
  isAuthenticated: false,
  getUserRequest: false,
  getUserFailed: false
}

export const getUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        getUserRequest: false,
        getUserFailed: false,
        user: action.user
      }
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        isAuthenticated: false,
        getUserRequest: false,
        getUserFailed: true,
      }
    }
    default: {
      return state;
    }
  }
}