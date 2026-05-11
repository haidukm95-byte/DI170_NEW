import { createSlice } from "@reduxjs/toolkit";
// immer library

const initialState = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // counter/increment
    increment: (state) => {
      //return { ...state, count: state.count + 1 };
      console.log("action=>", action);
      state.count++;
    },
    decrement: (state) => {
      console.log("action=>", action);
      state.count--;
    },
    addValue: (state, action) => {
      console.log("action=>", action);
      state.count += action.payload;
    },
    substractValue: (state, action) => {
      console.log("action=>", action);
      state.count -= action.payload;
    },
  },
  //extraReducers(builder) { }
});

export const { increment, decrement, addValue, substractValue } =
  counterSlice.actions;
export default counterSlice.reducer;
