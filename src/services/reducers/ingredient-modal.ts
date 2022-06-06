import {
  OPEN_MODAL,
  CLOSE_MODAL
} from "../actions/ingredient-modal";
import { TModalActions} from '../actions/ingredient-modal';
import { TItem } from "../../utils/types";

type TIngredientState = {
  selectedItem: TItem | {};
  modalOpened: boolean;
  modalClosed: boolean;
}

const initialState: TIngredientState = {
  selectedItem: {},
  modalOpened: false,
  modalClosed: true,
}

export const modalReducer = (state = initialState, action: TModalActions) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        selectedItem: action.item,
        modalOpened: true,
        modalClosed: false
      }
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        selectedItem: {},
        modalOpened: false,
        modalClosed: true,
      }
    }
    default: {
      return state;
    }
  }
}