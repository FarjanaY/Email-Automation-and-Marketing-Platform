/* eslint-disable no-unused-vars */
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

//User Registration (Verify user account)
export const verifyUserRegistration = createAsyncThunk(
  "auth/verifyUserRegistration",
  async (userData, thunkAPI) => {
    try {
      const res = await registerUserAPI(userData);
      console.log("registerUser=============================");
      console.log(res);
      console.log("res.data");
      console.log(res.data);
      console.log("res.data.payload");
      console.log(res.data.payload);
      return res.data;
    } catch (err) {
      console.log("ERRregisterUser=========");
      // Backend error format: err.response?.data?.errors?.common?.msg
      const errorMsg = err.response?.data?.errors || "Verification error.";
      console.log(errorMsg);
      return thunkAPI.rejectWithValue(errorMsg);
    }
  },
);

//Activate user account after registration
export const activateUserAccount = createAsyncThunk(
  "auth/activateUserAccount",
  async (token, thunkAPI) => {
    try {
      const res = await activateUserAccountAPI({ token });
      console.log("activateUserAccount=============================");
      console.log(res);
      console.log("res.data");
      console.log(res.data);
      console.log("res.data.payload");
      console.log(res.data.payload);
      return res.data;
    } catch (err) {
      console.log("Activation error ERR=========");
      // Backend error format: err.response?.data?.errors?.common?.msg
      const errorMsg = err.response?.data?.errors || "Activation error.";
      console.log(errorMsg);
      return thunkAPI.rejectWithValue(errorMsg);
    }
  },
);

//Log in
export const logIn = createAsyncThunk(
  "auth/login",
  async (userDate, thunkAPI) => {
    try {
      const res = await logInAPI(userDate);
      console.log("Login=============================");
      console.log(res);
      console.log("res.data");
      console.log(res.data);
      console.log("res.data.payload");
      console.log(res.data.payload);
      return res.data;
    } catch (err) {
      console.log(" logInERR=========");
      // Backend error format: err.response?.data?.errors?.common?.msg
      const errorMsg = err.response?.data?.errors || "Login failed.";
      console.log(errorMsg);
      return thunkAPI.rejectWithValue(errorMsg);
    }
  },
);

//=========Check Login for authentication=======
export const isUserLoggedIn = createAsyncThunk(
  "auth/checkLogin",
  async (_, thunkAPI) => {
    try {
      const res = await isUserLoggedInAPI();
      console.log("=============================");
      console.log(res);
      console.log("res.data");
      console.log(res.data);
      console.log("res.data.payload");
      console.log(res.data.payload);
      return res.data;
    } catch (err) {
      console.log("isUserLoggedInERR=========");

      // Backend error format: err.response?.data?.errors?.common?.msg
      const errorMsg = err.response?.data?.errors || "Verification error.";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  },
);

//Log Out
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    // Logout doesn't need any data - just clears cookies
    const res = await logOutAPI();
    console.log("LogOut=============================");
    console.log(res);
    console.log("res.data");
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("LogoutERR=========");
    // Backend error format: err.response?.data?.errors?.common?.msg
    const errorMsg = err.response?.data?.errors || "Logout failed";
    return thunkAPI.rejectWithValue(errorMsg);
  }
});

//Forget password
export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async ({ email }, thunkAPI) => {
    try {
      const res = await forgetPasswordAPI({ email });
      console.log("Forget Password=============================");
      console.log(res);
      console.log("res.data");
      console.log(res.data);
      console.log("res.data.payload");
      console.log(res.data.payload);
      return res.data;
    } catch (err) {
      console.log("LogoutERR=========");
      // Backend error format: err.response?.data?.errors?.common?.msg
      const errorMsg = err.response?.data?.errors || "Login failed.";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  },
);

