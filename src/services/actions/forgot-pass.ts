import { BASE_URL } from "../../utils/constants";
import { checkResponse } from "../../utils/check-response";

export const FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST" = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS" = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED: "FORGOT_PASSWORD_FAILED" = "FORGOT_PASSWORD_FAILED";

function handlePassError() {
  return {
    type: FORGOT_PASSWORD_FAILED
  }
}

export const forgotPass = (email: string) => {
  return function (dispatch: any) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST
    })
    fetch(`${BASE_URL}/password-reset`, {
      method: "POST",
      body: JSON.stringify({
        email: email
      }),
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
    })
    .then(checkResponse)
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS
        })
        console.log(res)
      } else {
        dispatch(handlePassError())
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch(handlePassError())
    })
  }
}