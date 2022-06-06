import { BASE_URL } from "../../utils/constants";
import { deleteCookie } from "../../utils/cookie";
import { checkResponse } from "../../utils/check-response";
import { TAppDispatch } from "../../utils/types";

export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED: "LOGOUT_FAILED" = "LOGOUT_FAILED";

export interface ILogoutUserAction {
  readonly type: typeof LOGIN_USER_REQUEST;
};
export interface ILogoutUserSuccessAction {
  readonly type: typeof LOGIN_USER_SUCCESS;
  user: TUserLogin;
}
export interface ILoginUserFailedAction {
  readonly type: typeof LOGIN_USER_FAILED;
}

export type TLoginUserActions = 
  | ILoginUserAction
  | ILoginUserSuccessAction
  | ILoginUserFailedAction;

function handleLogoutError() {
  return {
    type: LOGOUT_FAILED
  }
}

export const logoutUser = () => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: LOGOUT_REQUEST
    })
    fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken'),
      }),
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
    })
    .then(checkResponse)
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: LOGOUT_SUCCESS,
        })
        deleteCookie('accessToken')
        localStorage.removeItem('refreshToken')
      } else {
        dispatch(handleLogoutError())
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch(handleLogoutError())
    })
  }
}