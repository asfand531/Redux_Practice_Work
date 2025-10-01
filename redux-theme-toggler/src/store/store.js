import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "../themeToggleSlice/themeSlice";

export default configureStore({
  reducer: {
    toggle: toggleReducer,
  },
});
