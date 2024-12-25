// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import mahasiswaReducer from "./features/mahasiswaSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mahasiswa: mahasiswaReducer,
  },
});
