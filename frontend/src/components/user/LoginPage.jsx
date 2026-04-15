//External Imports
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logIn } from "../../features/auth/authSlice";
import LoadingPage from "../loader/LoadingPage";

//Internal Imports

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
      navigate(previousPath, { replace: true });
    } catch (err) {
      console.log(err);
    }

    setUserData({ email: "", password: "" });
  };
  const validationErr = error?.validationErr?.error || {};
  const errorLength = error ? Object.keys(error).length : 0;
  // console.log(res?.msg);
  return (
    <div>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            {" "}
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                value={userData?.email}
                onChange={onChangeHandler}
                placeholder="Enter your email"
              />
            </div>
            {isError && error && errorLength !== 0 && validationErr?.email && (
              <p>{validationErr?.email?.msg}</p>
            )}
          </div>

          <div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                value={userData?.password}
                onChange={onChangeHandler}
                placeholder="Enter your password"
              />
            </div>
            {isError &&
              error &&
              errorLength !== 0 &&
              validationErr?.password && <p>{validationErr?.password?.msg}</p>}
          </div>
          <div>
            <button type="submit">Login</button>
            <button type="button" onClick={goToRegistration}>
              Sign Up
            </button>
            <button type="button" onClick={goToResetPassPage}>
              Forgot Password
            </button>
          </div>
          {isError && error && errorLength !== 0 && error?.common && (
            <p>{error?.common?.msg}</p>
          )}
          {/* {res && <p>{res}</p>} */}
        </form>
      )}
    </div>
  );
};

export default LoginPage;
