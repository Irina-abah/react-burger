import { AnyAction } from 'redux';
import { wsReducer } from './websocket';
import { initialState } from './websocket';
import * as types from '../actions/websocket';

describe('websocket reducer', () => {

  const orders = {
    success: true,
    orders: [
      {
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
      },
      {
        _id: "37ac8c28fg747e001bd47f91",
        status: "pending",
        number: 17375,
        ingredients: [ 
          "60d3b41abdacab0026a733cb",
          "60d3b41abdacab0026a733c7",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6"
        ],
        createdAt: "2024-06-17T14:14:00.441Z",
        updatedAt: "2024-06-17T14:14:00.794Z",
        name: "Антарианский экзо-плантаго флюоресцентный био-марсианский бургер"
      }
    ],
    total: 2,
    totalToday: 2,
  }

  it('should return unitial state', () => {
    expect(wsReducer(undefined, {} as AnyAction)).toEqual(initialState)
  })

  it('should handle Ws connection success', () => {
    const action = {
      type: types.WS_CONNECTION_SUCCESS
    };
    const expectedState = {
      ...initialState,
        error: undefined,
        wsConnected: true
    };

    expect(wsReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Ws connection error', () => {
    const action = {
      type: types.WS_CONNECTION_ERROR,
      payload: "error message"
    };
    const expectedState = {
      ...initialState,
        error: "error message",
        wsConnected: false
    };

    expect(wsReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Ws connection closed', () => {
    const action = {
      type: types.WS_CONNECTION_CLOSED
    };
    const expectedState = {
      ...initialState,
        error: undefined,
        wsConnected: false
    };

    expect(wsReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Ws get orders', () => {
    const action = {
      type: types.WS_GET_MESSAGE,
      payload: orders 
    };
    const expectedState = {
      ...initialState,
        error: undefined,
        messages: action.payload
    };

    expect(wsReducer(initialState, action)
    ).toEqual(expectedState)
  })

})