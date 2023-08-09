// store.js
import { configureStore } from "@reduxjs/toolkit";
import simDataReducer from "./dataSlice";

const store = configureStore({
  reducer: {
    simData: simDataReducer,
  },
});

export default store;
