import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/state/slice";

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

export default store;
