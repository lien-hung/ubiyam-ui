import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Bundle } from "../types/bundle";
import type { CartItem } from "../types/cart";
import type { Product } from "../types/product";

type CartState = {
  items: CartItem[];
};

const loadState = (): CartState => {
  try {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) as CartState : { items: [] };
  } catch {
    return { items: [] };
  }
};

const saveState = (state: CartState) => {
  try {
    localStorage.setItem("cart", JSON.stringify(state));
  } catch {
    localStorage.setItem("cart", JSON.stringify({ items: [] }));
  }
};

const initialState: CartState = loadState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ product: Product, bundle?: Bundle }>) {
      const { product, bundle } = action.payload;
      const productCartItem: CartItem = {
        ...product,
        key: Date.now(),
        productId: product.id,
        quantity: bundle ? bundle.buyQuantity : 1,
      };
      state.items.push(productCartItem);
      saveState(state);
    },

    updateQuantity(state, action: PayloadAction<{ key: number, quantity: number }>) {
      const { key, quantity } = action.payload;
      const item = state.items.find((i) => i.key === key);
      if (item) {
        item.quantity = Math.max(0, quantity);
      }
      saveState(state);
    },

    removeFromCart(state, action: PayloadAction<number>) {
      const key = action.payload;
      state.items = state.items.filter((i) => i.key !== key);
      saveState(state);
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
