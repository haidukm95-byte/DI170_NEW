import { ADD_TASK, IS_DONE, REMOVE_TASK } from "./actions.js";

const tasksInitialState = { tasks: [] };

export const tasksReducer = (state = tasksInitialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case IS_DONE:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, isCompleted: true } : task,
        ),
      };
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
};
