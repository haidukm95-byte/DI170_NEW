import { configureStore } from "@reduxjs/toolkit";
import { userReducer, postsReducer } from "../features/state/slice.js";

export const store = configureStore({
  reducer: {
    users: userReducer,
    posts: postsReducer,
  },
});
