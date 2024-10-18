import { IS_LOADING_GENRE, SET_LIST_GENRE } from "../types";

const initialState = {
  isLoadingGenre: false,
  listGenre: [],
};

export const genreReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING_GENRE: {
      return {
        ...state,
        isLoadingGenre: action.value,
      };
    }
    case SET_LIST_GENRE: {
      return {
        ...state,
        listGenre: action.value,
      };
    }
    default:
      return state;
  }
};
