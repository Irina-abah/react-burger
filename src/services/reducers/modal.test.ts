import { AnyAction } from 'redux';
import { modalReducer } from './modal';
import { initialState } from './modal';
import * as types from '../actions/modal';

describe('modal reducer', () => {

  const ingredient = {
    "_id":"60666c42cc7b410027a1a9b1",
    "name":"Краторная булка N-200i",
    "type":"bun",
    "proteins":80,
    "fat":24,
    "carbohydrates":53,
    "calories":420,
    "price":1255,
    "image":"https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v":0,
    "count":0,
    "index": 0,
    "dragId": 0,
    "num": 0
  };

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
    expect(modalReducer(undefined, {} as AnyAction)).toEqual(initialState)
  })

  it('should handle Open Modal Ingredient request', () => {
    const action = {
      type: types.OPEN_MODAL,
      item: ingredient
    };
    const expectedState = {
      ...initialState,
      selectedItem: ingredient,
      modalOpened: true,
      modalClosed: false
    };

    expect(modalReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Open Modal Order success', () => {
    const action = {
      type: types.OPEN_MODAL_ORDER,
      item: order
    };
    const expectedState = {
      ...initialState,
      selectedOrder: order,
      modalOpened: true,
      modalClosed: false
    };

    expect(modalReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Logout error', () => {
    const action = {
      type: types.CLOSE_MODAL,
      item: ingredient
    };
    const expectedState = {
      ...initialState,
      selectedItem: {},
      modalOpened: false,
      modalClosed: true,
    };

    expect(modalReducer(initialState, action)
    ).toEqual(expectedState)
  })

})