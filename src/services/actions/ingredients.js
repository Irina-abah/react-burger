import { BASE_URL } from "../../utils/constants";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const getIngredients = () => {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    })
    fetch(`${BASE_URL}/ingredients`)
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Error ${res.status}`)
    })
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          foodData: res.data
        })
        localStorage.setItem('foodData', JSON.stringify(res.data))
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        })
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: GET_INGREDIENTS_FAILED,
      })
    })
  }
}