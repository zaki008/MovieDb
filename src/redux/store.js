import { applyMiddleware, createStore } from "redux";
import { persistReducer } from "redux-persist";

import persistStore from "redux-persist/es/persistStore";
import localStorage from "redux-persist/es/storage";
import { thunk } from "redux-thunk";
import reducer from "./reducer";

const persistConfig = {
  key: "root",
  storage: localStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
