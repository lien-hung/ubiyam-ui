import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import bundleSlice from "./bundleSlice";
import bundleGiftSlice from "./bundleGiftSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    product: productSlice,
    bundle: bundleSlice,
    bundleGift: bundleGiftSlice,
    cart: cartSlice,
  }
});

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;