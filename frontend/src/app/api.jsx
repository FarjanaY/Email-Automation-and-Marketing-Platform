//External Imports
import axios from "axios";

//Internal Imports
// import store from "./store.jsx";
// import { logout } from "../features/auth/authSlice.jsx";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

//Auto refresh interceptor
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/check-login")
    ) {
      originalRequest._retry = true;
      try {
        //calling the backend refresh middleware route.
        await api.get(`/api/check-login`);
        return api(originalRequest);
      } catch (refreshErr) {
        //store.dispatch(logout());
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
