/* eslint-disable no-unused-vars */
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
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* Login Registration Routes */}
        <Route exact path="/login" element={<LoginPage />} />
        <Route
          exact
          path="/sign-up/verify"
          element={<AccountActivationPage />}
        />
        <Route exact path="/registration" element={<RegistrationPage />} />
        <Route exact path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route exact path="/reset-password" element={<ResetPasswordPage />} />

        {/* User Routes */}
        {/* <Route
            exact
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          /> */}
        {/* Error Page */}
        <Route exact path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
