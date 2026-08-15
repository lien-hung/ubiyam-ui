import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { BundleGift, BundleGiftRequest } from "../types/bundle";
import API from "./api";

const initialState = {
  gifts: new Array<BundleGift>(),
  isLoading: false,
  error: {},
};

export const addGift = createAsyncThunk(
  "bundleGift/add",
  async (payload: BundleGiftRequest, { rejectWithValue }) => {
    try {
      const res = await API.post<BundleGift>(
        "gifts",
        { body: JSON.stringify(payload), headers: { "Content-Type": "application/json" } }
      );
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteGift = createAsyncThunk(
  "bundleGift/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await API.delete(`gifts/${id}`);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const bundleGiftSlice = createSlice({
  name: "bundleGift",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addGift.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addGift.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(addGift.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.gifts.push(action.payload);
        }
      })
      .addCase(deleteGift.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGift.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(deleteGift.fulfilled, (state, action) => {
        state.isLoading = false;
        const id = action.meta.arg;
        const index = state.gifts.findIndex((g) => g.id === id);
        state.gifts.splice(index, 1);
      });
  }
});

export default bundleGiftSlice.reducer;