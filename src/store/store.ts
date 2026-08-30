import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import productVariantSlice from "./productVariantSlice";

const store = configureStore({
  reducer: {
    product: productSlice,
    productVariant: productVariantSlice,
    cart: cartSlice,
  }
});

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;