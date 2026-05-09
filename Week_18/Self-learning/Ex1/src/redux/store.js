import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "./reducers";

const store = configureStore({
  reducer: {
    todos: tasksReducer,
  },
});

export default store;
