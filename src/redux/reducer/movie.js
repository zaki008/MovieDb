import {
  IS_LOADING_MOVIE,
  RESET_MOVIE,
  SET_LIST_SEARCH_MOVIE,
} from "../types/movieTypes";

const initialState = {
  loadSearchMovie: false,
  movieSearch: {
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0,
    search: "a",
  },
};

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING_MOVIE: {
      return {
        ...state,
        loadSearchMovie: action.value,
      };
    }
    case SET_LIST_SEARCH_MOVIE: {
      return {
        ...state,
        movieSearch: action.value,
      };
    }
    case RESET_MOVIE: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};
