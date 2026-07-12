//External Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Internal Imports
// import api from "../../app/api.jsx";
import {
  getOneUserByIdAPI,
  getOneUserByEmailAPI,
  getAllUsersAPI,
  updateUserAPI,
  deleteUserAPI,
  banUserAPI,
  unbanUserAPI,
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

//=========Update/Edit user data  =======
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await updateUserAPI(id, data);
      showSuccessToast(res.msg);
      return res;
    } catch (err) {
      console.log("Update user ERR=========");
      // Backend error format: err.response?.data?.errors?.common?.msg
      const errorMsg = err.response?.data?.errors || "Couldn't update user.";
      console.log(errorMsg);

      showErrorToast(errorMsg);
      return thunkAPI.rejectWithValue(errorMsg);
    }
  },
);

//=========Delete user data  =======
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, thunkAPI) => {
    try {
      const res = await deleteUserAPI(id);
      showSuccessToast(res.msg);
      return res;
    } catch (err) {
      console.log("Delete user ERR=========");
      // Backend error format: err.response?.data?.errors?.common?.msg
      const errorMsg =
        err.response?.data?.errors || "Couldn't delete user account.";
      console.log(errorMsg);
      showErrorToast(errorMsg);
      return thunkAPI.rejectWithValue(errorMsg);
    }
  },
);

//=========Banned A User by Admin =======
export const banUser = createAsyncThunk(
  "user/banUser",
  async (id, thunkAPI) => {
    try {
      const res = await banUserAPI(id);
      showSuccessToast(res.msg);
      return res;
    } catch (err) {
      console.log("Banned user ERR=========");
      // Backend error format: err.response?.data?.errors?.common?.msg
      const errorMsg = err.response?.data?.errors || "Couldn't ban user.";
      console.log(errorMsg);
      showErrorToast(errorMsg);
      return thunkAPI.rejectWithValue(errorMsg);
    }
  },
);

//=========Banned A User by Admin  =======
export const unbanUser = createAsyncThunk(
  "user/unbanUser",
  async (id, thunkAPI) => {
    try {
      const res = await unbanUserAPI(id);
      showSuccessToast(res.msg);
      return res;
    } catch (err) {
      console.log("Unbanned user ERR=========");
      // Backend error format: err.response?.data?.errors?.common?.msg
      const errorMsg = err.response?.data?.errors || "Couldn't unban user.";
      console.log(errorMsg);
      showErrorToast(errorMsg);
      return thunkAPI.rejectWithValue(errorMsg);
    }
  },
);

//=========Change role   =======
export const changeRole = createAsyncThunk(
  "user/changeRole",
  async (id, thunkAPI) => {
    try {
      const res = await updateUserAPI(id);
      showSuccessToast(res.msg);
    } catch (err) {
      console.log("Update user ERR=========");
      // Backend error format: err.response?.data?.errors?.common?.msg
      const errorMsg = err.response?.data?.errors || "No Such Data Found.";
      console.log(errorMsg);
      showErrorToast(errorMsg);
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
  isSuccess: false,
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
    resetUserState(state) {
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOneUserById.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.isSuccess = false;
      })

      .addCase(getOneUserById.fulfilled, (state, action) => {
        //backend returns ----{  success, msg, payload}
        state.user = action.payload.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(getOneUserById.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.isSuccess = false;
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
        state.isSuccess = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // Use action.payload (from rejectWithValue) for error message
        state.error =
          action.payload || action.error?.message || "No such data found.";
      })
      // Update User
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.error = null;
        state.isLoading = false;
        const updated = action.payload.payload;
        state.user = updated;

        //Users array updating instade to requesting all users again(very fast)
        state.users = state.users.map((user) =>
          user._id === updated._id ? updated : user,
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        // Use action.payload (from rejectWithValue) for error message
        state.error =
          action.payload ||
          action.error?.message ||
          "Error! Couldn't update user.";
      })
      // Delete User
      .addCase(deleteUser.pending, (state, action) => {
        state.isSuccess = false;
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        //No extra API request.
        const id = action.meta.arg;
        state.users = state.users.filter((user) => user._id !== id);
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        // Use action.payload (from rejectWithValue) for error message
        state.error =
          action.payload ||
          action.error?.message ||
          "Couldn't delete your account.";
      })

      // Ban User
      .addCase(banUser.pending, (state, action) => {
        state.isSuccess = false;
        state.isLoading = true;
      })
      .addCase(banUser.fulfilled, (state, action) => {
        const banUpdated = action.payload.payload;

        state.users = state.users.map((user) =>
          user._id === banUpdated._id ? banUpdated : user,
        );

        // keep "my profile" in sync if I ever ban myself via this path
        if (state.user?.id === banUpdated._id) {
          state.user = banUpdated;
        }
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(banUser.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.error =
          action.payload || action.error?.message || "Couldn't ban user.";
      })

      // Unban User
      .addCase(unbanUser.pending, (state, action) => {
        state.isSuccess = false;
        state.isLoading = true;
      })
      .addCase(unbanUser.fulfilled, (state, action) => {
        const unbanUpdated = action.payload.payload;

        state.users = state.users.map((user) =>
          user._id === unbanUpdated._id ? unbanUpdated : user,
        );
        if (state.user?._id === unbanUpdated._id) {
          state.user = unbanUpdated;
        }
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(unbanUser.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.error =
          action.payload || action.error?.message || "Couldn't unban user.";
      });
  },
});
export const { clearUser, clearUsers, clearUserError, resetUserState } =
  userSlice.actions;
export default userSlice.reducer;
