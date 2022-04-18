import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from "../actions/ingredients";

import {
  ADD_BUN,
  ADD_INNER_ITEM,
  REMOVE_INNER_ITEM,
  SET_SELECTED_INGREDIENT,
  MOVE_ITEM,
  UPDATE_ITEM
} from "../actions/constructor";

const initialState = {
  foodData: [],
  foodDataRequest: false,
  foodDataFailed: false,
  constructor: {
    selectedBun: {},
    innerItems: []
  },
  selectedIngredient: {}
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
    case ADD_BUN: {
      return {
        constructor: {
          ...state.constructor,
          bunItem: action.bun
        },
        foodData: state.foodData.map(item => {
          if (item.type === "bun") {
            if (item._id === action.bun._id) {
              return { ...item, count: 2 };
            } else {
              return { ...item, count: 0 };
            }
          } else {
            return item;
          }
        })
      }
    }
    case ADD_INNER_ITEM: {
      return {
        constructor: {
          ...state.constructor,
          innerItems: [ ...state.constructor.innerItems, action.item]
        },
        foodData: [...state.foodData].map(item =>
          item._id === action.item._id ? { ...item, count: ++item.count } : item
        )
      }
    }
    case REMOVE_INNER_ITEM: {
      return {
        constructor: {
          ...state.constructor,
          innerItems: [...state.constructor.innerItems].filter(item => item._id !== action.item._id)
        },
        foodData: [...state.foodData].map(item =>
          item._id === action.item._id ? { ...item, count: --item.count } : item
        )
      }
    }
    case SET_SELECTED_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.item
      }
    }
    default: {
      return state;
    }
  }
}