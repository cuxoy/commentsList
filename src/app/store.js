import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./commentsSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  comments: commentsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
