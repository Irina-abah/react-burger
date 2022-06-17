import { AnyAction } from 'redux';
import { tokenReducer } from './refresh-token';
import { initialState } from './refresh-token';
import * as types from '../actions/refresh-token';

describe('resfresh token reducer', () => {

  const token = "8b3237bc5543c304a762d35a363ddcf38b7efab704d00df987979e1debf889109f4ccf27d74a0fb7"
  const user = {
    email: "irina@irina.com",
    name: "irina"
  }

  it('should return unitial state', () => {
    expect(tokenReducer(undefined, {} as AnyAction)).toEqual(initialState)
  })

  it('should handle Refresh Token request', () => {
    const action = {
      type: types.REFRESH_TOKEN_REQUEST
    };
    const expectedState = {
      ...initialState,
      tokenRequest: true
    };

    expect(tokenReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Refresh Token success', () => {
    const action = {
      type: types.REFRESH_TOKEN_SUCCESS,
      accessToken: token,
      user: user
    };
    const expectedState = {
      ...initialState,
      tokenFailed: false,
      tokenRequest: false,
      token: token
    };

    expect(tokenReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Refresh Token error', () => {
    const action = {
      type: types.REFRESH_TOKEN_FAILED
    };
    const expectedState = {
      ...initialState,
      token: "",
      tokenFailed: true,
      tokenRequest: false,
    };

    expect(tokenReducer(initialState, action)
    ).toEqual(expectedState)
  })

})