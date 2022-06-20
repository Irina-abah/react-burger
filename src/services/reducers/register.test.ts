import { AnyAction } from 'redux';
import { registerReducer } from './register';
import { initialState } from './register';
import * as types from '../actions/register';

describe('register reducer', () => {

  const user = {
    email: "irina@irina.com",
    name: "irina"
  }

  it('should return unitial state', () => {
    expect(registerReducer(undefined, {} as AnyAction)).toEqual(initialState)
  })

  it('should handle Register request', () => {
    const action = {
      type: types.REGISTER_USER_REQUEST
    };
    const expectedState = {
      ...initialState,
      registerRequest: true
    };

    expect(registerReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Register success', () => {
    const action = {
      type: types.REGISTER_USER_SUCCESS,
      user: user
    };
    const expectedState = {
      ...initialState,
      registerFailed: false,
      registerRequest: false,
      isAuthenticated: true,
      user: {
        email: user.email,
        name: user.name
      }
    };

    expect(registerReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Register error', () => {
    const action = {
      type: types.REGISTER_USER_FAILED
    };
    const expectedState = {
      ...initialState,
      registerFailed: true,
      registerRequest: false,
    };

    expect(registerReducer(initialState, action)
    ).toEqual(expectedState)
  })

})