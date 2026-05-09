export const ADD_TASK = "add_task";
export const IS_DONE = "is_done";
export const REMOVE_TASK = "remove_task";

export const addTask = (name, date) => ({
  type: ADD_TASK,
  payload: { id: Date.now(), name, date, isCompleted: false },
});

export const isDone = (id) => ({
  type: IS_DONE,
  payload: id,
});

export const removeTask = (id) => ({
  type: REMOVE_TASK,
  payload: id,
});
