// src/features/mahasiswaSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mahasiswaList: [],
  selectedMahasiswa: null,
};

const mahasiswaSlice = createSlice({
  name: "mahasiswa",
  initialState,
  reducers: {
    setMahasiswaList: (state, action) => {
      state.mahasiswaList = action.payload;
    },
    setSelectedMahasiswa: (state, action) => {
      state.selectedMahasiswa = action.payload;
    },
  },
});

export const { setMahasiswaList, setSelectedMahasiswa } =
  mahasiswaSlice.actions;
export default mahasiswaSlice.reducer;
