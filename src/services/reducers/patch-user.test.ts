import { AnyAction } from 'redux';
import { patchUserReducer } from './patch-user';
import { initialState } from './patch-user';
import * as types from '../actions/patch-user';

describe('patch user reducer', () => {

  const user = {
    email: "irina@irina.com",
    name: "irina"
  }

  it('should return unitial state', () => {
    expect(patchUserReducer(undefined, {} as AnyAction)).toEqual(initialState)
  })

  it('should handle Patch User request', () => {
    const action = {
      type: types.PATCH_USER_REQUEST
    };
    const expectedState = {
      ...initialState,
      patchUserRequest: true
    };

    expect(patchUserReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Patch User success', () => {
    const action = {
      type: types.PATCH_USER_SUCCESS,
      user: user
    };
    const expectedState = {
      ...initialState,
      patchUserRequest: false,
      patchUserFailed: false,
      isSuccess: true,
      user: {
        email: user.email,
        name: user.name
      }
    };

    expect(patchUserReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Patch User error', () => {
    const action = {
      type: types.PATCH_USER_FAILED
    };
    const expectedState = {
      ...initialState,
      patchUserRequest: false,
      patchUserFailed: true,
      isSuccess: false
    };

    expect(patchUserReducer(initialState, action)
    ).toEqual(expectedState)
  })

})