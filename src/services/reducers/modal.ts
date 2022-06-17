import {
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_MODAL_ORDER
} from '../actions/modal';
import { TModalActions} from '../actions/modal';
import { TItem, TOrder } from '../../utils/types';

type TIngredientState = {
  selectedItem: TItem | {};
  selectedOrder: TOrder | {};
  modalOpened: boolean;
  modalClosed: boolean;
}

const initialState: TIngredientState = {
  selectedItem: {},
  selectedOrder: {},
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
    case OPEN_MODAL_ORDER: {
      return {
        ...state,
        selectedOrder: action.item,
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