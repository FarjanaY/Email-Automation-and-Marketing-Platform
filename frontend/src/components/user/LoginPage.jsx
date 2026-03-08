//External Imports
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(data));
    setUserData({ email: "", password: "" });
  };
  const validationErr = error?.validationErr?.error;

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
            {isError &&
              error &&
              Object.keys(error).length !== 0 &&
              validationErr?.email && <p>{validationErr?.email?.msg}</p>}
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
              Object.keys(error).length !== 0 &&
              validationErr?.password && <p>{validationErr?.password?.msg}</p>}
          </div>
          <div>
            <button type="submit">Login</button>
            <button type="submit" onClick={goToRegistration}>
              Sign Up
            </button>
            <button type="submit" onClick={goToResetPassPage}>
              Forgot Password
            </button>
          </div>
          {isError &&
            error &&
            Object.keys(error).length !== 0 &&
            error?.common && <p>{error?.common?.msg}</p>}
        </form>
      )}
    </div>
  );
};

export default LoginPage;
