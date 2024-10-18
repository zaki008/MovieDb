import { alertMessage } from "./allertMessage";

export const validateCreateMovie = (form) => {
  if (form.title.trim() === "") {
    alertMessage("Title is required", "error");
    return false;
  }
  if (form?.rating?.toString()?.trim() === "") {
    alertMessage("Rating is required", "error");
    return false;
  }
  if (!form.releaseDate) {
    alertMessage("Release Date is required", "error");
    return false;
  }
  return true;
};
