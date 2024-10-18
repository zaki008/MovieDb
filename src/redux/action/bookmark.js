import { SET_LIST_BOOKMARK } from "../types";

export const saveBookmark = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LIST_BOOKMARK, value: data });
  } catch (err) {
    console.log("err", err);
  }
};
