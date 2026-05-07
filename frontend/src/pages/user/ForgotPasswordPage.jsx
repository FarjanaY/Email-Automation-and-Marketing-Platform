//External Imports
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//Internal Imports
import Input from "../../components/common/Input";
import { forgetPassword } from "../../features/auth/authSlice";
import Button from "../../components/common/Button";

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
          error={getFieldError()}
        />

        <div className="flex place-content-between pt-10 py-4 px-16">
          <Button type="submit" className="bg-blue-200">
            Submit
          </Button>
          <Button type="button" onClick={goToLoginPage} className="bg-blue-200">
            LogIn
          </Button>
        </div>

        {commonError && (
          <p className="text-red-700 text-sm px-2 text-center py-4">
            {error?.common?.msg}
          </p>
        )}
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
