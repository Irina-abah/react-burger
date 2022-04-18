import { BASE_URL } from "../../utils/constants";

export const MAKE_ORDER = 'MAKE_ORDER';
export const MAKE_ORDER_SUCCESS = "MAKE_ORDER_SUCCESS";
export const MAKE_ORDER_FAILED = "MAKE_ORDER_FAILED";

export const makeOrder = (data) => {
  // const items = data.map(item => item._id);
  return function (dispatch) {
    dispatch({
      type: MAKE_ORDER
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
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Error ${res.status}`)
    })
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: MAKE_ORDER_SUCCESS,
          number: res.order.number
        })
      } else {
        dispatch({
          type: MAKE_ORDER_FAILED,
        })
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: MAKE_ORDER_FAILED,
      })
    })
  }
}