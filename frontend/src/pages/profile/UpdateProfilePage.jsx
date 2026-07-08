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
  //Redux data from Auth Reducer
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
      formData.append(key, userData[key]);
    });
    try {
      await dispatch(updateUser(formData)).unwrap();
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

  const baseURL = import.meta.env.VITE_CLIENT_URL;
  const imagePath = `${baseURL}/uploads/avatar/${user?.avatar}`;

  const iconSize = {
    size: 15,
    strokeWidth: 2.2,
  };
  return (
    <div
      className="m-2 p-3 pb-6 flex flex-col gap-y-3 
    lg:grid lg:grid-cols-2 lg:gap-x-5 lg:p-3 
     "
    >
      <div
        className="flex-col flex-center rounded-md 
      bg-white dropdown-menu-box-shadow "
      >
        <div className="relative flex-center ">
          <div>
            <img
              src={coverPhoto}
              alt="Cover Photo"
              className="aspect-2/1 object-cover rounded-t-md"
            />
          </div>
          <div className="absolute  items-center bottom-[-25%] flex-center">
            <img
              src={preview ? preview : user?.avatar ? imagePath : userProfile}
              alt="Profile Picture"
              className="h-[30%] w-[30%] bg-white aspect-square object-cover
                        border-4 border-white rounded-md"
            />
          </div>
        </div>

        <span className="pt-[15%] font-bold pb-3 text-xl text-(--card-heading-color) ">
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={onHandleChange}
            className="w-full border rounded-md px-3 py-2 outline-none
             focus:border-(--link-color)"
          />
        </span>
        <div className="flex-center  px-2 gap-x-2 flex-wrap pb-10">
          {user?.profession && (
            <div className="flex gap-1 py-1 ">
              <PenTool
                size={17}
                strokeWidth={2.5}
                className="rotate-x-180 mt-0.5"
              />
              <span className="text-md font-semibold">
                {user?.profession || ""}
              </span>
            </div>
          )}

          <div className="flex  gap-1 py-1 ">
            <MapPin size={17} strokeWidth={2.5} className="mt-0.5" />
            <span className="text-md font-semibold">
              {user?.address || "Dhaka, Bangladesh"}
            </span>
          </div>
          <div className="flex gap-1 py-1 ">
            <BookCheck size={17} strokeWidth={2.5} className="mt-0.5" />
            <span className="text-md font-semibold">
              Joined {formatCreatedAtDate(user?.createdAt)}
            </span>
          </div>
        </div>
      </div>
      <div
        className="flex-col py-3 rounded-md bg-white
       dropdown-menu-box-shadow w-full  lg:pt-10"
      >
        <div
          className="flex-center my-3 bg-(--body-bg) 
        text-(--link-color) font-bold text-sm  
        border-y border-(--text-color)/5 lg:mb-5"
        >
          Let's Get In Touch
        </div>
        <div className="xl:w-full xl:h-[80%]  xl:flex xl:items-center xl:justify-center ">
          {/* ===========Contacts Section========= */}
          <div
            className="p-5 pl-[5%] flex  flex-col gap-y-4 text-sm 
            lg:text-[16px] lg:gap-y-6 xl:border-r xl:w-full "
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
              <span>{user?.name || ""}</span>
            </div>
            <div className="flex gap-x-1.5">
              <Check {...iconSize} className="mt-0.5 lg:mt-1 " />
              <p className="font-semibold">Status:</p>
              <span>{user?.status || ""}</span>
            </div>
            <div className="flex gap-x-1.5">
              <Star {...iconSize} className="mt-0.5 lg:mt-1" />
              <p className="font-semibold">Role:</p>
              <span className="capitalize"> {user?.role}</span>
            </div>
            <div className="flex gap-x-1.5">
              <Flag {...iconSize} className="mt-0.5 lg:mt-1" />
              <p className="font-semibold">Country:</p>
              <span>{user?.country || "Dhaka, Bangladesh"}</span>
            </div>
            <div className="flex gap-x-1.5">
              <BookText {...iconSize} className="mt-0.5 lg:mt-1" />
              <p className="font-semibold">Languages:</p>
              <span>{user?.language || "English"}</span>
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
              <span>{user?.mobile || ""}</span>
            </div>
            <div className="flex gap-x-1.5">
              <MessagesSquare {...iconSize} className="my-px lg:mt-0.75" />
              <p className="font-semibold">Skype:</p>
              <span>{user?.skype || ""}</span>
            </div>
            <div className="flex gap-x-1.5">
              <Mail {...iconSize} className="mt-px lg:mt-1" />
              <p className="font-semibold">Email:</p>
              <span>{user?.email || ""}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
