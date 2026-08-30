import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ProductVariant, ProductVariantRequest } from "../types/product";
import API from "./api";

const initialState = {
  variants: new Array<ProductVariant>(),
  isLoading: false,
  error: {},
};

export const addVariant = createAsyncThunk(
  "productVariant/add",
  async (payload: ProductVariantRequest, { rejectWithValue }) => {
    try {
      const res = await API.post<ProductVariant>(
        "product-variants",
        { body: JSON.stringify(payload), headers: { "Content-Type": "application/json" } }
      );
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteVariant = createAsyncThunk(
  "productVariant/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await API.delete(`product-variants/${id}`);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const productVariantSlice = createSlice({
  name: "productVariant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addVariant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addVariant.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(addVariant.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.variants.push(action.payload);
        }
      })
      .addCase(deleteVariant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteVariant.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(deleteVariant.fulfilled, (state, action) => {
        state.isLoading = false;
        const id = action.meta.arg;
        const index = state.variants.findIndex((v) => v.id === id);
        state.variants.splice(index, 1);
      });
  }
});

export default productVariantSlice.reducer;