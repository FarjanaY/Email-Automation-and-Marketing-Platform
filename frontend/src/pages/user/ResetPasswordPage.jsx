//External Imports
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

//Internal Imports
import { resetPassword } from "../../features/auth/authSlice";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

const ResetPasswordPage = () => {
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

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(resetPassword({ token, ...userData }));
      console.log("=============RESET PASSWORD================");
      console.log(userData);
    } catch (err) {
      console.log(err);
    }
  };

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
    <div className="px-2.5">
      <div className="text-center pt-50 pb-10 text-2xl font-bold">
        Reset Password
      </div>
      <form action="" onSubmit={formSubmitHandler}>
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
    </div>
  );
};

export default ResetPasswordPage;
