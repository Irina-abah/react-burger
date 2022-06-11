import { BASE_URL } from '../../utils/constants';
import { checkResponse } from '../../utils/check-response';
import { TAppDispatch, TExtendedItem, TAppThunk } from '../../utils/types';

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";
export const ADD_BUN: "ADD_BUN" = "ADD_BUN";
export const ADD_INNER_ITEM: "ADD_INNER_ITEM" = "ADD_INNER_ITEM";
export const REMOVE_INNER_ITEM: "REMOVE_INNER_ITEM" = "REMOVE_INNER_ITEM";
export const UPDATE_CONSTRUCTOR_LIST: "UPDATE_CONSTRUCTOR_LIST" = "UPDATE_CONSTRUCTOR_LIST";
export const RESET_CONSTRUSTOR: "RESET_CONSTRUSTOR" = "RESET_CONSTRUSTOR";

export interface IGetIngredientsAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
};
export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  foodData: Array<TExtendedItem>;
}
export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}
export interface IAddBunAction {
  readonly type: typeof ADD_BUN;
  bun: TExtendedItem;
}
export interface IAddInnerItemAction {
  readonly type: typeof ADD_INNER_ITEM;
  item: TExtendedItem;
}
export interface IRemoveInnerItemAction {
  readonly type: typeof REMOVE_INNER_ITEM;
  item: TExtendedItem;
}
export interface IUpdateListAction {
  readonly type: typeof UPDATE_CONSTRUCTOR_LIST;
  updatedItems: Array<TExtendedItem>;
}
export interface IResetListAction {
  readonly type: typeof RESET_CONSTRUSTOR;
  innerItems: Array<TExtendedItem>[];
}

export type TGetIngredientsActions = 
  | IGetIngredientsAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction
  | IAddBunAction
  | IAddInnerItemAction
  | IRemoveInnerItemAction
  | IUpdateListAction 
  | IResetListAction;

function handleIngredientsError() {
  return {
    type: GET_INGREDIENTS_FAILED
  }
}

export const getIngredients: TAppThunk = () => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    })
    fetch(`${BASE_URL}/ingredients`)
    .then(checkResponse)
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          foodData: res.data
        })
      } else {
        dispatch(handleIngredientsError())
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch(handleIngredientsError())
    })
  }
}