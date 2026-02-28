//External Imports
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingPage from "../loader/LoadingPage";

//Internal Imports

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.authR);

  //Loading page
  if (isLoading && !isAuthenticated) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
