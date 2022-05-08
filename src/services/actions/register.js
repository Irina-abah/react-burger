import { BASE_URL } from "../../utils/constants";
import { setCookie} from "../../utils/cookie";

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

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
          type: REGISTER_USER_SUCCESS,
          user: res.user
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