//Forget password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ password }, thunkAPI) => {
    try {
      const res = await resetPasswordAPI({ password });
      console.log("Reset Password=============================");
      console.log(res);
      console.log("res.data");
      console.log(res.data);
      console.log("res.data.payload");
      console.log(res.data.payload);
      return res.data;
    } catch (err) {
      console.log("LogoutERR=========");
      // Backend error format: err.response?.data?.errors?.common?.msg
      const errorMsg = err.response?.data?.errors || "Login failed.";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  },
);

//Initial State for data
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isError: false,
  error: null,
  forgetPassword: false,
  resetPassword: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyUserRegistration.pending, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.forgetPassword = false;
        state.resetPassword = false;
      })
      .addCase(verifyUserRegistration.fulfilled, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.forgetPassword = false;
        state.resetPassword = false;
      })
      .addCase(verifyUserRegistration.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.isError = true;
        // Use action.payload (from rejectWithValue) for error message
        state.error =
          action.payload || action.error?.message || "Verification failed";
        state.forgetPassword = false;
        state.resetPassword = false;
      })
      .addCase(activateUserAccount.pending, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.forgetPassword = false;
        state.resetPassword = false;
      })
      .addCase(activateUserAccount.fulfilled, (state, action) => {
        // Backend returns: { success, msg, user } - user is directly in action.payload.user
        // After activation, user needs to login, so keep isAuthenticated = false
        state.user = action.payload?.user || null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.forgetPassword = false;
        state.resetPassword = false;
      })
      .addCase(activateUserAccount.rejected, (state, action) => {
        // Don't set user to error message - keep it null
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.isError = true;
        // Use action.payload (from rejectWithValue) for error message
        state.error =
          action.payload || action.error?.message || "Activation failed";
        state.forgetPassword = false;
        state.resetPassword = false;
      })
      .addCase(logIn.pending, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.forgetPassword = false;
        state.resetPassword = false;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        // Backend returns: { success, msg, payload: user }
        // So user is inside action.payload.payload
        state.user = action.payload?.payload || null;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.forgetPassword = false;
        state.resetPassword = false;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.isError = true;
        // Use action.payload (from rejectWithValue) for error message
        state.error = action.payload || action.error?.message || "Login failed";
        state.forgetPassword = false;
        state.resetPassword = false;
      })
      .addCase(isUserLoggedIn.pending, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.forgetPassword = false;
        state.resetPassword = false;
      })
      .addCase(isUserLoggedIn.fulfilled, (state, action) => {
        // Backend returns: { success, msg, payload: req.user }
        // So user is inside action.payload.payload
        state.user = action.payload?.payload || null;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.forgetPassword = false;
        state.resetPassword = false;
      })
      .addCase(isUserLoggedIn.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.isError = true;
        // Use action.payload (from rejectWithValue) for error message
        state.error =
          action.payload || action.error?.message || "Not authenticated";
        state.forgetPassword = false;
        state.resetPassword = false;
      })
      .addCase(logOut.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.forgetPassword = false;
        state.resetPassword = false;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.forgetPassword = false;
        state.resetPassword = false;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
        state.forgetPassword = false;
        state.resetPassword = false;
      })
      .addCase(forgetPassword.pending, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.forgetPassword = false;
        state.resetPassword = false;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        // Forgot password doesn't return a user - just sends email
        // Don't change user or isAuthenticated - user is still logged out
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.forgetPassword = true; // Flag to show "check your email" message
        state.resetPassword = false; // Reset password not done yet
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
        state.forgetPassword = false;
        state.resetPassword = false;
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.forgetPassword = false;
        state.resetPassword = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        // Reset password returns user in payload, but user still needs to login
        // Backend returns: { success, msg, payload: updatedPassword }
        // Don't auto-login after reset - user should login manually
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.forgetPassword = false; // Clear forgot password flag
        state.resetPassword = true; // Flag to show "password reset successful" message
        // Keep user = null and isAuthenticated = false - user needs to login
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
        state.forgetPassword = false;
        state.resetPassword = false;
      });
  },
});

export default authSlice.reducer;
