import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/asyncCounter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
