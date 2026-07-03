//External Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Internal Imports
// import api from "../../app/api.jsx";
import {
  getOneUserByIdAPI,
  getOneUserByEmailAPI,
  getAllUsersAPI,
} from "../../dataFromApiCall/userDataFromAPI.jsx";
import api from "../../app/api.jsx";
import {
  showLoadingToast,
  showSuccessToast,
  showErrorToast,
} from "../../utils/helper/toast.jsx";

//=========Get One user data by user ID=======

export const getOneUserById = createAsyncThunk(
  "user/getOneUserById",
  async (userId, thunkAPI) => {
    try {
      const res = await getOneUserByIdAPI(userId);
      // console.log("getOneUser=============================");
      // console.log(res);
      return res;
    } catch (err) {
      console.log("Get One user ERR=========");
      // Backend error format: err.response?.data?.errors?.common?.msg
      const errorMsg = err.response?.data?.errors || "No Such Data Found.";
      console.log(errorMsg);
      return thunkAPI.rejectWithValue(errorMsg);
    }
  },
);

//=========Get One user data by user email  =======

export const getOneUserByEmail = createAsyncThunk(
  "user/getOneUserByEmail",
  async ({ email, search }, thunkAPI) => {
    try {
      const res = await getOneUserByEmailAPI(email, search);
      console.log("getOneUser=============================");
      console.log(res);
      return res;
    } catch (err) {
      console.log("Get One user ERR=========");
      // Backend error format: err.response?.data?.errors?.common?.msg
      const errorMsg = err.response?.data?.errors || "No Such Data Found.";
      console.log(errorMsg);
      return thunkAPI.rejectWithValue(errorMsg);
    }
  },
);

//=========Get All user data  =======
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async ({ page = 1, limit = 5, search = "" }, thunkAPI) => {
    try {
      const res = await getAllUsersAPI(page, limit, search);
      console.log("get All Users=============================");
      console.log(res);
      return res;
    } catch (err) {
      console.log("Get All users ERR=========");
      // Backend error format: err.response?.data?.errors?.common?.msg
      const errorMsg = err.response?.data?.errors || "No Such Data Found.";
      console.log(errorMsg);
      return thunkAPI.rejectWithValue(errorMsg);
    }
  },
);

//Initial State for data
const initialState = {
  user: null,
  users: [],
  pagination: {
    perPageTotalDataCount: 0,
    totalPage: 0,
    currentPage: 1,
    nextPage: null,
    previousPage: null,
  },
  totalDataCount: 0,
  isLoading: false,
  isError: false,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null;
    },
    clearUsers(state) {
      state.users = [];
    },
    clearUserError(state) {
      state.error = null;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOneUserById.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })

      .addCase(getOneUserById.fulfilled, (state, action) => {
        //backend returns ----{  success, msg, payload}
        state.user = action.payload.payload;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(getOneUserById.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.isError = true;
        // Use action.payload (from rejectWithValue) for error message
        state.error =
          action.payload || action.error?.message || "Verification failed";
      })

      //Get All Users
      .addCase(getAllUsers.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        //backend returns ----{  success, msg, payload}
        state.isLoading = false;
        state.users = action.payload.payload;
        state.pagination = action.payload.pagination;
        state.totalDataCount = action.payload.totalDataCount;
        state.isError = false;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // Use action.payload (from rejectWithValue) for error message
        state.error =
          action.payload || action.error?.message || "Verification failed";
      });
  },
});
export const { clearUser, clearUsers, clearUserError } = userSlice.actions;
export default userSlice.reducer;
