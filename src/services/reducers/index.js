import { combineReducers } from 'redux';
import { orderReducer } from './order';
import { ingredientsReducer } from './ingredients';
import { modalReducer } from './ingredient-modal';
import { registerReducer } from './register';
import { loginReducer } from './login';

export const rootReducer = combineReducers({
  order: orderReducer,
  ingredients: ingredientsReducer,
  modal: modalReducer,
  register: registerReducer,
  login: loginReducer
});