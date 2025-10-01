import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
      if (state.value < 0) {
        alert("The count cannot be less than zero!");
        state.value = 0;
      }
    },
    incrementByAmount: (state, action) => {
      state.value += Number(action.payload);
    },
    decrementByAmount: (state, action) => {
      state.value -= Number(action.payload);
      if (state.value < 0) {
        alert("The count cannot be less than zero!");
        state.value = 0;
      }
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount,
  reset,
} = counterSlice.actions;

export default counterSlice.reducer;
