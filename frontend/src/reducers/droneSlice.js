import { createSlice } from "@reduxjs/toolkit";
console.log("sss")

export const droneSlice = createSlice({
  name: "dronedetails",
  initialState: {
   state:null,
   name:null
  },
  reducers: {
    dronedetails: (state, action) => {
    

      state.id = action.payload.state;
      state.name =action.payload.name;
    },
    
    
  },
  
});
export const { dronedetails} = droneSlice.actions;

export const selectDronedetails = (state) => state.dronedetails.dronedetails;

export default droneSlice.reducer;
