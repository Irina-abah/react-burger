import { BASE_URL } from "../../utils/constants";
import { checkResponse } from "../../utils/check-response";
import { TAppDispatch } from "../../utils/types";
import { TExtendedItem } from "../../utils/types";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";

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

export type TGetIngredientsActions = 
  | IGetIngredientsAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction;

function handleIngredientsError() {
  return {
    type: GET_INGREDIENTS_FAILED
  }
}

export const getIngredients = () => {
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