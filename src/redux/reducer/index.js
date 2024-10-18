import { combineReducers } from "redux";
import { bookmarkReducer } from "./bookmark";
import { genreReducer } from "./genre";
import { globalReducer } from "./global";
import { movieReducer } from "./movie";

const reducer = combineReducers({
  globalReducer,
  genreReducer,
  movieReducer,
  bookmarkReducer,
});

export default reducer;
