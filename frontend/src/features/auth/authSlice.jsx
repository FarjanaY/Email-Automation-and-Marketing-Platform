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

//User Registration (Verify user account)
export const verifyUserRegistration = createAsyncThunk(
  "auth/verifyUserRegistration",
  async (userData, thunkAPI) => {
    const toastId = showLoadingToast("Registration process loading...");
    try {
      const res = await registerUserAPI(userData);
      console.log("registerUser=============================");

      console.log(res);
      showSuccessToast(toastId, res.msg || "Check your email 📩");
      return res;
    } catch (err) {
      console.log("ERRregisterUser=========");
      // Backend error format: err.response?.data?.errors?.common?.msg
      const errorMsg = err.response?.data?.errors || "Verification error.";
      console.log(errorMsg);
      showErrorToast(toastId, "Unsucessful. Please, try again.❌");
      return thunkAPI.rejectWithValue(errorMsg);
    }
  },
);

//Activate user account after registration
export const activateUserAccount = createAsyncThunk(
  "auth/activateUserAccount",
  async (token, thunkAPI) => {
    const toastId = showLoadingToast("Activating Account.");
    try {
      const res = await activateUserAccountAPI({ token });
      console.log("activateUserAccount=============================");
      console.log(res);
      showSuccessToast(toastId, res.msg || "Registration Successful. 🎉");
      return res;
    } catch (err) {
      console.log("Activation error ERR=========");
      // Backend error format: err.response?.data?.errors?.common?.msg
      const errorMsg = err.response?.data?.errors || "Activation error.";
      console.log(errorMsg);
      showErrorToast(toastId, "Regiatration failed! ❌");
      return thunkAPI.rejectWithValue(errorMsg);
    }
  },
);

//Log in
export const logIn = createAsyncThunk(
  "auth/login",
  async (userDate, thunkAPI) => {
    const toastId = showLoadingToast("Login.");
    try {
      const res = await logInAPI(userDate);
      console.log("Login=============================");
      console.log(res);
      showSuccessToast(toastId, res?.msg || "Login suceessful.🎉");
      return res;
    } catch (err) {
      console.log(" logInERR=========");
      // Backend error format: err.response?.data?.errors?.common?.msg
      const errorMsg = err.response?.data?.errors || "Login failed.";
      console.log(errorMsg);
      showErrorToast(toastId, "Login failed! ❌");
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

      return res;
    } catch (err) {
      console.log("isUserLoggedInERR=========");
      // Backend error format: err.response?.data?.errors?.common?.msg
      const errorMsg = err.response?.data?.errors || "Login failed.";
      console.log(errorMsg);
      const refreshMsg = errorMsg?.common?.msg;

      // const status = err.response?.status;
      // if (status === 401) {
      //   return thunkAPI.rejectWithValue({ sessionExpired: true });
      // }

      if (
        refreshMsg === "Refresh token is expired. Please login again." ||
        refreshMsg === "Please login." ||
        refreshMsg === "Please, login frist." ||
        refreshMsg === "Invalid or expired token." ||
        refreshMsg === "Token has expired." ||
        refreshMsg === "Token is not activated yet." ||
        refreshMsg === "Token is not activated yet."
      ) {
        return thunkAPI.rejectWithValue({ sessionExpired: true });
      }
      return thunkAPI.rejectWithValue(errorMsg || "Verification Error.");
    }
  },
);

//Log Out
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const toastId = showLoadingToast("Logout.");
  try {
    // Logout doesn't need any data - just clears cookies
    const res = await logOutAPI();
    console.log("LogOut=============================");
    console.log(res);
    showSuccessToast(toastId, res?.msg || "Logged Out. 🎉");
    return res;
  } catch (err) {
    console.log("LogoutERR=========");
    // Backend error format: err.response?.data?.errors?.common?.msg
    const errorMsg = err.response?.data?.errors || "Logout failed";
    showErrorToast(toastId, "Logout failed! ❌");
    return thunkAPI.rejectWithValue(errorMsg);
  }
});

//Forget password
export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async ({ email }, thunkAPI) => {
    const toastId = showLoadingToast("Forget Password.");
    try {
      const res = await forgetPasswordAPI({ email });
      console.log("Forget Password=============================");
      console.log(res);
      showSuccessToast(toastId, res.msg || "Check your email 📩");
      return res;
    } catch (err) {
      console.log("LogoutERR=========");
      // Backend error format: err.response?.data?.errors?.common?.msg
      const errorMsg =
        err.response?.data?.errors || "Resetting password is failed.";
      showErrorToast(toastId, "Failed! ❌");
      return thunkAPI.rejectWithValue(errorMsg);
    }
  },
);

