//External Imports
import React, { useState } from "react";
import { useSelector } from "react-redux";

//Internal Imports

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
  } = useSelector((state) => {
    state.authR;
  });
  const [userData, setUserData] = useState({ email: "", password: "" });

  const onChangeHander = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log("FORGOT PASS============");
    console.log(userData);
  };
  return (
    <div>
      <div>Reset Your Password</div>
      <form action="" onSubmit={formSubmitHandler}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            placeholder="Enter Your Email"
            value={userData?.email}
            onChange={onChangeHander}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            name="password"
            placeholder="Enter Your Password"
            value={userData?.password}
            onChange={onChangeHander}
          />
        </div>
      </form>
      <div>
        <button type="submit">Submit</button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
