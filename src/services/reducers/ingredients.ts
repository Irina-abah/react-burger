import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_BUN,
  ADD_INNER_ITEM,
  REMOVE_INNER_ITEM,
  UPDATE_CONSTRUCTOR_LIST,
  RESET_CONSTRUSTOR
} from '../actions/ingredients';
import { TGetIngredientsActions } from '../actions/ingredients';
import { TExtendedItem } from '../../utils/types';

type TGetIngredientsState = {
  foodData: Array<TExtendedItem>;
  foodDataRequest: boolean;
  foodDataFailed: boolean;
  constructor: {
    selectedBun: TExtendedItem | {};
    innerItems: Array<TExtendedItem>;
  };
  selectedIngredient: TExtendedItem | {};
}


export const initialState: TGetIngredientsState = {
  foodData: [],
  foodDataRequest: false,
  foodDataFailed: false,
  constructor: {
    selectedBun: {},
    innerItems: [],
  },
  selectedIngredient: {}
}

export const ingredientsReducer = (state = initialState, action: TGetIngredientsActions): TGetIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        foodDataRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        foodData: action.foodData.map((item) => {
          item.count = 0;
          return item
        }),
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
        ...state,
        constructor: {
          ...state.constructor,
          selectedBun: action.bun
        },
        foodData: [...state.foodData].map(item => {
          if (item.type === "bun") {
            if (item._id === action.bun._id) {
              return { ...item, count: 2 };
            } else {
              return { ...item, count: 0 };
            }
          } 
            return item;
        })
      }
    }
    case ADD_INNER_ITEM: {
      return {
        ...state,
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
        ...state,
        constructor: {
          ...state.constructor,
          innerItems: [...state.constructor.innerItems].filter(item => item.dragId !== action.item.dragId)
        },
        foodData: [...state.foodData].map(item =>
          item._id === action.item._id ? { ...item, count: --item.count } : item
        )
      }
    }

    case UPDATE_CONSTRUCTOR_LIST: {
      return {
        ...state,
        constructor: {
          ...state.constructor,
          innerItems: action.updatedItems
        }
      }
    }
    case RESET_CONSTRUSTOR: {
      return {
        ...state,
        constructor: {
          ...state.constructor,
          selectedBun: {},
          innerItems: []
        },
        foodData: [...state.foodData].map((item) => {
          item.count = 0;
          return item
        }),
      }
    }
    default: {
      return state;
    }
  }
}