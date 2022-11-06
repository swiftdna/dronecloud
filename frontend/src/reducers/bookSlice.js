import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
  name: "bookdrone",
  initialState: {
    farmtype: null,
    id:null,
    name:null
  },
  reducers: {
    bookdrone: (state, action) => {
      state.farmtype = action.payload.farmtype
      state.id = action.payload.id
      state.name = action.payload.name
    },
   
    
    
  },
});

export const { bookdrone} = bookSlice.actions;

export const selectBookdrone = (state) => state.bookdrone.bookdrone;

export default bookSlice.reducer;
