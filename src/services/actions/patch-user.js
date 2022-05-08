import { BASE_URL } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";
import { refreshToken } from "./refresh-token";

export const PATCH_USER_REQUEST = "PATCH_USER_REQUEST";
export const PATCH_USER_SUCCESS = "PATCH_USER_SUCCESS";
export const PATCH_USER_FAILED = "PATCH_USER_FAILED";

export const patchUser = (data) => {
  return function (dispatch) {
    dispatch({
      type: PATCH_USER_REQUEST
    })
    fetch(`${BASE_URL}/auth/user`, {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
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
          type: PATCH_USER_SUCCESS,
          user: res.user
        })
      } else {
        dispatch({
          type: PATCH_USER_FAILED,
        })
      }
    })
    .catch((err) => {
      console.log(err.message)
      if (err.message === "jwt expired" || err.message === "Token is invalid") {
        dispatch({
          type: PATCH_USER_FAILED,
        })
        dispatch(refreshToken())
        dispatch(patchUser(data))
      }
    })
  }
}