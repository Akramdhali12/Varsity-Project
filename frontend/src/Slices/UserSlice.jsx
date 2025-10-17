import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const userSlice = createSlice({
  name: "user",
  initialState:localStorage.getItem("Token")? jwtDecode(localStorage.getItem("Token")||''):{},
  reducers:{
    setUser:(state, action) => {
      state = action.payload;
      return state;
    },
    removeUser:(state) => {
      state = {};
      return state;
    }
  }
})

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;