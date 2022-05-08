import { combineReducers } from 'redux';
import { orderReducer } from './order';
import { ingredientsReducer } from './ingredients';
import { modalReducer } from './ingredient-modal';
import { registerReducer } from './register';
import { loginReducer } from './login';
import { logoutReducer } from './logout';
import { forgotReducer } from './forgot-pass';
import { resetReducer } from './reset-pass';
import { getUserReducer } from './get-user';
import { tokenReducer } from './refresh-token';
import { patchUserReducer } from './patch-user';

export const rootReducer = combineReducers({
  order: orderReducer,
  ingredients: ingredientsReducer,
  modal: modalReducer,
  register: registerReducer,
  login: loginReducer,
  logout: logoutReducer,
  forgot: forgotReducer,
  reset: resetReducer,
  getUser: getUserReducer,
  patchUser: patchUserReducer,
  token: tokenReducer
});