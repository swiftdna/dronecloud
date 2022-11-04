import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
  name: "bookdrone",
  initialState: {
    farmtype: null,
  },
  reducers: {
    bookdrone: (state, action) => {
      state.farmtype = action.payload;
    },
    
  },
});

export const { bookdrone} = bookSlice.actions;

export const selectBookdrone = (state) => state.bookdrone.bookdrone;

export default bookSlice.reducer;
