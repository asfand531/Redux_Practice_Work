import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../authentication/authenticationSlice";

export default configureStore({
  reducer: {
    login: userReducer,
  },
});
