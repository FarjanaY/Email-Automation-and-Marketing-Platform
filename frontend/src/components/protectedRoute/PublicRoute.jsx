import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PublicRoute = () => {
  const { isAuthenticated, hasCheckAuth } = useSelector((state) => state.authR);

  const location = useLocation();
  //get previous route(if exist)
  const previousPath = location.state?.from?.pathname || "/";

  if (!hasCheckAuth) return null;
  return !isAuthenticated ? <Outlet /> : <Navigate to={previousPath} replace />;
};

export default PublicRoute;
