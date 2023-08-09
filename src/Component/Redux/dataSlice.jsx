// simDataSlice.js
import { createSlice } from "@reduxjs/toolkit";

const simDataSlice = createSlice({
  name: "simData",
  initialState: [],
  reducers: {
    fetchSimDataSuccess: (state, action) => {
      return action.payload;
    },
    deleteSimDataSuccess: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { fetchSimDataSuccess, deleteSimDataSuccess } =
  simDataSlice.actions;
export default simDataSlice.reducer;
