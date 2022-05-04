import { BASE_URL } from "../../utils/constants";
import { deleteCookie } from "../../utils/cookie";

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
          // data: res.user
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