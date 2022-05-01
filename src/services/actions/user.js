import { BASE_URL } from "../../utils/constants";
import { setCookie, getCookie, deleteCookie } from "../../utils/cookie";

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";


export const logoutUser = (data) => {
  return function (dispatch) {
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
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Error ${res.status}`)
    })
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: LOGOUT_SUCCESS,
          data: res.user
        })
        deleteCookie('accessToken')
        localStorage.removeItem('refreshToken')
      } else {
        dispatch({
          type: LOGOUT_FAILED,
        })
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: LOGOUT_FAILED,
      })
    })
  }
}