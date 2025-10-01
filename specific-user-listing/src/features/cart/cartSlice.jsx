import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [123],
  reducers: {
    addCart: (state, action) => {
      const existingIndex = state.findIndex(
        (item) => item.name === action.payload.name
      );

      if (existingIndex !== -1) {
        state[existingIndex].count += 1;
      } else {
        state.push({ ...action.payload, count: 1 });
      }
    },
  },
});

export const { addCart } = cartSlice.actions;
export default cartSlice.reducer;
