//External Imports
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

//Internal Imports
import { resetPassword } from "../../features/auth/authSlice";

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
  } = useSelector((state) => {
    state.authR;
  });
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("tokenData");

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

  useEffect(() => {
    dispatch(resetPassword({ token, newPassword: userData?.newPassword }));
  }, [token, userData?.newPassword, dispatch]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log("=============RESET PASSWORD================");
    console.log(userData);
  };

  return (
    <div>
      <div></div>
      <form action="" onSubmit={formSubmitHandler}>
        <div>
          <label htmlFor="email"></label>
          <input
            type="email"
            name="email"
            value={userData?.email}
            onChange={onChangeHandler}
            placeholder="Enter Your Email"
            className=""
          />
        </div>
        <div>
          <label htmlFor="newPassword"></label>
          <input
            type="password"
            name="newPassword"
            value={userData?.newPassword}
            onChange={onChangeHandler}
            placeholder="Enter Your New Password"
            className=""
          />
        </div>
        <div>
          <label htmlFor="confirmPassword"></label>
          <input
            type="password"
            name="confirmPassword"
            value={userData?.confirmPassword}
            onChange={onChangeHandler}
            placeholder="Enter Your Confirm Password"
            className=""
          />
        </div>
        <div>
          <button></button>
          <button></button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
