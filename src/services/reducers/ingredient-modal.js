import {
  OPEN_MODAL,
  CLOSE_MODAL
} from "../actions/ingredient-modal";

const initialState = {
  selectedItem: {},
  modalOpened: false,
  modalClosed: true,
}

export const modalReducer = (state = initialState, action) => {
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