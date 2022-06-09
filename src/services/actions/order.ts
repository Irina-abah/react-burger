import { BASE_URL } from "../../utils/constants";
import { checkResponse } from "../../utils/check-response";
import { TAppDispatch } from "../../utils/types";
import { TExtendedItem } from "../../utils/types";
import { getCookie } from "../../utils/cookie";

export const MAKE_ORDER_REQUEST: "MAKE_ORDER_REQUEST" = "MAKE_ORDER_REQUEST";
export const MAKE_ORDER_SUCCESS: "MAKE_ORDER_SUCCESS" = "MAKE_ORDER_SUCCESS";
export const MAKE_ORDER_FAILED: "MAKE_ORDER_FAILED" = "MAKE_ORDER_FAILED";

export interface IMakeOrderAction {
  readonly type: typeof MAKE_ORDER_REQUEST;
};
export interface IMakeOrderSuccessAction {
  readonly type: typeof MAKE_ORDER_SUCCESS;
  readonly number: number;
}
export interface IMakeOrderFailedAction {
  readonly type: typeof MAKE_ORDER_FAILED;
}

export type TMakeOrderActions = 
  | IMakeOrderAction
  | IMakeOrderSuccessAction
  | IMakeOrderFailedAction;

function handleOrderError() {
  return {
    type: MAKE_ORDER_FAILED
  }
}

export const makeOrder = (data: Array<string>) => {
  return function (dispatch: TAppDispatch) {
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
        Authorization: getCookie('accessToken') as string
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