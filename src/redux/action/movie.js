import { API_HOST, API_KEY } from "@/config/Api";
import axios from "axios";
import { IS_LOADING_MOVIE, SET_LIST_SEARCH_MOVIE } from "../types/movieTypes";

export const getMovies = (setLoad, setData, movies) => async (dispatch) => {
  try {
    const { page, sort_by, release_date_gte, release_date_lte, with_genres } =
      movies;
    const queryParams = [];
    queryParams.push(`api_key=${API_KEY}`);
    if (page !== undefined) queryParams.push(`page=${page}`);
    if (sort_by) queryParams.push(`sort_by=${sort_by}`);
    if (release_date_gte)
      queryParams.push(`primary_release_date.gte=${release_date_gte}`);
    if (release_date_lte)
      queryParams.push(`primary_release_date.lte=${release_date_lte}`);
    if (with_genres.length !== 0)
      queryParams.push(`with_genres=${with_genres.join(",")}`);
    const queryString = queryParams.join("&");
    setLoad(true);
    const res = await axios.get(
      `${API_HOST.baseUrl}/discover/movie?${queryString}`
    );
    if (res) {
      setLoad(false);
      setData({
        page: res.data.page,
        results: res.data.results,
        total_pages: res.data.total_pages,
        total_results: res.data.total_results,
      });
    }
  } catch (err) {
    setLoad(false);
    console.log("err", err);
  }
};

export const getSearhMovie = (movies) => async (dispatch) => {
  try {
    dispatch({ type: IS_LOADING_MOVIE, value: true });
    const res = await axios.get(
      `${API_HOST.baseUrl}/search/movie?api_key=${API_KEY}&query=${movies.search}&page=${movies.page}`
    );
    if (res) {
      dispatch({ type: IS_LOADING_MOVIE, value: false });
      const data = {
        ...movies,
        page: res.data.page,
        results: res.data.results,
        total_pages: res.data.total_pages,
        total_results: res.data.total_results,
      };
      dispatch({ type: SET_LIST_SEARCH_MOVIE, value: data });
    }
  } catch (err) {
    dispatch({ type: IS_LOADING_MOVIE, value: false });
    console.log("err", err);
  }
};

export const deleteMovieById =
  (id, movies, handleChangeMovie) => async (dispatch) => {
    try {
      const newData = movies?.results?.filter((item) => item.id != id);
      handleChangeMovie({
        results: newData,
      });
    } catch (err) {
      console.log("err", err);
    }
  };
