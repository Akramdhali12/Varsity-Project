import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState:{},
  reducers:{
    setprofile:(state, action) => {
      state = action.payload;
      return state;
    },
    removeprofile:(state) => {
      state = {};
      return state;
    }
  }
})

export const {setprofile, removeprofile} = profileSlice.actions;

export default profileSlice.reducer;