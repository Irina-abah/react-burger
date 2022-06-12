import { BASE_URL } from '../../utils/constants';
import { checkResponse } from '../../utils/check-response';
import { TAppDispatch, TAppThunk, TOrder } from '../../utils/types';
import { getCookie } from '../../utils/cookie';

export const MAKE_ORDER_REQUEST: "MAKE_ORDER_REQUEST" = "MAKE_ORDER_REQUEST";
export const MAKE_ORDER_SUCCESS: "MAKE_ORDER_SUCCESS" = "MAKE_ORDER_SUCCESS";
export const MAKE_ORDER_FAILED: "MAKE_ORDER_FAILED" = "MAKE_ORDER_FAILED";

export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";

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

export interface IGetOrderAction {
  readonly type: typeof GET_ORDER_REQUEST;
};
export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly order: TOrder | {};
}
export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

export type TMakeOrderActions = 
  | IMakeOrderAction
  | IMakeOrderSuccessAction
  | IMakeOrderFailedAction
  | IGetOrderAction
  | IGetOrderSuccessAction
  | IGetOrderFailedAction;

function handleMakeOrderError() {
  return {
    type: MAKE_ORDER_FAILED
  }
}

function handleGetOrderError() {
  return {
    type: GET_ORDER_FAILED
  }
}

export const makeOrder: TAppThunk = (data: Array<string>) => {
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
        dispatch(handleMakeOrderError())
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch(handleMakeOrderError())
    })
  }
}

export const getOrder: TAppThunk = (number: number) => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    })
    fetch(`${BASE_URL}/orders/${number}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(checkResponse)
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res.orders
        })
      } else {
        dispatch(handleGetOrderError())
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch(handleGetOrderError())
    })
  }
}