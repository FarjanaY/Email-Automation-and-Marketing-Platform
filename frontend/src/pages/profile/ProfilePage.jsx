import React from "react";
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
import axios from "axios";

//Internal Imports
import coverPhoto from "../../../public/profilePage/coverPhoto.jpg";
import userProfile from "../../../public/profilePage/userProfile.jpg";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.authR);
  console.log("user", user);

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
          <div className="absolute items-center bottom-[-25%] flex-center">
            <img
              src={userProfile}
              alt="Profile Picture"
              className="h-[30%] w-[30%] aspect-square object-cover 
              border-4 border-white rounded-md
             "
            />
          </div>
        </div>

        <span className="pt-[15%] font-bold pb-3 text-xl text-(--card-heading-color) ">
          {user?.name || "Shakibul Hasan"}
        </span>
        <div className="flex-center  px-2 gap-x-2 flex-wrap pb-10">
          <div className="flex gap-1 py-1 ">
            <PenTool
              size={17}
              strokeWidth={2.5}
              className="rotate-x-180 mt-0.5"
            />
            <sapn className="text-md font-semibold">
              {user?.profession || "RPA Developer"}
            </sapn>
          </div>
          <div className="flex  gap-1 py-1 ">
            <MapPin size={17} strokeWidth={2.5} className="mt-0.5" />
            <sapn className="text-md font-semibold">
              {user?.address || "Dhaka, Bangladesh"}
            </sapn>
          </div>
          <div className="flex gap-1 py-1 ">
            <BookCheck size={17} strokeWidth={2.5} className="mt-0.5" />
            <sapn className="text-md font-semibold">Joined April 2021</sapn>
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
              <sapn> {user?.name || "Shakibul Hasan"}</sapn>
            </div>
            <div className="flex gap-x-1.5">
              <Check {...iconSize} className="mt-0.5 lg:mt-1 " />
              <p className="font-semibold">Status:</p>
              <sapn>status</sapn>
            </div>
            <div className="flex gap-x-1.5">
              <Star {...iconSize} className="mt-0.5 lg:mt-1" />
              <p className="font-semibold">Role:</p>
              <sapn> {user.role}</sapn>
            </div>
            <div className="flex gap-x-1.5">
              <Flag {...iconSize} className="mt-0.5 lg:mt-1" />
              <p className="font-semibold">Country:</p>
              <sapn>{user?.country || "Dhaka, Bangladesh"}</sapn>
            </div>
            <div className="flex gap-x-1.5">
              <BookText {...iconSize} className="mt-0.5 lg:mt-1" />
              <p className="font-semibold">Languages:</p>
              <sapn>{user.language || "Bangla"}</sapn>
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
              <sapn> {user.mobile}</sapn>
            </div>
            <div className="flex gap-x-1.5">
              <MessagesSquare {...iconSize} className="my-px lg:mt-0.75" />
              <p className="font-semibold">Skype:</p>
              <sapn>john.doe</sapn>
            </div>
            <div className="flex gap-x-1.5">
              <Mail {...iconSize} className="mt-px lg:mt-1" />
              <p className="font-semibold">Email:</p>
              <sapn>{user.email}</sapn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
