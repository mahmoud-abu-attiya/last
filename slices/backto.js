import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   value: false,
};

export const backtoSlice = createSlice({
   name: "backto",
   initialState,
   reducers: {
      setBacktoData: (state, action) => {
         state.value = action.payload;
      }
   },
});

export const { setBacktoData } = backtoSlice.actions;

export default backtoSlice.reducer;