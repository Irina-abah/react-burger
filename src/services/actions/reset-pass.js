import { BASE_URL } from "../../utils/constants";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

export const resetPass = (data) => {
  return function (dispatch) {
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
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Error ${res.status}`)
    })
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: RESET_PASSWORD_SUCCESS
        })
        console.log(res)
      } else {
        dispatch({
          type: RESET_PASSWORD_FAILED,
        })
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: RESET_PASSWORD_FAILED,
      })
    })
  }
}