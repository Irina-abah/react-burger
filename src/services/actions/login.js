import { BASE_URL } from "../../utils/constants";
import { setCookie, getCookie } from "../../utils/cookie";

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";

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
        "Content-Type": "application/json;charset=utf-8",
        authorization: getCookie('accessToken')
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
          type: LOGIN_USER_SUCCESS,
          data: res.user
        })
        setCookie('accessToken', res.accessToken)
        localStorage.setItem('refreshToken', res.refreshToken)
      } else {
        dispatch({
          type: LOGIN_USER_FAILED,
        })
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: LOGIN_USER_FAILED,
      })
    })
  }
}