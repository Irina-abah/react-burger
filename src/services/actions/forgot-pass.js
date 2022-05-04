import { BASE_URL } from "../../utils/constants";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

export const forgotPass = (email) => {
  return function (dispatch) {
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
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Error ${res.status}`)
    })
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS
        })
        console.log(res)
      } else {
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
        })
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: FORGOT_PASSWORD_FAILED,
      })
    })
  }
}