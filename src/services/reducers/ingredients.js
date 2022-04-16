import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from "../actions/ingredients";

const initialState = {
  foodData: [],
  foodDataRequest: false,
  foodDataFailed: false,
}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        foodData: action.foodData,
        foodDataRequest: false,
        foodDataFailed: false
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        foodDataFailed: true,
        foodDataRequest: false,
      }
    }
    default: {
      return state;
    }
  }
}