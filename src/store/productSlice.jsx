import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  products: [],
  loading: false,
  price: 0,
  goldPrice: 0,
};

const BASE_URL = "http://localhost:3005";

export const getAllProducts = createAsyncThunk("products", async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
});

export const getGoldPrice = createAsyncThunk(
  "products/getGoldPrice",
  async () => {
    const response = await axios.get("https://www.goldapi.io/api/XAU/USD", {
      headers: {
        // "x-access-token": "goldapi-45f3dsmct1b2jz-io",
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response.data.price;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    //if there is no http request
    calculatePrice: (state) => {
      state.products = state.products.map((item) => ({
        ...item,
        price: Number(
          ((item.popularityScore + 1) * item.weight * state.goldPrice).toFixed(
            2
          )
        ),
      }));
    },
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
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(getGoldPrice.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGoldPrice.fulfilled, (state, action) => {
        state.goldPrice = action.payload;
        state.loading = false;
      })
      .addCase(getGoldPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { calculatePrice } = productSlice.actions;
export default productSlice.reducer;
