import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/userSlice/usersSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
  },
});
