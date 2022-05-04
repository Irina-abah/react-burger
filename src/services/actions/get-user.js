import { BASE_URL } from "../../utils/constants";
import { fetchWithRefresh } from "../../utils/token";
import { getCookie } from "../../utils/cookie";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const getUser = () => {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST
    })
    fetchWithRefresh(`${BASE_URL}/auth/user`, {
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
          type: GET_USER_SUCCESS,
          user: res.user
        })
      } else {
        dispatch({
          type: GET_USER_FAILED,
        })
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: GET_USER_FAILED,
      })
    })
  }
}

