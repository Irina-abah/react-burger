import { BASE_URL } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";
import { LOGIN_USER_SUCCESS } from "./login";
import { refreshToken } from "./refresh-token";
import { checkResponse } from "../../utils/check-response";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const getUser = () => {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST
    })
    fetch(`${BASE_URL}/auth/user`, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: getCookie('accessToken')
      },
    })
    .then(checkResponse)
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_USER_SUCCESS,
          user: res.user
        })
        console.log(res)
        dispatch({
          type: LOGIN_USER_SUCCESS,
        })
      } else {
        dispatch({
          type: GET_USER_FAILED,
        })
      }
    })
    .catch((err) => {
      console.log(err)
      if (err.message === "jwt expired" || err.message === "Token is invalid") {
        dispatch({
          type: GET_USER_FAILED,
        })
        dispatch(refreshToken())
        dispatch(getUser())
      }
    })
  }
}

