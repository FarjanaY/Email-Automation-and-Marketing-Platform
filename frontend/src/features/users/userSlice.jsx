//External Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Internal Imports
// import api from "../../app/api.jsx";
import {
  activateUserAccountAPI,
  isUserLoggedInAPI,
  logInAPI,
  logOutAPI,
  registerUserAPI,
  forgetPasswordAPI,
  resetPasswordAPI,
} from "../../dataFromApiCall/authDataFromAPI.jsx";
import api from "../../app/api.jsx";
import {
  showLoadingToast,
  showSuccessToast,
  showErrorToast,
} from "../../utils/helper/toast.jsx";

//=========Check Login for authentication=======
export const getOneUser = createAsyncThunk(
  "auth/checkLogin",
  async (userId, thunkAPI) => {
    try {
      const res = await isUserLoggedInAPI(userId);
      console.log("=============================");
      console.log(res);

      return res;
    } catch (err) {
      console.log("isUserLoggedInERR=========");
      // Backend error format: err.response?.data?.errors?.common?.msg
      const errorMsg = err.response?.data?.errors || "Login failed.";
      console.log(errorMsg);
      const refreshMsg = errorMsg?.common?.msg;
      const wasAuthenticated =
        sessionStorage.getItem("wasAuthenticated") === "1"; //edit

      // const status = err.response?.status;
      // if (status === 401) {
      //   return thunkAPI.rejectWithValue({ sessionExpired: true });
      // }

      //EDit starts
      const isSessionExpiredMsg =
        refreshMsg === "No such user found." ||
        refreshMsg === "Refresh token is expired. Please login again." ||
        refreshMsg === "Invalid or expired token." ||
        refreshMsg === "Token has expired." ||
        refreshMsg === "Invalid Token.";
      if (wasAuthenticated && isSessionExpiredMsg) {
        return thunkAPI.rejectWithValue({ sessionExpired: true });
      }
      //edit ends
      return thunkAPI.rejectWithValue(errorMsg || "Verification Error.");
    }
  },
);

//Initial State for data
const initialState = {};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOneUser.pending, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.forgetPass = false;
        state.resetPass = false;
      })
      .addCase(getOneUser.fulfilled, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.forgetPass = false;
        state.resetPass = false;
      })
      .addCase(getOneUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.isError = true;
        // Use action.payload (from rejectWithValue) for error message
        state.error =
          action.payload || action.error?.message || "Verification failed";
        state.forgetPass = false;
        state.resetPass = false;
      });
  },
});
export const { setSessionExpired, clearSessionExpired } = userSlice.actions;
export default userSlice.reducer;
