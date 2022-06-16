import { AnyAction } from 'redux';
import { getUserReducer } from './get-user';
import { initialState } from './get-user';
import * as types from '../actions/get-user';

describe('get user reducer', () => {

  const user = {
    email: "irina@irina.com",
    name: "irina"
  }

  it('should return unitial state', () => {
    expect(getUserReducer(undefined, {} as AnyAction)).toEqual(initialState)
  })

  it('should handle Get User request', () => {
    const action = {
      type: types.GET_USER_REQUEST
    };
    const expectedState = {
      ...initialState,
      getUserRequest: true,
    };

    expect(getUserReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Get User success', () => {
    const action = {
      type: types.GET_USER_SUCCESS,
      user: user
    };
    const expectedState = {
      ...initialState,
      isAuthenticated: true,
        getUserRequest: false,
        getUserFailed: false,
        user: {
          email: user.email,
          name: user.name
        }
    };

    expect(getUserReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Get User error', () => {
    const action = {
      type: types.GET_USER_FAILED
    };
    const expectedState = {
      ...initialState,
      isAuthenticated: false,
      getUserRequest: false,
      getUserFailed: true,
    };

    expect(getUserReducer(initialState, action)
    ).toEqual(expectedState)
  })

})