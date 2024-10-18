import { SET_LIST_BOOKMARK } from "../types";

const initialState = {
  listBookmark: [],
};

export const bookmarkReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST_BOOKMARK: {
      return {
        ...state,
        listBookmark: action.value,
      };
    }
    default:
      return state;
  }
};
