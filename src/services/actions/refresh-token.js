import { BASE_URL } from "../../utils/constants";
import { setCookie} from "../../utils/cookie";

export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAILED = "REFRESH_TOKEN_FAILED";

export const refreshToken = () => {
  return function (dispatch) {
    dispatch({
      type: REFRESH_TOKEN_REQUEST,
    });
    fetch(`${BASE_URL}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
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
            type: REFRESH_TOKEN_SUCCESS,
          });
          localStorage.setItem('refreshToken', res.refreshToken);
          setCookie('accessToken', res.accessToken);
        } else {
          dispatch({
            type: REFRESH_TOKEN_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err)
        dispatch({
          type: REFRESH_TOKEN_FAILED,
        })
      })
  };
}