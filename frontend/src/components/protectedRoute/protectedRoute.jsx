//External Imports
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

//Internal Imports
import LoadingPage from "../loader/LoadingPage";
import { clearSessionExpired } from "../../features/auth/authSlice";

const ProtectedRoute = () => {
  const {
    isAuthenticated,
    isLoading,
    hasCheckAuth,
    sessionExpired,
    sessionExpiredLastPath,
  } = useSelector((state) => state.authR);

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

  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    if (sessionExpired) setDismissed(false);
  }, [sessionExpired]);

  //Loading page (after checking overlay flag)
  if (isLoading && !isAuthenticated && !hasCheckAuth) {
    return <LoadingPage />;
  }

  //const previousPath = location.state?.from?.pathname;
  //if session expired : keep current url, show overlay(no navigate)
  if (!isLoading) {
    if (sessionExpired && !isAuthenticated && !dismissed) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl">
            {/* <div className="h-1 w-full bg-linear-to-r from-indigo-500 via-sky-500 to-emerald-500" /> */}
            <div className="p-6 sm:p-7 text-center">
              <div className="flex items-center justify-center gap-3">
                {/* Icon */}
                <div className="mt-0.5 flex h-5 shrink-0 items-center justify-center rounded-full">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5 text-red-600"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 9v4m0 4h.01M10.29 3.86l-7.4 12.82A2 2 0 0 0 4.62 20h14.76a2 2 0 0 0 1.73-3.32l-7.4-12.82a2 2 0 0 0-3.42 0Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="min-w-0">
                  <h2 className="text-sm font-semibold text-slate-600 sm:text-base">
                    Session Expired
                  </h2>
                </div>
              </div>
              <p className="mt-1 text-xs text-slate-600 sm:text-sm">
                Plaese login again to continue.
              </p>

              {/* Button */}
              <div className="mt-6 flex flex-col-reverse gap-3 sm:justyfy-end">
                <button
                  type="button"
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
                  className="inline-flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto sm:py-2.5 sm:mx-2 sm:rounded-xl"
                >
                  Login Again
                </button>
                <button
                  onClick={() => {
                    //dismis overlay (user stays on page. but still logged out)
                    setDismissed(true);
                    dispatch(clearSessionExpired());
                  }}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 sm:w-auto sm:py-3 sm:mx-2 sm:rounded-xl"
                >
                  Stay Here
                </button>
              </div>

              {/* Tiny Top Note */}
              <p className="mt-4 text-xs text-slate-400">
                Tip: Staying here keeps you on this page, but actions may be
                limited until you sign in again.
              </p>
            </div>
          </div>
        </div>
      );
    }
  }

  if (dismissed && !isAuthenticated) {
    return <Outlet />;
  }

  //Normal auth behaviour
  if (!isAuthenticated && !sessionExpired) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
