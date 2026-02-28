//External Imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//Internal Imports

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
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
    setUser({
      ...user,
      [e.target.name]: e.target?.value,
    });
  };

  //Form submission handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log("user");
    console.log(user);
  };

  return (
    <div className="px-2.5">
      <div className="text-center py-10 text-2xl font-bold">Registration</div>
      <form
        action=""
        onSubmit={formSubmitHandler}
        className="flex flex-col justify-between"
      >
        <div className="flex place-content-between py-2 px-2 ">
          <label htmlFor="name" className=" font-bold w-[30%]">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={user?.name}
            onChange={onHandleChange}
            placeholder="Enter Your Name"
            className="px-2 shadow mx-2 rounded-md w-[60%] "
          />
        </div>
        <div className="flex place-content-between py-2 px-2">
          <label htmlFor="username" className=" font-bold w-[30%]">
            Username:
          </label>
          <input
            type="text"
            name="username"
            value={user?.username}
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
            value={user?.email}
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
            value={user?.mobile}
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
            value={user?.password}
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
              value={user?.avatar}
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
            type="submit"
            onClick={goToLoginPage}
            className="mr-2 px-2 font-bold"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
