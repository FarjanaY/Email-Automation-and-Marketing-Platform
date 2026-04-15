import React from "react";
import { useSelector } from "react-redux";
import LoadingPage from "../loader/LoadingPage";
import { Navigate, Outlet } from "react-router-dom";

const RoleBasedRouts = ({ allowedRoles }) => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.authR,
  );

  if (isLoading) return <LoadingPage />;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default RoleBasedRouts;
