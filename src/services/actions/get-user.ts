import { BASE_URL } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";
import { LOGIN_USER_SUCCESS } from "./login";
import { refreshToken } from "./refresh-token";
import { checkResponse } from "../../utils/check-response";
import { TAppDispatch } from "../../utils/types";
import { TUserGet } from "../../utils/types";

export const GET_USER_REQUEST: "GET_USER_REQUEST" = "GET_USER_REQUEST";
export const GET_USER_SUCCESS: "GET_USER_SUCCESS" = "GET_USER_SUCCESS";
export const GET_USER_FAILED: "GET_USER_FAILED" = "GET_USER_FAILED";
export interface IGetUserAction {
  readonly type: typeof GET_USER_REQUEST;
};
export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly user: TUserGet;
}
export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
}

export type TGetUserActions = 
  | IGetUserAction
  | IGetUserSuccessAction
  | IGetUserFailedAction;

function handleUserError() {
  return {
    type: GET_USER_FAILED
  }
}

export const getUser = () => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: GET_USER_REQUEST
    })
    fetch(`${BASE_URL}/auth/user`, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: getCookie('accessToken') as string
      },
    })
    .then(checkResponse)
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_USER_SUCCESS,
          user: res.user
        })
        console.log(res)
        dispatch({
          type: LOGIN_USER_SUCCESS,
          user: res.user
        })
      } else {
        dispatch(handleUserError())
      }
    })
    .catch((err) => {
      console.log(err)
      if (err.message === "jwt expired" || err.message === "Token is invalid") {
        dispatch(handleUserError())
        dispatch(refreshToken())
        dispatch(getUser())
      }
    })
  }
}

