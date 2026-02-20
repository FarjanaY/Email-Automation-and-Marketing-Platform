//External Imports
import { configureStore } from "@reduxjs/toolkit";

//Internal Imports
import authReducer from "../features/auth/authSlice.jsx";
//import userReducer from "../features/users/userSlice.jsx";

const store = configureStore({
  reducer: {
    authR: authReducer,
    //userR: userReducer,
  },
});

export default store;
