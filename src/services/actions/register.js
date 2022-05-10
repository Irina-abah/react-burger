import { BASE_URL } from "../../utils/constants";
import { setCookie} from "../../utils/cookie";
import { checkResponse } from "../../utils/check-response";

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
    .then(checkResponse)
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