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
            className="flex-col py-3 rounded-md bg-white
       dropdown-menu-box-shadow w-full  "
          >
            <div
              className="flex-center my-3 bg-(--body-bg) 
        text-(--link-color) font-bold text-sm  
        border-y border-(--text-color)/5 lg:my-5 "
            >
              Let's Get In Touch
            </div>
            <div className="xl:w-full xl:h-[80%]   ">
              {/* ===========Contacts Section========= */}
              <div
                className="p-5 pl-[5%] flex  flex-col gap-y-4 text-sm 
            lg:text-[16px] lg:gap-y-6  xl:w-full "
              >
                <p
                  className="uppercase text-md lg:text-center
              lg:font-bold lg:text-lg xl:text-left"
                >
                  About
                </p>
                <div className="flex gap-x-1.5 ">
                  <User {...iconSize} className="mt-0.5 lg:mt-1 lg:" />
                  <p className="font-semibold">Full Name:</p>
                  <input
                    type="text"
                    name="name"
                    value={userData?.name}
                    onChange={onHandleChange}
                    className="border rounded px-2 border-none dropdown-menu-box-shadow outline-none focus:border-none"
                  />
                </div>
                <div className="flex gap-x-1.5">
                  <Check {...iconSize} className="mt-0.5 lg:mt-1 " />
                  <p className="font-semibold">Status:</p>
                  <input
                    type="text"
                    name="status"
                    value={userData?.status || ""}
                    onChange={onHandleChange}
                    className="border rounded px-2 border-none dropdown-menu-box-shadow outline-none focus:border-none"
                  />
                </div>
                <div className="flex gap-x-1.5">
                  <Star {...iconSize} className="mt-0.5 lg:mt-1" />
                  <p className="font-semibold">Role:</p>
                  <span className="capitalize"> {user?.role}</span>
                </div>
                <div className="flex gap-x-1.5">
                  <Flag {...iconSize} className="mt-0.5 lg:mt-1" />
                  <p className="font-semibold">Country:</p>
                  <input
                    type="text"
                    name="country"
                    value={userData?.country || "Dhaka, Bangladesh"}
                    onChange={onHandleChange}
                    className="border rounded px-2 border-none dropdown-menu-box-shadow outline-none focus:border-none"
                  />
                </div>
                <div className="flex gap-x-1.5">
                  <BookText {...iconSize} className="mt-0.5 lg:mt-1" />
                  <p className="font-semibold">Languages:</p>
                  <input
                    type="text"
                    name="language"
                    value={userData?.language || "English"}
                    onChange={onHandleChange}
                    className="border rounded px-2 border-none dropdown-menu-box-shadow outline-none focus:border-none"
                  />
                </div>
              </div>
              {/* ===========Contacts Section========== */}
              <div
                className=" p-5 pl-[5%] flex  flex-col gap-y-4 text-sm 
        lg:text-[16px]  lg:gap-y-6 lg:pl-[5%] xl:w-full "
              >
                <p
                  className="uppercase text-md lg:text-center 
          lg:font-bold lg:text-lg xl:text-left "
                >
                  Contacts
                </p>
                <div className="flex gap-x-1.5">
                  <Contact {...iconSize} className="mt-px lg:mt-0.75" />
                  <p className="font-semibold">Contact:</p>
                  <input
                    type="text"
                    name="mobile"
                    value={userData?.mobile}
                    onChange={onHandleChange}
                    className="border rounded px-2 border-none dropdown-menu-box-shadow outline-none focus:border-none"
                  />
                </div>
                {getFieldError("mobile") && (
                  <p className="text-red-700 text-sm">
                    {getFieldError("mobile")}
                  </p>
                )}
                <div className="flex gap-x-1.5">
                  <MessagesSquare {...iconSize} className="my-px lg:mt-0.75" />
                  <p className="font-semibold">Skype:</p>
                  <input
                    type="text"
                    name="skype"
                    value={userData?.skype || ""}
                    onChange={onHandleChange}
                    className="border rounded px-2 border-none dropdown-menu-box-shadow outline-none focus:border-none"
                  />
                </div>
                <div className="flex gap-x-1.5">
                  <Mail {...iconSize} className="mt-px lg:mt-1" />
                  <p className="font-semibold">Email:</p>
                  <span>{userData?.email || ""}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex-center-between w-full  
      gap-x-3 py-5 lg:justify-center "
        >
          <button
            type="button"
            onClick={goToProfilePage}
            className="px-4 py-2 rounded-md border 
          border-(--text-color)/20 bg-white 
          dropdown-menu-box-shadow"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 rounded-md bg-(--link-color)
           text-white disabled:opacity-50 
           dropdown-menu-box-shadow"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
        {!isLoading && isError && error && errorLength !== 0 && commonError && (
          <p className="text-red-700 text-sm px-2 text-center py-2">
            {commonError?.msg}
          </p>
        )}
      </form>
    </div>
  );
};

export default UpdateProfilePage;
