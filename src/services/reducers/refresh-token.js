import {
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED
} from '../actions/refresh-token';

const initialState = {
  token: "",
  tokenRequest: false,
  tokenFailed: false
}

export const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        tokenRequest: true,
      };
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        tokenFailed: false,
        tokenRequest: false,
        token: action.accessToken
      }
    }
    case REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        token: "",
        tokenFailed: true,
        tokenRequest: false,
      }
    }
    default: {
      return state;
    }
  }
}