import { BASE_URL } from '../../utils/constants';
import { getCookie } from '../../utils/cookie';
import { refreshToken } from './refresh-token';
import { checkResponse } from '../../utils/check-response';
// import { TAppDispatch } from '../../utils/types';
import { TUserMain } from '../../utils/types';

export const PATCH_USER_REQUEST: "PATCH_USER_REQUEST" = "PATCH_USER_REQUEST";
export const PATCH_USER_SUCCESS: "PATCH_USER_SUCCESS" = "PATCH_USER_SUCCESS";
export const PATCH_USER_FAILED: "PATCH_USER_FAILED" = "PATCH_USER_FAILED";

export interface IPatchUserAction {
  readonly type: typeof PATCH_USER_REQUEST;
};
export interface IPatchUserSuccessAction {
  readonly type: typeof PATCH_USER_SUCCESS;
  user: TUserMain;
}
export interface IPatchUserFailedAction {
  readonly type: typeof PATCH_USER_FAILED;
}

export type TPatchUserActions = 
  | IPatchUserAction
  | IPatchUserSuccessAction
  | IPatchUserFailedAction;

function handlePatchError() {
  return {
    type: PATCH_USER_FAILED
  }
}

export const patchUser = (data: TUserMain) => {
  return function (dispatch: any) {
    dispatch({
      type: PATCH_USER_REQUEST
    })
    fetch(`${BASE_URL}/auth/user`, {
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        email: data.email, 
        password: data.password
      }),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: getCookie('accessToken') as string
      },
    })
    .then(checkResponse)
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: PATCH_USER_SUCCESS,
          user: res.user
        })
      } else {
        dispatch(handlePatchError())
      }
    })
    .catch((err) => {
      console.log(err.message)
      if (err.message === "jwt expired" || err.message === "Token is invalid") {
        dispatch(handlePatchError())
        dispatch(refreshToken())
        dispatch(patchUser(data))
      }
    })
  }
}