import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
  name: "bookdrone",
  initialState: {
    farmtype: null,
    id:null,
    name:null,
    manufacturer:null,
    service:null,
    equipment:null,
    price:null,
    dronedatetime:null,
    fromdate:null,
    todate:null,
    farmland:null,
    farmid:null,
    pilotid:null,
  },
  reducers: {
    bookdrone: (state, action) => {
      state.farmtype = action.payload.farmtype
      state.id = action.payload.id
      state.name = action.payload.name
      state.price = action.payload.price
      state.manufacturer = action.payload.manufacturer
      state.service = action.payload.service
      state.equipment = action.payload.equipment
      state.dronedatetime = action.payload.dronedatetime
      state.fromdate = action.payload.fromdate
      state.todate = action.payload.todate
      state.farmland = action.payload.farmland
      state.farmid = action.payload.farmid
      state.pilotid = action.payload.pilotid


    },
   
    
    
  },
});

export const { bookdrone} = bookSlice.actions;

export const selectBookdrone = (state) => state.bookdrone.bookdrone;

export default bookSlice.reducer;
