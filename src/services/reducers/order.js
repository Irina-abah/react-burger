import {
  MAKE_ORDER,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILED
} from "../actions/order";

const initialState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_ORDER: {
      return {
        ...state,
        orderRequest: true
      }
    }
    case MAKE_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.number,
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