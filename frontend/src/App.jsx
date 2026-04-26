//External Imports
import { useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Internal Imports
import {
  isUserLoggedIn,
  logIn,
  setSessionExpired,
} from "./features/auth/authSlice";
import PublicRoute from "./components/protectedRoute/PublicRoute";
import LoginPage from "./pages/user/LoginPage";
import RegistrationPage from "./pages/user/RegistrationPage";
import AccountActivationPage from "./pages/user/AccountActivationPage";
import ForgotPasswordPage from "./pages/user/ForgotPasswordPage";
import ResetPasswordPage from "./pages/user/ResetPasswordPage";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import ProfilePage from "./pages/user/ProfilePage";
import HomePage from "./pages/home/HomePage";
import AdminDashBoard from "./pages/admin/AdminDashBoard";
import ErrorPage from "./pages/error/ErrorPage";
import LoadingPage from "./components/loader/LoadingPage";
import RoleBasedRouts from "./components/protectedRoute/RoleBasedRouts";
import ProtectedRouteWithOverlay from "./components/protectedRoute/ProtectedRouteWithOverlay";

function App() {
  //authReducersState === user, isAuthenticated, isLoading, isError, error,  forgetPassword, resetPassword,

  const { isAuthenticated, isLoading, user } = useSelector(
    (state) => state.authR,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const expired = sessionStorage.getItem("sessionExpired") === "1";
    const lastPath = sessionStorage.getItem("sessionExpiredLastPath") || "/";

    // restore ONLY on protected routes
    // const protectedPaths = ["/", "/profile"]; // add more if needed
    // const isOnProtectedRoute = protectedPaths.includes(
    //   window.location.pathname,
    // );

    if (expired) dispatch(setSessionExpired(lastPath));

    dispatch(isUserLoggedIn());
  }, [dispatch]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={300000}
        theme="light"
        newestOnTop
        closeOnClick
        pauseOnHover
        toastClassName="!border !border-none !bg-white !shadow-xl "
        bodyClassName="toastify_toast_body"
        progressClassName="!h-1 !bg-gradient-to-r !from-indigo-500 !to-sky-500"
      />
      {isLoading && !isAuthenticated ? (
        <LoadingPage />
      ) : (
        <Routes>
          {/* Public Routes only for guests */}
          <Route element={<PublicRoute />}>
            <Route
              exact
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
              }
            />
            <Route
              exact
              path="/users/activate"
              element={<AccountActivationPage />}
            />
            <Route exact path="/registration" element={<RegistrationPage />} />
            <Route
              exact
              path="/forgot-password"
              element={<ForgotPasswordPage />}
            />
            <Route
              exact
              path="/users/reset-password"
              element={<ResetPasswordPage />}
            />
          </Route>

          {/* Proteted Routes */}
          <Route element={<ProtectedRoute />}>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Role Based Routes */}
          <Route element={<RoleBasedRouts allowedRoles={["admin"]} />}>
            <Route path="/admin-dashboad" element={<AdminDashBoard />} />
          </Route>

          {/* Error Page */}
          <Route exact path="*" element={<ErrorPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
