import { Location } from 'history';
import { store } from '../index';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE,
  WS_CONNECTION_CLOSED
} from '../services/actions/websocket';
import { TForgotPassActions }from '../services/actions/forgot-pass';
import { TGetUserActions } from '../services/actions/get-user';
import { TModalActions } from '../services/actions/modal';
import { TGetIngredientsActions } from '../services/actions/ingredients';
import { TLoginUserActions } from '../services/actions/login';
import { TLogoutUserActions } from '../services/actions/logout';
import { TMakeOrderActions } from '../services/actions/order';
import { TPatchUserActions } from '../services/actions/patch-user';
import { TRefreshTokenActions } from '../services/actions/refresh-token';
import { TRegisterUserActions } from '../services/actions/register';
import { TResetPassActions } from '../services/actions/reset-pass';
import { TWebSocketActions } from '../services/actions/websocket';
import { rootReducer } from '../services/reducers/index';

export type TApplicationActions = 
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
| TResetPassActions
| TWebSocketActions;

export type TRootState = ReturnType<typeof rootReducer>; 

export type TAppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, TRootState, TApplicationActions>
>;

export type TAppDispatch = typeof store.dispatch;

export type TUser = {
  name?: string | undefined,
  email?: string | undefined,
  password?: string | undefined,
  token?: string | undefined
};

export type TUserMain = Omit<TUser, "token">;

export type TUserLogin = Pick<TUser, "email" | "password">;

export type TUserReset = Pick<TUser, "password" | "token">;

export type TUserGet = Pick<TUser, "name" | "email">;

export type TItem = {
  _id: string,
  name: string,
  price: number,
  image: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  image_mobile: string,
  image_large: string,
  count: number,
  index?: number,
  dragId?: number,
  num?: number
};

export type TLocationState = {
  state: {
    background?: Location,
    from?: string | undefined,
    pathname?: string
  }
};

export type TOrder = {
  _id: string,
  status: string,
  number: number,
  ingredients: Array<string>,
  createdAt: string,
  updatedAt: string,
  name?: string
};

export type TOrders = {
  success: boolean,
  orders: Array<TOrder>,
  total: number,
  totalToday: number,
}

export type TWsActions = {
  wsStart: typeof WS_CONNECTION_START,
  wsClose: typeof WS_CONNECTION_CLOSE,
  onOpen: typeof WS_CONNECTION_SUCCESS,
  onClose: typeof WS_CONNECTION_CLOSED,
  onError: typeof WS_CONNECTION_ERROR,
  onMessage: typeof WS_GET_MESSAGE
}
