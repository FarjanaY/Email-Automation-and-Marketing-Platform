//External Imports
import { configureStore } from "@reduxjs/toolkit";

//Internal Imports
import authReducer from "../features/auth/authSlice.jsx";
import uiReducer from "../features/ui/uiSlice.jsx";
import userReducer from "../features/users/userSlice.jsx";
import { injectStore } from "./api.jsx";
//import userReducer from "../features/users/userSlice.jsx";

const store = configureStore({
  reducer: {
    authR: authReducer,
    userR: userReducer,
    uiR: uiReducer,
  },
});

injectStore(store);

export default store;
