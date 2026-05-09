import { ADD, MINUS, ADD_VALUE, ADD_TASK } from "./actions.js";
const initialState = {
  count: 10,
  tasks: [],
};

export const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return { ...state, count: state.count + 1 };
    case MINUS:
      return { ...state, count: state.count - 1 };
    case ADD_VALUE:
      return { ...state, count: state.count + Number(action.payload) };
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, { name: action.payload.name }],
      };
    default:
      return state;
  }

  /* THE SAME OPERATION BUT IN DIFFERENT APPROACH
  if (action.type === ADD) {
    return { ...state, count: state.count + 1 };
  } else if (action.type === MINUS) {
    return { ...state, count: state.count - 1 };
  }
  return state;
  */
};
