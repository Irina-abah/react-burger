import {
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED
} from '../actions/order';
import { TMakeOrderActions } from '../actions/order';
import { TOrder } from '../../utils/types';

type TMakeOrderState = {
  number: number | null;
  orderMakeRequest: boolean;
  orderMakeFailed: boolean;
  order: TOrder | {},
  orderGetRequest: boolean,
  orderGetFailed: boolean
}

const initialState: TMakeOrderState = {
  number: null,
  orderMakeRequest: false,
  orderMakeFailed: false,
  order: {},
  orderGetRequest: false,
  orderGetFailed: false,
}

export const orderReducer = (state = initialState, action: TMakeOrderActions): TMakeOrderState => {
  switch (action.type) {
    case MAKE_ORDER_REQUEST: {
      return {
        ...state,
        orderMakeRequest: true
      }
    }
    case MAKE_ORDER_SUCCESS: {
      return {
        ...state,
        number: action.number,
        orderMakeRequest: false,
        orderMakeFailed: false,
      }
    }
    case MAKE_ORDER_FAILED: {
      return {
        ...state,
        orderMakeFailed: true,
        orderMakeRequest: false,
      }
    }
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderGetRequest: true
      }
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.order,
        orderGetRequest: false,
        orderGetFailed: false,
      }
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderGetFailed: true,
        orderGetRequest: false,
      }
    }
    default: {
      return state;
    }
  }
}