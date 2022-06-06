import {
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILED
} from "../actions/order";
import { TMakeOrderActions } from '../actions/order';

type TMakeOrderState = {
  number: number | null;
  orderRequest: boolean;
  orderFailed: boolean;
}

const initialState: TMakeOrderState = {
  number: null,
  orderRequest: false,
  orderFailed: false,
}

export const orderReducer = (state = initialState, action: TMakeOrderActions) => {
  switch (action.type) {
    case MAKE_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      }
    }
    case MAKE_ORDER_SUCCESS: {
      return {
        ...state,
        number: action.number,
        orderRequest: false,
        orderFailed: false,
      }
    }
    case MAKE_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
      }
    }
    default: {
      return state;
    }
  }
}