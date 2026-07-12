import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  PenTool,
  MapPin,
  BookCheck,
  User,
  Check,
  Star,
  BookText,
  Contact,
  Mail,
  MessagesSquare,
  Flag,
} from "lucide-react";

//Internal Imports
import { updateUser } from "../../features/users/userSlice";
import { formatCreatedAtDate } from "../../utils/helper/dateFormatter";
import coverPhoto from "../../../public/profilePage/coverPhoto.jpg";
import userProfile from "../../../public/profilePage/userProfile.jpg";
import { useEffect } from "react";

const UpdateProfilePage = () => {
  //Redux data from  Reducer
  const { user, isSuccess, isLoading, isError, error } = useSelector(
    (state) => state.userR,
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

  //const [imageFileName, setImageFileName] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        mobile: user.mobile || "",
        password: "",
        avatar: null,
      });
    }
  }, [user]);
  //Login button onClick Handler
  const goToProfilePage = () => {
    navigate("/profile");
  };

  //Form input onChange Handler
  const onHandleChange = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target?.files[0];
      setUserData({
        ...userData,
        avatar: file,
      });
      //setImageFileName(file?.name || "");
      if (file) {
        setPreview(URL.createObjectURL(file));
      }
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
      if (key === "avatar" && !userData?.avatar) return; //Skip null
      formData.append(key, userData[key]);
    });
    try {
      await dispatch(updateUser({ id: user?._id, data: formData })).unwrap();
      //Optional Navigate
      navigate("/profile");
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

  const baseURL = import.meta.env.VITE_CLIENT_URL;
  const imagePath = `${baseURL}/uploads/avatar/${user?.avatar}`;

  const iconSize = {
    size: 15,
    strokeWidth: 2.2,
  };
  return (
    <div className="">
      <form onSubmit={formSubmitHandler} className="m-2 p-3 lg:p-3  ">
        <div
          className="flex flex-col gap-y-3 
          lg:grid lg:grid-cols-2 lg:gap-x-5"
        >
          <div
            className="flex-col flex  items-center rounded-md 
      bg-white dropdown-menu-box-shadow "
          >
            <div className="relative flex justify-center items-center ">
              <label
                htmlFor="coverInput"
                className="cursor-pointer flex justify-center"
              >
                <img
                  id="coverInput"
                  src={coverPhoto}
                  alt="Cover Photo"
                  className="aspect-2/1 h-auto w-auto object-cover rounded-t-md"
                />
              </label>
              <div className="absolute  items-center bottom-[-25%] flex-center">
                <label
                  htmlFor="avatarInput"
                  className="cursor-pointer flex-center "
                >
                  <img
                    src={
                      preview ? preview : user?.avatar ? imagePath : userProfile
                    }
                    alt="Profile Picture"
                    className="h-[30%] w-[30%] bg-white aspect-square object-cover
                border-4 border-white rounded-md"
                  />
                </label>
                <input
                  id="avatarInput"
                  type="file"
                  name="avatar"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={onHandleChange}
                  className="hidden"
                />
              </div>
            </div>

            <span className="pt-[15%] font-bold pb-3 text-xl text-(--card-heading-color) ">
              {userData?.name}
            </span>
            <div className="flex-center  px-2 gap-x-2 flex-wrap pb-10">
              {userData?.profession && (
                <div className="flex gap-1 py-1 ">
                  <PenTool
                    size={17}
                    strokeWidth={2.5}
                    className="rotate-x-180 mt-0.5"
                  />
                  <span className="text-md font-semibold">
                    {userData?.profession || ""}
                  </span>
                </div>
              )}

              <div className="flex  gap-1 py-1 ">
                <MapPin size={17} strokeWidth={2.5} className="mt-0.5" />
                <span className="text-md font-semibold">
                  {userData?.address || "Dhaka, Bangladesh"}
                </span>
              </div>
              <div className="flex gap-1 py-1 ">
                <BookCheck size={17} strokeWidth={2.5} className="mt-0.5" />
                <span className="text-md font-semibold">
                  Joined {formatCreatedAtDate(userData?.createdAt)}
                </span>
              </div>
            </div>
          </div>
          <div
            className="flex-col py-5 rounded-md bg-white
       dropdown-menu-box-shadow w-full  "
          >
            {/* <div
              className="flex-center my-3 bg-(--body-bg) 
        text-(--link-color) font-bold text-sm  
        border-y border-(--text-color)/5 lg:my-5 "
            >
              Let's Get In Touch
            </div> */}
            <div className="w-full  flex flex-col flex-1">
              <div
                className="2xl:items-center 
              2xl:justify-center "
              >
                {/* ===========About Section========= */}
                <div
                  className="p-5 shrink-0 whitespace-nowrap
                pl-[5%] flex flex-col gap-y-4 text-sm 
                lg:text-[16px] lg:gap-y-6 2xl:flex-1 "
                >
                  <p
                    className="uppercase text-md lg:text-center
                    lg:font-bold "
                  >
                    About
                  </p>
                  <div className="flex gap-x-1.5 items-center">
                    <User {...iconSize} className="mb-0.5 lg:mt-1 lg:" />
                    <div className="flex w-full items-center">
                      <p className="font-semibold sm:w-[25%] pr-2">
                        Full Name:
                      </p>
                      <input
                        type="text"
                        name="name"
                        value={userData?.name}
                        onChange={onHandleChange}
                        className=" border rounded-sm h-9 input-box-focus 
                        bg-white border-gray-300 outline-none px-3
                         w-full max-w-sm"
                      />
                    </div>
                  </div>
                  <div className="flex gap-x-1.5  items-center">
                    <Check {...iconSize} className="mb-0.5 lg:mt-1 " />
                    <div className="flex w-full  items-center">
                      <p className="font-semibold sm:w-[25%] pr-2">Status:</p>
                      <input
                        type="text"
                        name="status"
                        value={userData?.status || ""}
                        onChange={onHandleChange}
                        className="w-full max-w-sm border rounded-sm h-9 px-3 
                        bg-white border-gray-300 outline-none
                         input-box-focus"
                      />
                    </div>
                  </div>
                  {/* <div className="flex gap-x-1.5">
                    <Star {...iconSize} className="mt-0.5 lg:mt-1" />
                    <div className="flex w-full">
                      <p className="font-semibold w-[25%]">Role:</p>
                      <span className="capitalize"> {user?.role}</span>
                    </div>
                  </div> */}
                  <div className="flex gap-x-1.5  items-center">
                    <Flag {...iconSize} className="mb-0.5 lg:mt-1" />
                    <div className="flex w-full  items-center">
                      <p className="font-semibold sm:w-[25%] pr-2">Country:</p>
                      <input
                        type="text"
                        name="country"
                        value={userData?.country || "Dhaka, Bangladesh"}
                        onChange={onHandleChange}
                        className="w-full max-w-sm border rounded-sm h-9 px-3 
                        bg-white border-gray-300 outline-none
                         input-box-focus"
                      />
                    </div>
                  </div>
                  <div className="flex gap-x-1.5  items-center">
                    <BookText {...iconSize} className="mb-0.5 lg:mt-1" />
                    <div className="flex w-full  items-center">
                      <p className="font-semibold sm:w-[25%] pr-2">
                        Languages:
                      </p>
                      <input
                        type="text"
                        name="language"
                        value={userData?.language || "English"}
                        onChange={onHandleChange}
                        className="w-full max-w-sm border rounded-sm h-9 px-3 
                        bg-white border-gray-300 outline-none
                         input-box-focus"
                      />
                    </div>
                  </div>
                </div>
                {/* ===========Contacts Section========== */}
                <div
                  className="p-5 pl-[5%] flex flex-col 
                shrink whitespace-nowrap gap-y-4  
                text-sm lg:text-[16px] lg:gap-y-6 
                xl:h-full xl:flex-1"
                >
                  <p
                    className="uppercase text-md lg:text-center 
                  lg:font-bold "
                  >
                    Contacts
                  </p>
                  <div className="flex gap-x-1.5  items-center">
                    <Contact {...iconSize} className="mb-px lg:mt-0.75" />
                    <div className="flex w-full  items-center">
                      <p className="font-semibold sm:w-[25%] pr-2">Contact:</p>
                      <input
                        type="text"
                        name="mobile"
                        value={userData?.mobile}
                        onChange={onHandleChange}
                        className="w-full max-w-sm border rounded-sm h-9 px-3 
                        bg-white border-gray-300 outline-none
                         input-box-focus"
                      />
                    </div>
                  </div>
                  {getFieldError("mobile") && (
                    <p className="text-red-700 text-sm">
                      {getFieldError("mobile")}
                    </p>
                  )}
                  <div className="flex gap-x-1.5  items-center">
                    <MessagesSquare
                      {...iconSize}
                      className="my-px lg:mb-0.75 "
                    />
                    <div className="flex w-full  items-center">
                      <p className="font-semibold sm:w-[25%] pr-2">Skype:</p>
                      <input
                        type="text"
                        name="skype"
                        value={userData?.skype || ""}
                        onChange={onHandleChange}
                        className="w-full max-w-sm border rounded-sm h-9 px-3 
                        bg-white border-gray-300 outline-none
                         input-box-focus"
                      />
                    </div>
                  </div>
                  {/* <div className="flex gap-x-1.5">
                    <Mail {...iconSize} className="mt-px lg:mt-1" />
                    <div className="flex w-full">
                      <p className="font-semibold sm:w-[25%] pr-2">Email:</p>
                      <span>{userData?.email || ""}</span>
                    </div>
                  </div> */}
                </div>
              </div>
              {/* ======Buttons======= */}
              <div
                className="flex-center-between w-full 
              gap-x-3 py-5 px-6 lg:justify-center
              text-sm lg:text-[16px] mt-auto 2xl:px-8"
              >
                <button
                  type="button"
                  onClick={goToProfilePage}
                  className="px-4 py-2 rounded-md cursor-pointer
                  cancel-button-shadow text-white mt-4 
                  font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 rounded-md cursor-pointer
                text-white mt-4 gn-button-shadow font-bold"
                >
                  {isLoading ? "Saving..." : "Update"}
                </button>
              </div>
              {!isLoading &&
                isError &&
                error &&
                errorLength !== 0 &&
                commonError && (
                  <p className="text-red-700 text-sm px-2 text-center py-2">
                    {commonError?.msg}
                  </p>
                )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfilePage;
