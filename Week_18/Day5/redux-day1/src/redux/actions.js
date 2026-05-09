export const ADD = "increment";
export const MINUS = "decrement";
export const ADD_VALUE = "add_input_value";
export const ADD_TASK = "add_task";

export const addTask = (name) => {
  return {
    type: ADD_TASK,
    payload: { name },
  };
};

export const increment = () => {
  console.log("increment action");

  return {
    type: ADD,
  };
};

export const decrement = () => {
  return {
    type: MINUS,
  };
};

export const addInputValue = (val) => {
  return {
    type: ADD_VALUE,
    payload: val,
  };
};
