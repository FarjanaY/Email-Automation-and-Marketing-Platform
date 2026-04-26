//External Imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { verifyUserRegistration } from "../../features/auth/authSlice";
import Input from "../../components/common/Input";

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
    avatar: null,
  });

  const [imageFileName, setImageFileName] = useState("");

  //Login button onClick Handler
  const goToLoginPage = () => {
    navigate("/login");
  };

  //Form input onChange Handler
  const onHandleChange = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target?.files[0];
      setUserData({
        ...userData,
        avatar: file,
      });
      setImageFileName(file?.name || "");
    } else {
      setUserData({
        ...userData,
        [e.target.name]: e.target?.value,
      });
    }
  };

  //Form submission handler
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    console.log("userData");
    console.log(userData);

    const formData = new FormData();
    Object.keys(userData).forEach((key) => {
      formData.append(key, userData[key]);
    });
    try {
      await dispatch(verifyUserRegistration(formData)).unwrap();
      //Optional Navigate
      navigate("/login");
      
    } catch (err) {
      console.log(err);
    }
  };

  const errorLength = error ? Object.keys(error).length : 0;
  const validationError = error?.validationErr?.error || {};
  //const commonError = error?.common?.error || {};
  const commonError =
    isError && error && errorLength !== 0 && error?.common?.error;
  const userNameSuggestion = error?.validationErr?.usernameSuggestions || [];
  const newUsername = userNameSuggestion.join(", ");
  const getFieldError = (field) => {
    return isError && error && errorLength !== 0 && validationError?.[field]
      ? validationError?.[field]?.msg
      : "";
  };

  return (
    <div className="px-2.5">
      <div className="text-center py-10 text-2xl font-bold">Registration</div>
      <form
        action=""
        onSubmit={formSubmitHandler}
        encType="multipart/form-data"
        className="flex flex-col justify-between"
      >
        <Input
          fieldlabel="Name"
          type="text"
          name="name"
          value={userData?.name}
          onChange={onHandleChange}
          placeholder="Enter Your Name"
          error={getFieldError("name")}
        />

        <Input
          fieldlabel="Username"
          type="text"
          name="username"
          value={userData?.username}
          onChange={onHandleChange}
          placeholder="Enter Your Username"
          error={getFieldError("username")}
          extraError={
            userNameSuggestion?.length > 0 && (
              <> Available Usernames: {newUsername}</>
            )
          }
        />

        <Input
          fieldlabel="email"
          type="email"
          name="email"
          value={userData?.email}
          onChange={onHandleChange}
          placeholder="Enter Your Email"
          error={getFieldError("email")}
        />

        <Input
          fieldlabel="Mobile"
          type="text"
          name="mobile"
          value={userData?.mobile}
          onChange={onHandleChange}
          placeholder="Enter Your Mobile Number"
          error={getFieldError("mobile")}
        />

        <Input
          fieldlabel="Password"
          type="password"
          name="password"
          value={userData?.password}
          onChange={onHandleChange}
          placeholder="Enter Your Password"
          error={getFieldError("password")}
        />

        <Input
          fieldlabel="Image"
          name="avatar"
          onChange={onHandleChange}
          imageFileName={imageFileName}
          error={getFieldError("avatar")}
        />

        <div className="flex place-content-between py-4 px-2">
          <button
            type="submit"
            className="mr-2  h-8 px-2 font-bold bg-blue-200 rounded-sm shadow-lg shadow-gray-400"
          >
            Registration
          </button>
          <button
            type="button"
            onClick={goToLoginPage}
            className="mr-2  h-8 px-2 font-bold bg-blue-200 rounded-sm shadow-lg shadow-gray-400"
          >
            Login
          </button>
        </div>
        {!isLoading && isError && error && errorLength !== 0 && commonError && (
          <p className="text-red-700 text-sm px-2 text-center py-4">
            {commonError?.msg}
          </p>
        )}
      </form>
    </div>
  );
};

export default RegistrationPage;
