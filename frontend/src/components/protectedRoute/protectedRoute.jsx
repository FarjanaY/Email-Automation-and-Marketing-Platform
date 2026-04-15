//External Imports
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LoadingPage from "../loader/LoadingPage";

//Internal Imports

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.authR);

  //Loading page
  if (isLoading && !isAuthenticated) {
    return <LoadingPage />;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ previousPath: location.pathname }} replace />
  );
};

export default ProtectedRoute;
