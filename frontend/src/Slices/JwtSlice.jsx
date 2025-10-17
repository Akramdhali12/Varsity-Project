import { createSlice } from "@reduxjs/toolkit";

const jwtSlice = createSlice({
  name: "jwt",
  initialState:localStorage.getItem("Token") || null,
  reducers:{
    setJwt:(state, action) => {
      localStorage.setItem("Token", action.payload);
      state = action.payload;
      return state;
    },
    removeJwt:(state) => {
      localStorage.removeItem("Token");
      state = null;
      return state;
    }
  }
})

export const {setJwt, removeJwt} = jwtSlice.actions;

export default jwtSlice.reducer;