import { createSlice } from "@reduxjs/toolkit";

export const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    background: "dark",
  },
  reducers: {
    themeToggle: (state) => {
      state.background = state.background === "dark" ? "light" : "dark";
    },
  },
});

export const { themeToggle } = toggleSlice.actions;
export default toggleSlice.reducer;
