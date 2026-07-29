//External Imports
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

//Internal Imports
import { logIn } from "../../features/auth/authSlice";
import LoadingPage from "../../components/loader/LoadingPage";
import Input from "../../components/common/Input";

import Button from "../../components/common/Button";
import logo from "../../assets/emailLogo-nobg.png";

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

  const msg = error?.common?.msg;
  const shouldShowError =
    isError &&
    error &&
    errorLength !== 0 &&
    error?.common &&
    msg &&
    msg !== "Please login." &&
    msg !== "Refresh token is expired. Please login again.";
  // console.log(res?.msg);
  return (
    //<div className="">
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div
          className="min-h-screen w-full p-4 
     grid place-items-center
       overflow-y-auto"
        >
          <form
            action=""
            onSubmit={handleSubmit}
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
                  Welcome to Email Automation & Platform 👋
                </p>
                <span className="text-sm">
                  Please sign-in to your account and start the adventure
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

            <Input
              fieldlabel="Password"
              type="password"
              name="password"
              value={userData?.password}
              onChange={onChangeHandler}
              placeholder="************"
              error={getFieldError("password")}
            />

            {shouldShowError && (
              <p className="text-red-700 text-sm px-2 text-center py-4">
                {error?.common?.msg}
              </p>
            )}
            <div className="flex py-5 ">
              <Button type="submit" disabled={isLoading}>
                Sign up
              </Button>
            </div>
            <div className="">
              <p className="text-sm text-center">
                New on our platform?{" "}
                <span
                  onClick={goToRegistration}
                  className="text-(--nav-link-color) 
                cursor-pointer"
                >
                  Create an account
                </span>
              </p>
            </div>
            <span
              onClick={goToResetPassPage}
              className="text-sm text-center py-2 text-(--nav-link-color) cursor-pointer"
            >
              Forgot Password
            </span>
          </form>
        </div>
      )}
    </>

    //   {/* <div className="text-center pt-50 pb-10 text-2xl font-bold">LogIn</div>
    //   {isLoading ? (
    //     <LoadingPage />
    //   ) : (
    //     <form onSubmit={handleSubmit}>
    //       <Input
    //         fieldlabel="email"
    //         type="email"
    //         name="email"
    //         value={userData?.email}
    //         onChange={onChangeHandler}
    //         placeholder="Enter Your Email"
    //         error={getFieldError("email")}
    //       />

    //       <Input
    //         fieldlabel="Password"
    //         type="password"
    //         name="password"
    //         value={userData?.password}
    //         onChange={onChangeHandler}
    //         placeholder="Enter Your Password"
    //         error={getFieldError("password")}
    //       />

    //       <div className="flex place-content-between pt-10 py-4 px-16 ">
    //         <Button type="submit" className=" bg-blue-200 ">
    //           Login
    //         </Button>
    //         <button
    //           type="button"
    //           onClick={goToRegistration}
    //           className="mr-2 px-2 h-8 font-bold bg-blue-200 rounded-sm shadow-lg shadow-gray-400"
    //         >
    //           Sign Up
    //         </button>
    //       </div>

    //       <div className="mx-auto flex justify-center">
    //         <button
    //           type="button"
    //           onClick={goToResetPassPage}
    //           className="mr-2 px-3 h-8 text-center font-medium rounded-sm shadow-lg filter:drop-shadow-black shadow-gray-400"
    //         >
    //           Forgot Password
    //         </button>
    //       </div>

    //       {shouldShowError && (
    //         <p className="text-red-700 text-sm px-2 text-center py-4">
    //           {error?.common?.msg}
    //         </p>
    //       )}

    //       {/* {res && <p>{res}</p>} */}
    //     </form>
    //   )}
    // </div> */}
  );
};

export default LoginPage;
