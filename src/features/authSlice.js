// src/features/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("auth_token") || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = "";
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
