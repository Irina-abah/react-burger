import { BASE_URL } from '../../utils/constants';
import { setCookie} from '../../utils/cookie';
import { checkResponse } from '../../utils/check-response';
import { TAppDispatch, TAppThunk, TUser } from '../../utils/types';

export const REFRESH_TOKEN_REQUEST: "REFRESH_TOKEN_REQUEST" = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_SUCCESS: "REFRESH_TOKEN_SUCCESS" = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAILED: "REFRESH_TOKEN_FAILED" = "REFRESH_TOKEN_FAILED";

export interface IRefreshTokenAction {
  readonly type: typeof REFRESH_TOKEN_REQUEST;
};
export interface IRefreshTokenSuccessAction {
  readonly type: typeof REFRESH_TOKEN_SUCCESS;
  accessToken?: string;
  readonly user: TUser;
}
export interface IRefreshTokenFailedAction {
  readonly type: typeof REFRESH_TOKEN_FAILED;
}

export type TRefreshTokenActions = 
  | IRefreshTokenAction
  | IRefreshTokenSuccessAction
  | IRefreshTokenFailedAction;

function handleTokenError() {
  return {
    type: REFRESH_TOKEN_FAILED
  }
}

export function refreshTokenRequest() {
  return {
    type: REFRESH_TOKEN_REQUEST
  }
}

export const refreshToken: TAppThunk = () => {
  return function (dispatch: TAppDispatch) {
    dispatch(refreshTokenRequest());
    fetch(`${BASE_URL}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    })
    .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: REFRESH_TOKEN_SUCCESS,
            user: res.user
          });
          localStorage.setItem('refreshToken', res.refreshToken);
          setCookie('accessToken', res.accessToken);
        } else {
          dispatch(handleTokenError());
        }
      })
      .catch((err) => {
        console.log(err)
        dispatch(handleTokenError())
      })
  };
}