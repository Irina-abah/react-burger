import { BASE_URL } from "../../utils/constants";
import { setCookie, getCookie } from "../../utils/cookie";

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD";

export const LOGOUT_REQUEST = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT";
export const LOGOUT_FAILED = "LOGOUT";

export const registerUser = (data) => {
  return function (dispatch) {
    dispatch({
      type: REGISTER_USER_REQUEST
    })
    fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        email: data.email, 
        password: data.password
      }),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
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
          type: REGISTER_USER_FAILED,
        })
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: REGISTER_USER_FAILED,
      })
    })
  }
};

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