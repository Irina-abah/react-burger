import { forgotReducer } from './forgot-pass';
import { initialState } from './forgot-pass';
import * as types from '../actions/forgot-pass';

describe('forgot reducer', () => {

  it('should return unitial state', () => {
    expect(forgotReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle Forgot Password request', () => {
    const expectedState = {
      forgotRequest: true,
    };

    expect(forgotReducer([], {
      type: types.FORGOT_PASSWORD_REQUEST
    })
    ).toEqual(expectedState)
  })

  it('should handle Forgot Password success', () => {
    const expectedState = {
      forgotRequest: false,
      isEmailSent: true,
      forgotFailed: false
    };

    expect(forgotReducer([], {
      type: types.FORGOT_PASSWORD_SUCCESS
    })
    ).toEqual(expectedState)
  })

  it('should handle Forgot Password error', () => {
    const expectedState = {
      forgotRequest: false,
      forgotFailed: true
    };

    expect(forgotReducer([], {
      type: types.FORGOT_PASSWORD_SUCCESS
    })
    ).toEqual(expectedState)
  })

})

