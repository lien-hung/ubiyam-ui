import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Product, ProductRequest } from "../types/product";
import API from "./api";

const initialState = {
  products: new Array<Product>(),
  isLoading: false,
  error: {},
};

export const createProduct = createAsyncThunk(
  "product/create",
  async (payload: ProductRequest, { rejectWithValue }) => {
    try {
      const res = await API.post<Product>(
        "products",
        { body: JSON.stringify(payload), headers: { "Content-Type": "application/json" } }
      );
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "product/getAll",
  async (_, { rejectWithValue }) => {
    try {
      return await API.get<Product[]>("products");
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProductById = createAsyncThunk(
  "product/getById",
  async (id: number, { rejectWithValue }) => {
    try {
      return await API.get<Product>(`products/${id}`);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProductByHandle = createAsyncThunk(
  "product/getByHandle",
  async (handle: string, { rejectWithValue }) => {
    try {
      return await API.get<Product[]>(`products/?handle=${handle}`);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, data }: { id: number, data: ProductRequest }, { rejectWithValue }) => {
    try {
      await API.put(
        `products/${id}`,
        { body: JSON.stringify(data), headers: { "Content-Type": "application/json" } },
      );
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await API.delete(`products/${id}`);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.products.push(action.payload);
        }
      })
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.products = action.payload;
        }
      })
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload ? [action.payload] : [];
      })
      .addCase(getProductByHandle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductByHandle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(getProductByHandle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload ?? [];
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const { data, id } = action.meta.arg;
        const index = state.products.findIndex((p) => p.id === id);
        state.products.splice(index, 1, { ...state.products[index], ...data });
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const id = action.meta.arg;
        const index = state.products.findIndex((p) => p.id === id);
        state.products.splice(index, 1);
      });
  }
});

export default productSlice.reducer;