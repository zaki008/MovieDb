const initialState = {
  isLoading: false,
};

export const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "IS_LOADING_PAGE": {
      return {
        ...state,
        isLoading: action.value,
      };
    }
    default:
      return state;
  }
};
