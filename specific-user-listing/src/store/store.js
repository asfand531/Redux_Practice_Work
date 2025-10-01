import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});
