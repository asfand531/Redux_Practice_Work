import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload); // payload: { ...newProduct, userId }
    },
  },
});

export const { addProduct } = productsSlice.actions;
export default productsSlice.reducer;
