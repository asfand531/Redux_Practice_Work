import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "login",
  initialState: {
    login: false,
    username: "",
  },
  reducers: {
    login: (state, action) => {
      state.login = true;
      state.username = action.payload;
    },
    logout: (state) => {
      state.login = false;
      state.username = "";
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
