import { BASE_URL } from "../../utils/constants";
import { setCookie } from "../../utils/cookie";
import { getUser } from "./get-user";
import { checkResponse } from "../../utils/check-response";

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";

function handleLoginError() {
  return {
    type: LOGIN_USER_FAILED
  }
}

export const loginUser = (data) => {
  return function (dispatch) {
    dispatch({
      type: LOGIN_USER_REQUEST
    })
    fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        email: data.email, 
        password: data.password
      }),
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
    })
    .then(checkResponse)
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: LOGIN_USER_SUCCESS,
          user: res.user
        })
        setCookie('accessToken', res.accessToken)
        localStorage.setItem('refreshToken', res.refreshToken)
        dispatch(getUser())
      } else {
        dispatch(handleLoginError())
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch(handleLoginError())
    })
  }
}