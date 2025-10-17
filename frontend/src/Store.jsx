import { configureStore } from "@reduxjs/toolkit";
import jwtReducer from "./Slices/JwtSlice";

const store = configureStore({
  reducer: {
    jwt: jwtReducer,
  },
});

export default store;