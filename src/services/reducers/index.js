import { combineReducers } from 'redux';

import { orderReducer } from './order';
import { ingredientsReducer } from './ingredients';
import { modalReducer } from './ingredient-modal';

export const rootReducer = combineReducers({
  order: orderReducer,
  ingredients: ingredientsReducer,
  modal: modalReducer
});