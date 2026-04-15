//External Imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { verifyUserRegistration } from "../../features/auth/authSlice";

//Internal Imports

const RegistrationPage = () => {
  //Redux data from Auth Reducer
  const { user, isAuthenticated, isLoading, isError, error } = useSelector(
    (state) => state.authR,
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    password: "",
    avatar: "",
  });

  //Login button onClick Handler
  const goToLoginPage = () => {
    navigate("/login");
  };

  //Form input onChange Handler
  const onHandleChange = (e) => {
    if (e.target.name === "avatar") {
      setUserData({
        ...userData,
        avatar: e.target.files[0],
      });
    } else {
      setUserData({
        ...userData,
        [e.target.name]: e.target?.value,
      });
    }
  };

  //Form submission handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log("userData");
    console.log(userData);
    dispatch(verifyUserRegistration(userData));
  };

  const errorLength = error ? Object.keys(error).length : 0;
  const validationError = error?.validationErr?.error || {};
  const commonError = error?.common?.error || {};
  const userNameSuggestion = error?.usernameSuggestions || [];


  return (
    <div className="px-2.5">
      <div className="text-center py-10 text-2xl font-bold">Registration</div>
      <form
        action=""
        onSubmit={formSubmitHandler}
        className="flex flex-col justify-between"
      >
        <div>
          <div className="flex place-content-between py-2 px-2 ">
            <label htmlFor="name" className=" font-bold w-[30%]">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={userData?.name}
              onChange={onHandleChange}
              placeholder="Enter Your Name"
              className="px-2 shadow mx-2 rounded-md w-[60%] "
            />
          </div>
        </div>
        <div className="flex place-content-between py-2 px-2">
          <label htmlFor="username" className=" font-bold w-[30%]">
            Username:
          </label>
          <input
            type="text"
            name="username"
            value={userData?.username}
            onChange={onHandleChange}
            placeholder="Enter Your Username"
            className="px-2 shadow mx-2 w-[60%] rounded-md"
          />
        </div>
        <div className="flex place-content-between py-2 px-2">
          <label htmlFor="email" className=" font-bold w-[30%]">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={userData?.email}
            onChange={onHandleChange}
            placeholder="Enter Your Email"
            className="px-2 shadow mx-2 rounded-md w-[60%] "
          />
        </div>
        <div className="flex place-content-between py-2 px-2">
          <label htmlFor="mobile" className=" font-bold w-[30%]">
            Mobile:
          </label>
          <input
            type="text"
            name="mobile"
            value={userData?.mobile}
            onChange={onHandleChange}
            placeholder="Enter Your Mobile Number"
            className="px-2 shadow mx-2 rounded-md w-[60%] "
          />
        </div>
        <div className="flex place-content-between py-2 px-2">
          <label htmlFor="password" className="font-bold w-[30%]">
            Password :
          </label>
          <input
            type="password"
            name="password"
            value={userData?.password}
            onChange={onHandleChange}
            placeholder="Enter Your Password"
            className="px-2 shadow mx-2 rounded-md w-[60%] "
          />
        </div>
        <div className="flex place-content-between py-2 px-2 ">
          <label htmlFor="avatar" className="font-bold w-[30%]">
            Image :
          </label>
          <label className="w-[60%] h-8 px-2 shadow mx-2 rounded-md">
            <input
              type="file"
              name="avatar"
              onChange={onHandleChange}
              placeholder="Enter Your Image"
              className="hidden"
            />
          </label>
        </div>
        <div className="flex place-content-between py-2 px-2">
          <button type="submit" className="mr-2  px-2 font-bold ">
            Registration
          </button>
          <button
            type="button"
            onClick={goToLoginPage}
            className="mr-2 px-2 font-bold"
          >
            Login
          </button>
        </div>
           { !isLoading && !isError && !error && errorLength === 0 && (<p></p>)
    }
      </form>
    </div>
  );
};

export default RegistrationPage;
