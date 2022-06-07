// import PropTypes from "prop-types";

// const ingredientType = PropTypes.shape({
//   _id: PropTypes.string,
//   name: PropTypes.string,
//   price: PropTypes.number,
//   image: PropTypes.string,
//   type: PropTypes.string,
//   proteins: PropTypes.number,
//   fat: PropTypes.number,
//   carbohydrates: PropTypes.number,
//   calories: PropTypes.number,
//   image_mobile: PropTypes.string,
//   image_large: PropTypes.string,
// })

// export default ingredientType;
import { Location } from 'history';
import { store } from '../index';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { TConstructorActions } from '../services/actions/constructor';
import { TForgotPassActions }from '../services/actions/forgot-pass';
import { TGetUserActions } from '../services/actions/get-user';
import { TModalActions } from '../services/actions/ingredient-modal';
import { TGetIngredientsActions } from '../services/actions/ingredients';
import { TLoginUserActions } from '../services/actions/login';
import { TLogoutUserActions } from '../services/actions/logout';
import { TMakeOrderActions } from '../services/actions/order';
import { TPatchUserActions } from '../services/actions/patch-user';
import { TRefreshTokenActions } from '../services/actions/refresh-token';
import { TRegisterUserActions } from '../services/actions/register';
import { TResetPassActions } from '../services/actions/reset-pass';

type TApplicationActions = 
| TConstructorActions
| TForgotPassActions
| TGetUserActions
| TModalActions
| TGetIngredientsActions
| TLoginUserActions
| TLogoutUserActions
| TMakeOrderActions
| TPatchUserActions
| TRefreshTokenActions
| TRegisterUserActions
| TResetPassActions;

export type TRootState = ReturnType<typeof store.getState>; 

export type TAppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, TRootState, TApplicationActions>
>;

export type TAppDispatch = typeof store.dispatch;; 

export type TUser = {
  name?: string,
  email?: string,
  password?: string,
  token?: string
};

export type TUserMain = Omit<TUser, "token">;

export type TUserLogin = Pick<TUser, "email" | "password">;

export type TUserReset = Pick<TUser, "password" | "token">;

export type TUserGet = Pick<TUser, "name" | "email">;

export type TItem = Readonly<{
  _id: string,
  name: string,
  price: number,
  image: string,
  type: "bun" | "main" | "sauce",
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  image_mobile: string,
  image_large: string,
}>;

export type TExtendedItem = TItem & {
  count: number,
  index?: number,
  dragId?: number
};

export type TLocationState = {
  state: {
    background?: Location,
    from?: string
  }
};

export type TOrder = Readonly<{
  _id: string,
  status: "created" | "done" | "pending",
  number: number,
  ingredients: Array<string>,
  createdAt: string,
  updatedAt: string,
  name: string
}>;

