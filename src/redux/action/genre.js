import { API_HOST, API_KEY } from "@/config/Api";
import axios from "axios";
import { IS_LOADING_GENRE, SET_LIST_GENRE } from "../types";

export const getGenres = () => async (dispatch) => {
  try {
    dispatch({ type: IS_LOADING_GENRE, value: true });
    const res = await axios.get(
      `${API_HOST.baseUrl}/genre/movie/list?api_key=${API_KEY}`
    );
    if (res) {
      dispatch({ type: IS_LOADING_GENRE, value: false });
      dispatch({ type: SET_LIST_GENRE, value: res.data.genres });
    }
  } catch (err) {
    dispatch({ type: IS_LOADING_GENRE, value: false });
    console.log("err", err);
  }
};
