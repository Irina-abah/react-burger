import { AnyAction } from 'redux';
import { resetReducer } from './reset-pass';
import { initialState } from './reset-pass';
import * as types from '../actions/reset-pass';

describe('reset reducer', () => {

  it('should return unitial state', () => {
    expect(resetReducer(undefined, {} as AnyAction)).toEqual(initialState);
  });

  it('should handle Reset Password request', () => {
    const action = {
      type: types.RESET_PASSWORD_REQUEST
    };
    const expectedState = {
      ...initialState,
      resetRequest: true,
    };

    expect(resetReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Reset Password success', () => {
    const action = {
      type: types.RESET_PASSWORD_SUCCESS
    };
    const expectedState = {
      ...initialState,
      resetRequest: false,
      isPasswordReset: true,
      resetFailed: false
    };

    expect(resetReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Reset Password error', () => {
    const action = {
      type: types.RESET_PASSWORD_FAILED
    };
    const expectedState = {
      ...initialState,
      resetRequest: false,
      resetFailed: true
    };

    expect(resetReducer(initialState, action)
    ).toEqual(expectedState)
  })

})