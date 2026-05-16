import { configureStore, combineReducers } from "@reduxjs/toolkit";

import tasksReducer from "../features/state/slice.js";

const appReducers = combineReducers({
  tasksReducer,
});

export const store = configureStore({
  reducer: {
    appReducers,
  },
});

export default store;
