import { createStore, applyMiddleware } from "redux";
import { apiReducer } from "./reducer";
import { loggerMiddleware } from "./logger";
import { thunk } from "redux-thunk";

export const store = createStore(
  apiReducer,
  applyMiddleware(loggerMiddleware, thunk),
);