//Forget password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }, thunkAPI) => {
    const toastId = showLoadingToast("Resetting Password.");
    try {
      const res = await resetPasswordAPI({ token, newPassword });
      console.log("Reset Password=============================");
      console.log(res);
      showSuccessToast(toastId, res.msg || "Password updated. 🎉");
      return res;
    } catch (err) {
      console.log("LogoutERR=========");
      // Backend error format: err.response?.data?.errors?.common?.msg
      const errors = err.response?.data?.errors;

      const refreshMsg = errors?.common?.msg;
      if (refreshMsg === "Refresh token is expired. Please login again.") {
        return thunkAPI.rejectWithValue(null);
      }
      const errorMsg = errors || "Password reset unsucceful.";
      showErrorToast(toastId, "Unsuccessful!❌");
      return thunkAPI.rejectWithValue(errorMsg);
    }
  },
);

//Initial State for data
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isError: false,
  error: null,
  forgetPass: false,
  resetPass: false,
  sessionExpired: false,
  sessionExpiredLastPath: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSessionExpired: (state, action) => {
      state.sessionExpired = true;
      state.sessionExpiredLastPath =
        action.payload || window.location.pathname || "/";
    },
    clearSessionExpired: (state, action) => {
      state.sessionExpired = false;
      state.sessionExpiredLastPath = null;
      sessionStorage.removeItem("sessionExpired");
      sessionStorage.removeItem("sessionExpiredLastPath");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyUserRegistration.pending, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.forgetPass = false;
        state.resetPass = false;
      })
      .addCase(verifyUserRegistration.fulfilled, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.forgetPass = false;
        state.resetPass = false;
      })
      .addCase(verifyUserRegistration.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.isError = true;
        // Use action.payload (from rejectWithValue) for error message
        state.error =
          action.payload || action.error?.message || "Verification failed";
        state.forgetPass = false;
        state.resetPass = false;
      })
      .addCase(activateUserAccount.pending, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.forgetPass = false;
        state.resetPass = false;
      })
      .addCase(activateUserAccount.fulfilled, (state, action) => {
        // Backend returns: { success, msg, user } - user is directly in action.payload.user
        // After activation, user needs to login, so keep isAuthenticated = false
        state.user = action.payload?.user || null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.forgetPass = false;
        state.resetPass = false;
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
        state.forgetPass = false;
        state.resetPass = false;
      })
      .addCase(logIn.pending, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.forgetPass = false;
        state.resetPass = false;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        // Backend returns: { success, msg, payload: user }
        // So user is inside action.payload.payload
        state.user = action.payload?.payload || null;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.forgetPass = false;
        state.resetPass = false;
        state.sessionExpired = false;
        state.sessionExpiredLastPath = null;
        sessionStorage.removeItem("sessionExpired");
        sessionStorage.removeItem("sessionExpiredLastPath");
      })
      .addCase(logIn.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.isError = true;
        // Use action.payload (from rejectWithValue) for error message
        state.error = action.payload || action.error?.message || "Login failed";
        state.forgetPass = false;
        state.resetPass = false;
      })
      .addCase(isUserLoggedIn.pending, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.forgetPass = false;
        state.resetPass = false;
      })
      .addCase(isUserLoggedIn.fulfilled, (state, action) => {
        // Backend returns: { success, msg, payload: req.user }
        // So user is inside action.payload.payload
        state.user = action.payload?.payload || null;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.forgetPass = false;
        state.resetPass = false;
        state.sessionExpired = false;
        state.sessionExpiredLastPath = null;
        sessionStorage.removeItem("sessionExpired");
        sessionStorage.removeItem("sessionExpiredLastPath");
      })
      .addCase(isUserLoggedIn.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.isError = true;
        state.forgetPass = false;
        state.resetPass = false;

        if (action.payload?.sessionExpired) {
          state.sessionExpired = true;
          state.sessionExpiredLastPath = window.location.pathname;
          state.error = null;

          sessionStorage.setItem("sessionExpired", "1");
          sessionStorage.setItem(
            "sessionExpiredLastPath",
            window.location.pathname,
          );
          return;
        }
        // Use action.payload (from rejectWithValue) for error message
        if (action.payload === null) {
          state.error = null;
          return;
        }

        state.error =
          action.payload || action.error?.message || "Not authenticated";
      })
      .addCase(logOut.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.forgetPass = false;
        state.resetPass = false;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.forgetPass = false;
        state.resetPass = false;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
        state.forgetPass = false;
        state.resetPass = false;
      })
      .addCase(forgetPassword.pending, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.forgetPass = false;
        state.resetPass = false;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        // Forgot password doesn't return a user - just sends email
        // Don't change user or isAuthenticated - user is still logged out
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.forgetPass = true; // Flag to show "check your email" message
        state.resetPass = false; // Reset password not done yet
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
        state.forgetPass = false;
        state.resetPass = false;
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.forgetPass = false;
        state.resetPass = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        // Reset password returns user in payload, but user still needs to login
        // Backend returns: { success, msg, payload: updatedPassword }
        // Don't auto-login after reset - user should login manually
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.forgetPass = false; // Clear forgot password flag
        state.resetPass = true; // Flag to show "password reset successful" message
        // Keep user = null and isAuthenticated = false - user needs to login
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
        state.forgetPass = false;
        state.resetPass = false;
      });
  },
});
export const { setSessionExpired, clearSessionExpired } = authSlice.actions;
export default authSlice.reducer;
