import { BASE_URL } from '../../utils/constants';
import { checkResponse } from '../../utils/check-response';
import { TAppDispatch } from '../../utils/types';
import { TUserReset } from '../../utils/types';

export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED: "RESET_PASSWORD_FAILED" = "RESET_PASSWORD_FAILED";

export interface IResetPassAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
};
export interface IResetPassSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}
export interface IResetPassFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export type TResetPassActions = 
  | IResetPassAction
  | IResetPassSuccessAction
  | IResetPassFailedAction;

function handleResetError() {
  return {
    type: RESET_PASSWORD_FAILED
  }
}

export const resetPass = (data: TUserReset) => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    })
    fetch(`${BASE_URL}/password-reset/reset`, {
      method: "POST",
      body: JSON.stringify({
        password: data.password,
        token: data.token
      }),
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
    })
    .then(checkResponse)
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: RESET_PASSWORD_SUCCESS
        })
        console.log(res)
      } else {
        dispatch(handleResetError())
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch(handleResetError())
    })
  }
}