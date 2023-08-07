// src/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Replace 'YOUR_API_ENDPOINT' with your actual API endpoint.
const url = "http://localhost:3000/ene/sim/All/";

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await axios.get(url);
  return response.data;
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
