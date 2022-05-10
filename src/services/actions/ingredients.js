import { BASE_URL } from "../../utils/constants";
import { checkResponse } from "../../utils/check-response";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const getIngredients = () => {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    })
    fetch(`${BASE_URL}/ingredients`)
    .then(checkResponse)
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          foodData: res.data
        })
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