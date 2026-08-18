//External Imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//Internal Imports
import logo from "../../assets/emailLogo-nobg.png";
import { verifyUserRegistration } from "../../features/auth/authSlice";
import Input from "../../components/common/form/Input";
import FileInput from "../../components/common/form/FileInput";

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
      // navigate("/login");
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
    <div className="p-4 pt-10  flex-center flex-col items-center w-full">
      <div
        className="flex justify-center items-center w-full
      "
      >
        <form
          action=""
          onSubmit={formSubmitHandler}
          encType="multipart/form-data"
          className="flex flex-col justify-center bg-white 
          max-w-lg px-6 pb-10 rounded-md dropdown-menu-box-shadow
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
                Adventure starts here 🚀
              </p>
              <span className="text-sm">
                Make your app management easy and fun!
              </span>
            </div>
          </div>

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
            placeholder="************"
            error={getFieldError("password")}
          />
          <FileInput
            fieldlabel="Image"
            name="avatar"
            onChange={onHandleChange}
            imageFileName={imageFileName}
            error={getFieldError("avatar")}
          />
          {!isLoading &&
            isError &&
            error &&
            errorLength !== 0 &&
            commonError && (
              <p className="text-red-700 text-sm px-2 text-center py-4">
                {commonError?.msg}
              </p>
            )}
          <div className="flex py-5 ">
            <button
              type="submit"
              className="w-full h-10 px-2 
             font-medium text-sm rounded-sm
             dropdown-menu-box-shadow 
             bg-(--nav-link-color) text-white"
            >
              Sign up
            </button>
          </div>
          <div>
            <p className="text-sm text-center">
              Already have an account?{" "}
              <span
                onClick={goToLoginPage}
                className="text-(--nav-link-color) 
                cursor-pointer"
              >
                Sign in instade
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
