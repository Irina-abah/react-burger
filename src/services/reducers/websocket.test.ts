import { AnyAction } from 'redux';
import { wsReducer } from './websocket';
import { initialState } from './websocket';
import * as types from '../actions/websocket';

describe('websocket reducer', () => {

  it('should return unitial state', () => {
    expect(wsReducer(undefined, {} as AnyAction)).toEqual(initialState)
  })

  it('should handle Ws connection request', () => {
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

  it('should handle Ws connection success', () => {
    const action = {
      type: types.WS_CONNECTION_ERROR,
      payload: ""
    };
    const expectedState = {
      ...initialState,
        error: payload,
        wsConnected: false
    };

    expect(wsReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Ws connection error', () => {
    const action = {
      type: types.REGISTER_USER_FAILED
    };
    const expectedState = {
      ...initialState,
      registerFailed: true,
      registerRequest: false,
    };

    expect(wsReducer(initialState, action)
    ).toEqual(expectedState)
  })

})