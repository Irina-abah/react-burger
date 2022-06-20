import { AnyAction } from 'redux';
import { logoutReducer } from './logout';
import { initialState } from './logout';
import * as types from '../actions/logout';

describe('logout reducer', () => {

  it('should return unitial state', () => {
    expect(logoutReducer(undefined, {} as AnyAction)).toEqual(initialState)
  })

  it('should handle Logout request', () => {
    const action = {
      type: types.LOGOUT_REQUEST
    };
    const expectedState = {
      ...initialState,
      logoutRequest: true,
    };

    expect(logoutReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Logout success', () => {
    const action = {
      type: types.LOGOUT_SUCCESS
    };
    const expectedState = {
      ...initialState,
      logoutRequest: false,
      logoutFailed: false
    };

    expect(logoutReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Logout error', () => {
    const action = {
      type: types.LOGOUT_FAILED
    };
    const expectedState = {
      ...initialState,
      logoutRequest: false,
      logoutFailed: true
    };

    expect(logoutReducer(initialState, action)
    ).toEqual(expectedState)
  })

})