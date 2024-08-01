import { configureStore, applyMiddleware, Tuple } from "@reduxjs/toolkit";
import { apiReducer } from "./reducer";
import { loggerMiddleware } from "./logger";
import { thunk } from "redux-thunk";

export const store = configureStore({
  reducer: apiReducer,
  middleware: () => new Tuple(loggerMiddleware, thunk),
});
