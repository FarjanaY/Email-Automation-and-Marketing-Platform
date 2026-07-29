//External Imports
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//Internal Imports
import Input from "../../components/common/Input";
import { forgetPassword } from "../../features/auth/authSlice";
import Button from "../../components/common/Button";
import logo from "../../assets/emailLogo-nobg.png";

const ForgotPasswordPage = () => {
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
  const [userData, setUserData] = useState({ email: "" });
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setUserData({ email: e.target.value });
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(forgetPassword({ email: userData?.email })).unwrap();
      console.log("FORGOT PASS============");
      console.log(userData);
    } catch (err) {
      console.log(err);
    }
  };

  const goToLoginPage = () => {
    navigate("/login");
  };
  //Error handling
  const errorLength = error ? Object.keys(error).length : 0;
  const validationErr = error?.validationErr?.error || {};
  const commonError = isError && error && errorLength !== 0 && error?.common;

  const getFieldError = () => {
    return isError && error && errorLength !== 0 && validationErr?.email
      ? validationErr?.email?.msg
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
              Forgot Password? 🔒
            </p>
            <span className="text-sm">
              Enter your email and we'll send you instructions to reset your
              password
            </span>
          </div>
        </div>

        <Input
          fieldlabel="email"
          type="email"
          name="email"
          value={userData?.email}
          onChange={onChangeHandler}
          placeholder="Enter Your Email"
          error={getFieldError("email")}
        />

        {shouldShowError && (
          <p className="text-red-700 text-sm px-2 text-center py-4">
            {error?.common?.msg}
          </p>
        )}
        <div className="flex py-5 ">
          <Button type="submit" disabled={isLoading}>
            Send Reset Link
          </Button>
        </div>
        <span
          onClick={goToLoginPage}
          className="text-sm text-center py-1 text-(--nav-link-color) cursor-pointer"
        >
          Back to login
        </span>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
