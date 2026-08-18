//External Imports
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

//Internal Imports
import { resetPassword } from "../../features/auth/authSlice";
import Input from "../../components/common/form/Input";
import Button from "../../components/common/form/Button";
import logo from "../../assets/emailLogo-nobg.png";

const ResetPasswordPage = () => {
  const [isResetSuccess, setIsResetSuccess] = useState(false);
  const [countDown, setCountDown] = useState(5);

  //Redux data from Auth Reducer
  const {
    user,
    isAuthenticated,
    isLoading,
    isError,
    error,
    forgetPass,
    resetPass,
  } = useSelector((state) => state.authR);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //token url = "/activate?token=abc123"
  const [searchParams] = useSearchParams();
  console.log("searchparams =", searchParams);
  const token = searchParams.get("tokenData");
  console.log(token);

  const [userData, setUserData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const onChangeHandler = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const goToLoginPage = () => {
    navigate("/login");
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(resetPassword({ token, ...userData })).unwrap();
      setIsResetSuccess(true);
      console.log("=============RESET PASSWORD================");
      console.log(userData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!isResetSuccess) return;
    const timer = setInterval(() => {
      setCountDown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [isResetSuccess]);

  useEffect(() => {
    if (!isResetSuccess || countDown !== 0) return;
    navigate("/login", { replace: true });
  }, [isResetSuccess, countDown, navigate]);

  //Error handling
  const errorLength = error ? Object.keys(error).length : 0;
  const validationErr = error?.validationErr?.error || {};
  const commonError = isError && error && errorLength !== 0 && error?.common;

  const getFieldError = (field) => {
    return isError && error && errorLength !== 0 && validationErr?.[field]
      ? validationErr?.[field]?.msg
      : "";
  };
  const msg = error?.common?.msg;
  const shouldShowError =
    isError &&
    error &&
    errorLength !== 0 &&
    error?.common &&
    msg &&
    msg !== "Please login." &&
    msg !== "Refresh token is expired. Please login again.";

  return (
    <div
      className="min-h-screen w-full p-4 
     grid place-items-center
       overflow-y-auto"
    >
      {isResetSuccess ? (
        <div className="flex flex-col items-center text-center bg-white max-w-md w-full mx-auto px-6 py-10 rounded-md dropdown-menu-box-shadow">
          <div className="bg-green-100 mb-5 h-16 w-16 flex justify-center items-center rounded-xl">
            <span className="text-2xl text-green-600">&#10003;</span>
          </div>
          <h1 className="text-xl font-bold text-(--card-heading-color)">
            Password Updated Successfully
          </h1>
          <p className="mt-3 text-sm text-(--text-color)">
            Your password has been reset. You can now log in with your new
            password.
          </p>
          <p className="mt-2 text-xs text-(--light-text)">
            Redirecting to login in {countDown} second
            {countDown !== 1 ? "s" : ""}
          </p>
          <button
            type="button"
            onClick={goToLoginPage}
            className="mt-6 px-4 py-2 rounded-md cursor-pointer gn-button-shadow text-white font-bold"
          >
            Login Now
          </button>
        </div>
      ) : (
        <form
          action=""
          onSubmit={formSubmitHandler}
          encType="multipart/form-data"
          className="flex flex-col justify-center bg-white 
          max-w-md px-6 pb-10 rounded-md dropdown-menu-box-shadow
          w-full mx-auto"
        >
          <div>
            <div className=" flex-center flex-col w-full px-2 pt-6 pb-8">
              <img
                src={logo}
                alt="Logo"
                className="mr-1 -mt-1.5 size-10 rounded-full 
                  ring-0 ring-(--nav-link-color) "
              />
              <div
                style={{ fontSize: "var(--menu-heading)" }}
                className="text-lg! lg:text-2xl! w-fit 
                font-bold text-(--card-heading-color)
                 flex flex-center  gap-x-1 "
              >
                <span>Email Automation & </span>
                <span>Platform</span>
              </div>
            </div>
            <div className="pb-3">
              <p
                className="text-md py-1 lg:py-0 lg:text-xl 
              font-bold text-(--card-heading-color)"
              >
                Reset Password 🔒
              </p>
              <span className="text-sm">for ${userData?.email}</span>
            </div>
          </div>

          <Input
            fieldlabel="Email"
            type="email"
            name="email"
            value={userData?.email}
            onChange={onChangeHandler}
            placeholder="Enter Your Email"
            error={getFieldError("email")}
          />
          <Input
            fieldlabel="New Password"
            type="password"
            name="newPassword"
            value={userData?.newPassword}
            onChange={onChangeHandler}
            placeholder="Enter Your New Password"
            error={getFieldError("newPassword")}
          />

          <Input
            fieldlabel="Confirm Password"
            type="password"
            name="confirmPassword"
            value={userData?.confirmPassword}
            onChange={onChangeHandler}
            placeholder="Enter Your Confirm Password"
            error={getFieldError("confirmPassword")}
          />

          {shouldShowError && (
            <p className="text-red-700 text-sm px-2 text-center py-4">
              {error?.common?.msg}
            </p>
          )}

          <div className="flex py-5 ">
            <Button type="submit" disabled={isLoading}>
              Set new password
            </Button>
          </div>
          <span
            onClick={goToLoginPage}
            className="text-sm text-center py-1 text-(--nav-link-color) cursor-pointer"
          >
            Back to login
          </span>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordPage;
{
  /* <div className="text-center pt-50 pb-10 text-2xl font-bold">
        Reset Password
      </div>
      <form action="" onSubmit={formSubmitHandler}>
        <div className="flex place-content-between pt-10 py-4 px-16">
          <Button type="submit" className="bg-blue-200">
            Submit
          </Button>
          <Button type="button" className="bg-blue-200">
            LogIn
          </Button>
        </div>

        {shouldShowError && (
          <p className="text-red-700 text-sm px-2 text-center py-4">
            {error?.common?.msg}
          </p>
        )}
      </form>
    </div> */
}
