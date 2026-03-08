//External Imports
import axios from "axios";

//Internal Imports
import { logOut } from "../features/auth/authSlice.jsx";

let store;
export const injectStore = (_store) => {
  store = _store;
};

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

//Endpoints where refresh path should not run
const SKIP_REFRESH_PATHS = [
  "/api/login",
  "/api/logout",
  "/api/check-login",
  "/api/forgot-pass",
  "/api/reset-pass",
  "/api/users/sign-up/verify",
  "/api/users/sign-up/activate_user_acc",
];

//Auto refresh interceptor
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    const url = originalRequest?.url || "";
    const shouldSkipRefresh = SKIP_REFRESH_PATHS.some((p) => url.includes(p));

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !shouldSkipRefresh
    ) {
      originalRequest._retry = true;
      try {
        //calling the backend refresh middleware route.
        await api.get(`/api/check-login`);
        return api(originalRequest);
      } catch (refreshErr) {
        store.dispatch(logOut());
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
