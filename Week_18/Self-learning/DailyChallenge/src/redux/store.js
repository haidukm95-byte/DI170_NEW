import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "./reducers";

const loadState = () => {
  // TO SAVE TASKS LIST
  try {
    const saved = localStorage.getItem("todos");
    return saved ? { todos: JSON.parse(saved) } : undefined;
  } catch {
    return undefined;
  }
};
const store = configureStore({
  reducer: { todos: tasksReducer },
  preloadedState: loadState(), //PRELOADER IS APPLIED TO LOAD SAVED TASKS FROM THE PREVIOUS SESSION
});

store.subscribe(() => {
  localStorage.setItem("todos", JSON.stringify(store.getState().todos));
});

export default store;
