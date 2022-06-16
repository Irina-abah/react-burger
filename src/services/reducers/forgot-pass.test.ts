import { AnyAction } from 'redux';
import { forgotReducer } from './forgot-pass';
import { initialState } from './forgot-pass';
import * as types from '../actions/forgot-pass';

describe('forgot reducer', () => {

  it('should return unitial state', () => {
    expect(forgotReducer(undefined, {} as AnyAction)).toEqual(initialState)
  })

  it('should handle Forgot Password request', () => {
    const action = {
      type: types.FORGOT_PASSWORD_REQUEST
    };
    const expectedState = {
      ...initialState,
      forgotRequest: true,
    };

    expect(forgotReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Forgot Password success', () => {
    const action = {
      type: types.FORGOT_PASSWORD_SUCCESS
    };
    const expectedState = {
      ...initialState,
      forgotRequest: false,
      isEmailSent: true,
      forgotFailed: false
    };

    expect(forgotReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Forgot Password error', () => {
    const action = {
      type: types.FORGOT_PASSWORD_FAILED
    };
    const expectedState = {
      ...initialState,
      forgotRequest: false,
      forgotFailed: true
    };

    expect(forgotReducer(initialState, action)
    ).toEqual(expectedState)
  })

})

