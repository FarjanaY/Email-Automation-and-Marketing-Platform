import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import LoadingPage from "../loader/LoadingPage";

const OVERLAY_DELAY_MS = 1200;

const ProtectedRouteWithOverlay = () => {
  const { isAuthenticated, isLoading, sessionExpired, sessionExpiredLastPath } =
    useSelector((state) => state.authR);

  const location = useLocation();
  const navigate = useNavigate();

  const [showOverlay, setShowOverlay] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let t;
    if (sessionExpired) {
      setDismissed(false);
      t = setTimeout(() => setShowOverlay(true), OVERLAY_DELAY_MS);
    } else {
      setShowOverlay(false);
      setDismissed(false);
    }
    return () => clearTimeout(t);
  }, [sessionExpired]);

  if (isLoading && !isAuthenticated) return <LoadingPage />;

  // Overlay (delayed)
  if (sessionExpired && !isAuthenticated && showOverlay && !dismissed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black/50">
        <div className="bg-white p-6 rounded shadow max-w-md w-full text-center">
          <h2 className="text-xl font-bold">Session Expired</h2>
          <p className="pt-2 text-gray-700">Please login again to continue.</p>

          <div className="flex gap-3 justify-center pt-5">
            <button
              className="px-4 py-2 rounded bg-blue-600 text-white"
              onClick={() =>
                navigate("/login", {
                  replace: true,
                  state: {
                    from: {
                      pathname: sessionExpiredLastPath || location.pathname,
                    },
                  },
                })
              }
            >
              Login Again
            </button>

            <button
              className="px-4 py-2 rounded bg-gray-200"
              onClick={() => setDismissed(true)}
            >
              Stay Here
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Stay here: don’t redirect, but block protected content
  if (sessionExpired && !isAuthenticated && dismissed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded shadow max-w-md w-full text-center">
          <h2 className="text-lg font-bold">Logged out</h2>
          <p className="pt-2 text-gray-700">
            Your session expired. Login again to continue.
          </p>

          <div className="pt-5">
            <button
              className="px-4 py-2 rounded bg-blue-600 text-white"
              onClick={() =>
                navigate("/login", {
                  replace: true,
                  state: { from: { pathname: location.pathname } },
                })
              }
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRouteWithOverlay;
