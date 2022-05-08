import {
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  PATCH_USER_FAILED
} from "../actions/patch-user";

const initialState = {
  user: { 
    email: "",
    name: ""
  },
  patchUserRequest: false,
  patchUserFailed: false
}

export const patchUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case PATCH_USER_REQUEST: {
      return {
        ...state,
        patchUserRequest: true,
      };
    }
    case PATCH_USER_SUCCESS: {
      return {
        ...state,
        patchUserRequest: false,
        patchUserFailed: false,
        user: action.user
      }
    }
    case PATCH_USER_FAILED: {
      return {
        ...state,
        patchUserRequest: false,
        patchUserFailed: true,
      }
    }
    default: {
      return state;
    }
  }
}