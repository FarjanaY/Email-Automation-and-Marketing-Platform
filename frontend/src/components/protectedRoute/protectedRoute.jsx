//External Imports
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

//Internal Imports
import LoadingPage from "../loader/LoadingPage";
import { clearSessionExpired } from "../../features/auth/authSlice";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, sessionExpired, sessionExpiredLastPath } =
    useSelector((state) => state.authR);

  //const [showOverlay, setShowOverlay] = useState(false);
  //const [dismissed, setDismissed] = useState(false);
  //delaying overlay for regenerating access token
  //const overlay_dealys_MS = 1000;

  // useEffect(() => {
  //   let t;
  //   if (sessionExpired) {
  //     setDismissed(false);
  //     t = setTimeout(() => setShowOverlay(true), overlay_dealys_MS);
  //   } else {
  //     setShowOverlay(false);
  //     setDismissed(false);
  //   }
  //   return () => clearTimeout(t);
  // }, [sessionExpired]);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Loading page (after checking overlay flag)
  if (isLoading && !isAuthenticated) {
    return <LoadingPage />;
  }

  //const previousPath = location.state?.from?.pathname;
  //if session expired : keep current url, show overlay(no navigate)
  if (!isLoading) {
    if (sessionExpired && !isAuthenticated) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded shadow max-w-md w-full text-center">
            <h2>Session Expired</h2>
            <p>Plaese login again to continue.</p>

            <div>
              <button
                onClick={() => {
                  //goto login remember where they were
                  navigate("/login", {
                    replace: true,
                    state: {
                      from: {
                        pathname: sessionExpiredLastPath || location.pathname,
                      },
                    },
                  });
                }}
              >
                Login Again
              </button>
              <button
                onClick={() => {
                  //dismis overlay (user stays on page. but still logged out)
                  //setDismissed(true);
                  dispatch(clearSessionExpired());
                }}
              >
                Stay Here
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  //Normal auth behaviour
  if (!isAuthenticated && !sessionExpired) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
