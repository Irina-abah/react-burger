import { AnyAction } from 'redux';
import { orderReducer } from './order';
import { initialState } from './order';
import * as types from '../actions/order';

describe('order reducer', () => {

  const order = {
    _id: "62ac8c28fa747e001bd52f91",
    status: "done",
    number: 17999,
    ingredients: [ 
      "60d3b41abdacab0026a733cb",
      "60d3b41abdacab0026a733d2",
      "60d3b41abdacab0026a733c6",
      "60d3b41abdacab0026a733c6"
    ],
    createdAt: "2022-06-17T14:14:00.441Z",
    updatedAt: "2022-06-17T14:14:00.794Z",
    name: "Альфа-сахаридный краторный био-марсианский бургер"
  }

  it('should return unitial state', () => {
    expect(orderReducer(undefined, {} as AnyAction)).toEqual(initialState)
  })

  it('should handle Make Order request', () => {
    const action = {
      type: types.MAKE_ORDER_REQUEST
    };
    const expectedState = {
      ...initialState,
      orderMakeRequest: true
    };

    expect(orderReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Make Order success', () => {
    const action = {
      type: types.MAKE_ORDER_SUCCESS,
      number: order.number
    };
    const expectedState = {
      ...initialState,
      number: order.number,
      orderMakeRequest: false,
      orderMakeFailed: false,
    };

    expect(orderReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Make Order error', () => {
    const action = {
      type: types.MAKE_ORDER_FAILED
    };
    const expectedState = {
      ...initialState,
      orderMakeFailed: true,
      orderMakeRequest: false,
    };

    expect(orderReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Get Order request', () => {
    const action = {
      type: types.GET_ORDER_REQUEST
    };
    const expectedState = {
      ...initialState,
      orderGetRequest: true
    };

    expect(orderReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Get Order success', () => {
    const action = {
      type: types.GET_ORDER_SUCCESS,
      order: order
    };
    const expectedState = {
      ...initialState,
      order: order,
      orderGetRequest: false,
      orderGetFailed: false,
    };

    expect(orderReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Get Order error', () => {
    const action = {
      type: types.GET_ORDER_FAILED
    };
    const expectedState = {
      ...initialState,
      orderGetFailed: true,
      orderGetRequest: false,
    };

    expect(orderReducer(initialState, action)
    ).toEqual(expectedState)
  })

})