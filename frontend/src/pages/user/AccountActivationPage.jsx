//External Imports
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activateUserAccount } from "../../features/auth/authSlice";
import { useNavigate, useSearchParams } from "react-router-dom";

//Internal Imports

const AccountActivationPage = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    isError,
    error,
    forgetPass,
    resetPass,
  } = useSelector((state) => state.authR);

  const [countDown, setCountDown] = useState(5);
  const dispatch = useDispatch();

  //token url = "/activate?token=abc123"
  const [searchParams] = useSearchParams();
  console.log("searchparams =", searchParams);
  const token = searchParams.get("token");
  console.log(token);

  const navigate = useNavigate();
  const didActivateRef = useRef(false);

  const errorLength = error ? Object.keys(error).length : 0;
  const validationError = error?.validationErr?.error || {};
  //const commonError = error?.common?.error || {};
  const commonError = isError && error && errorLength !== 0 && error?.common;
  const commonErrMsg =
    commonError?.msg || "Activation failed. Please try again later.";

  const isSuccess = useMemo(() => {
    return !isLoading && !isError && !!user;
  }, [isLoading, isError, user]);

  const [phase, setPhase] = useState(() => (token ? "loading" : "idle"));
  useEffect(() => {
    if (!token) return;
    if (didActivateRef.current) return;
    didActivateRef.current = true;

    setPhase("loading");
    dispatch(activateUserAccount(token))
      .unwrap()
      .then(() => setPhase("success"))
      .catch(() => setPhase("error"));
  }, [token, dispatch]);

  useEffect(() => {
    if (phase !== "success") return;

    const timer = setInterval(() => {
      setCountDown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "success") return;
    if (countDown !== 0) return;

    navigate("/login", { replace: true });
  }, [phase, countDown, navigate]);

  const goToLoginPage = () => {
    navigate("/login");
  };
  const goToRegistrationPage = () => {
    navigate("/registration");
  };

  const showActivationError = token && phase === "error";
  const showActivationSuccess = token && phase === "success";
  const showActivationLoading = token && phase === "loading";

  return (
    <div className="min-h-screen bg-slate-100 px-4 flex items-center justify-center">
      <div className="bg-white w-full max-w-xl flex flex-col items-center justify-center rounded-2xl shadow-xl border border-slate-200 p-8 text-center">
        <div className="bg-blue-100 max-auto mb-5 h-16 w-16 flex  justify-center items-center rounded-xl">
          {showActivationError ? (
            <span className="text-4xl text-red-600">!</span>
          ) : showActivationSuccess ? (
            <span className="text-2xl text-green-600">&#10003;</span>
          ) : (
            <div className="h-8 w-8 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
          )}
        </div>

        {!token ? (
          <>
            <h1 className="text-lg text-slate-800 font-semibold sm:text-xl sm:font-bold md:text-2xl">
              Invalid Activation Link
            </h1>
            <p className="mt-3 text-sm text-slate-600 font-semibold  md:text-md ">
              The activation token is missing. Please register again and use the
              latest email link.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={goToLoginPage}
                className="px-4 py-2 rounded-lg bg-blue-950 text-white font-semibold shadow-md hover:bg-blue-900 "
              >
                LogIn
              </button>
              <button
                type="button"
                onClick={goToRegistrationPage}
                className="px-4 py-2 rounded-lg bg-slate-200 text-black font-bold shadow-md hover:bg-slate-300 "
              >
                Sign UP
              </button>
            </div>
          </>
        ) : phase === "loading" ? (
          <>
            <h1 className="text-lg text-slate-800 font-semibold sm:text-xl sm:font-bold md:text-2xl">
              Activating your account
            </h1>
            <p className="mt-3 text-sm text-slate-600 font-semibold  md:text-md ">
              Please wait while we verify your email and activate your account
            </p>
            <p className="mt-2 text-xs text-slate-400 md:text-sm ">
              You will be redirected to login after activation is complete.
            </p>
          </>
        ) : phase === "success" ? (
          <>
            <h1 className="text-lg text-green-900 font-semibold sm:text-xl sm:font-bold md:text-2xl">
              {" "}
              Account Activated Successfully
            </h1>
            <p className="mt-3 text-sm text-slate-600 font-semibold  md:text-md ">
              Your account is now active. You can login with your email and
              password.
            </p>
            <p className="mt-2 text-xs text-slate-400 md:text-sm ">
              Redirecting to login in {countDown} second{" "}
              {countDown !== 1 ? "s" : ""}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={goToLoginPage}
                className="px-4 py-2 rounded-lg bg-blue-950 text-white font-semibold shadow-md hover:bg-blue-900"
              >
                LogIn
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-lg text-red-800 font-semibold sm:text-xl sm:font-bold md:text-2xl">
              {" "}
              Activation Failed
            </h1>
            <p className="mt-3 text-sm text-slate-600 font-semibold  md:text-md ">
              {commonErrMsg}
            </p>
            <p className="mt-2 text-xs text-slate-400 md:text-sm ">
              This can happen if the link is expired or already used.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={goToRegistrationPage}
                className="px-4 py-2 rounded-lg bg-slate-200 text-black font-bold shadow-md hover:bg-slate-300 "
              >
                Register Again
              </button>
              <button
                type="button"
                onClick={goToLoginPage}
                className="px-4 py-2 rounded-lg bg-blue-950 text-white font-semibold shadow-md hover:bg-blue-900 "
              >
                LogIn
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountActivationPage;
