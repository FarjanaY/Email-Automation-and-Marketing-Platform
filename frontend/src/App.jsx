//External Imports
import { useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Internal Imports
import { isUserLoggedIn, logIn } from "./features/auth/authSlice";
import LoadingPage from "./components/loader/LoadingPage";
import HomePage from "./components/home/HomePage";
import LoginPage from "./components/user/LoginPage";
import ErrorPage from "./components/common/ErrorPage";
import AccountActivationPage from "./components/user/AccountActivationPage";
import RegistrationPage from "./components/user/RegistrationPage";
import ForgotPasswordPage from "./components/user/ForgotPasswordPage";
import ResetPasswordPage from "./components/user/ResetPasswordPage";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import PublicRoute from "./components/protectedRoute/PublicRoute";
import RoleBasedRouts from "./components/protectedRoute/RoleBasedRouts";
import AdminDashBoard from "./components/admin/AdminDashBoard";
import ProfilePage from "./components/user/ProfilePage";
function App() {
  //authReducersState === user, isAuthenticated, isLoading, isError, error,  forgetPassword, resetPassword,

  const { isAuthenticated, isLoading } = useSelector((state) => state.authR);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isUserLoggedIn());
  }, [dispatch]);

  //Loading page
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Routes>
        {/* Public Routes only for guests */}
        <Route element={<PublicRoute />}>
          <Route exact path="/login" element={<LoginPage />} />
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
    </>
  );
}

export default App;
