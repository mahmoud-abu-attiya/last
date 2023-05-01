import { createSlice } from "@reduxjs/toolkit";

export const forProgramsSlice = createSlice({
   name: "forPrograms",
   initialState: {
      value: [],
   },
   reducers: {
      setForProgramsData: (state, action) => {
         state.value = action.payload;
      }
   },
});

export const { setForProgramsData } = forProgramsSlice.actions;

export default forProgramsSlice.reducer;