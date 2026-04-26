//External Imports
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

//Internal Imports
import { logIn } from "../../features/auth/authSlice";
import LoadingPage from "../../components/loader/LoadingPage";
import Input from "../../components/common/Input";

const LoginPage = () => {
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

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const location = useLocation();
  const previousPath = location.state?.from?.pathname || "/";

  const goToRegistration = () => {
    navigate("/registration");
  };

  const goToResetPassPage = () => {
    navigate("/forgot-password");
  };

  const onChangeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const data = { email: userData?.email, password: userData?.password };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(logIn(data)).unwrap();
      console.log("========res========");
      console.log(res);
      if (isAuthenticated) {
        navigate(previousPath, { replace: true });
        return;
      }
    } catch (err) {
      console.log(err);
    }

    setUserData({ email: "", password: "" });
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

  // console.log(res?.msg);
  return (
    <div className="px-2.5 ">
      <div className="text-center pt-50 pb-10 text-2xl font-bold">LogIn</div>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <form onSubmit={handleSubmit}>
          <Input
            fieldlabel="email"
            type="email"
            name="email"
            value={userData?.email}
            onChange={onChangeHandler}
            placeholder="Enter Your Email"
            error={getFieldError("email")}
          />

          <Input
            fieldlabel="Password"
            type="password"
            name="password"
            value={userData?.password}
            onChange={onChangeHandler}
            placeholder="Enter Your Password"
            error={getFieldError("password")}
          />

          <div className="flex place-content-between pt-10 py-4 px-16 ">
            <button
              type="submit"
              className="mr-2 px-2 h-8 font-bold bg-blue-200 rounded-sm shadow-lg shadow-gray-400"
            >
              Login
            </button>
            <button
              type="button"
              onClick={goToRegistration}
              className="mr-2 px-2 h-8 font-bold bg-blue-200 rounded-sm shadow-lg shadow-gray-400"
            >
              Sign Up
            </button>
          </div>

          <div className="mx-auto flex justify-center">
            <button
              type="button"
              onClick={goToResetPassPage}
              className="mr-2 px-3 h-8 text-center font-medium rounded-sm shadow-lg filter:drop-shadow-black shadow-gray-400"
            >
              Forgot Password
            </button>
          </div>
          {isError && error && errorLength !== 0 && error?.common && (
            <p className="text-red-700 text-sm px-2 text-center py-4">
              {error?.common?.msg}
            </p>
          )}
          {/* {res && <p>{res}</p>} */}
        </form>
      )}
    </div>
  );
};

export default LoginPage;
