import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  loading: false,
};

const BASE_URL = "https://product-api-v75n.onrender.com";

export const getAllProducts = createAsyncThunk("products", async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    //if there is no http request
  },
  extraReducers: (builder) => {
    //use for http requests
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      });
  },
});

export const {} = productSlice.actions;
export default productSlice.reducer;
