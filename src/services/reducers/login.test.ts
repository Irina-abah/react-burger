import { AnyAction } from 'redux';
import { loginReducer } from './login';
import { initialState } from './login';
import * as types from '../actions/login';

describe('login reducer', () => {

  const user = {
    email: "irina@irina.com",
    name: "irina"
  }

  it('should return unitial state', () => {
    expect(loginReducer(undefined, {} as AnyAction)).toEqual(initialState)
  })

  it('should handle Login request', () => {
    const action = {
      type: types.LOGIN_USER_REQUEST
    };
    const expectedState = {
      ...initialState,
      loginRequest: true,
    };

    expect(loginReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Login success', () => {
    const action = {
      type: types.LOGIN_USER_SUCCESS,
      user: user
    };
    const expectedState = {
      ...initialState,
      isLoggedIn: true,
      loginRequest: false,
      loginFailed: false,
      user: {
        email: user.email,
        name: user.name
      }
    };

    expect(loginReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Login error', () => {
    const action = {
      type: types.LOGIN_USER_FAILED
    };
    const expectedState = {
      ...initialState,
      isLoggedIn: false,
      loginRequest: false,
      loginFailed: true,
    };

    expect(loginReducer(initialState, action)
    ).toEqual(expectedState)
  })

})