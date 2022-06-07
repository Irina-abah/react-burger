import {
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED
} from '../actions/refresh-token';
import { TRefreshTokenActions } from '../actions/refresh-token';

type TRefreshTokenState = {
  token: string;
  tokenRequest: boolean;
  tokenFailed: boolean;
}

const initialState: TRefreshTokenState = {
  token: "",
  tokenRequest: false,
  tokenFailed: false
}

export const tokenReducer = (state = initialState, action: TRefreshTokenActions) => {
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