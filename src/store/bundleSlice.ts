import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Bundle, BundleRequest } from "../types/bundle";
import API from "./api";

const initialState = {
  bundles: new Array<Bundle>(),
  isLoading: false,
  error: {},
};

export const createBundle = createAsyncThunk(
  "bundle/create",
  async (payload: BundleRequest, { rejectWithValue }) => {
    try {
      const res = await API.post<Bundle>(
        "bundles",
        { body: JSON.stringify(payload), headers: { "Content-Type": "application/json" } }
      );
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllBundles = createAsyncThunk(
  "bundle/getAll",
  async (_, { rejectWithValue }) => {
    try {
      return await API.get<Bundle[]>("bundles");
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getBundleById = createAsyncThunk(
  "bundle/getById",
  async (id: number, { rejectWithValue }) => {
    try {
      return await API.get<Bundle>(`bundles/${id}`);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateBundle = createAsyncThunk(
  "bundle/update",
  async ({ id, data }: { id: number, data: BundleRequest }, { rejectWithValue }) => {
    try {
      await API.put(
        `bundles/${id}`,
        { body: JSON.stringify(data), headers: { "Content-Type": "application/json" } },
      );
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteBundle = createAsyncThunk(
  "bundle/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await API.delete(`bundles/${id}`);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const bundleSlice = createSlice({
  name: "bundle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBundle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBundle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(createBundle.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.bundles.push(action.payload);
        }
      })
      .addCase(getAllBundles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBundles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(getAllBundles.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.bundles = action.payload;
        }
      })
      .addCase(getBundleById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBundleById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(getBundleById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bundles = action.payload ? [action.payload] : [];
      })
      .addCase(updateBundle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBundle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(updateBundle.fulfilled, (state, action) => {
        state.isLoading = false;
        const { data, id } = action.meta.arg;
        const index = state.bundles.findIndex((b) => b.id === id);
        state.bundles.splice(index, 1, { ...state.bundles[index], ...data });
      })
      .addCase(deleteBundle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBundle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(deleteBundle.fulfilled, (state, action) => {
        state.isLoading = false;
        const id = action.meta.arg;
        const index = state.bundles.findIndex((b) => b.id === id);
        state.bundles.splice(index, 1);
      });
  }
});

export default bundleSlice.reducer;