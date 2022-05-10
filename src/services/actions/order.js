import { BASE_URL } from "../../utils/constants";
import { checkResponse } from "../../utils/check-response";

export const MAKE_ORDER_REQUEST = 'MAKE_ORDER';
export const MAKE_ORDER_SUCCESS = "MAKE_ORDER_SUCCESS";
export const MAKE_ORDER_FAILED = "MAKE_ORDER_FAILED";

function handleOrderError() {
  return {
    type: MAKE_ORDER_FAILED
  }
}

export const makeOrder = (data) => {
  return function (dispatch) {
    dispatch({
      type: MAKE_ORDER_REQUEST
    })
    fetch(`${BASE_URL}/orders`, {
      method: "POST",
      body: JSON.stringify({
        ingredients: data
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(checkResponse)
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: MAKE_ORDER_SUCCESS,
          number: res.order.number
        })
      } else {
        dispatch(handleOrderError())
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch(handleOrderError())
    })
  }
}