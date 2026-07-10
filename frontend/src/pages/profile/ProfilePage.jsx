import React, { useEffect, useState } from "react";
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

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//Internal Imports
import coverPhoto from "../../../public/profilePage/coverPhoto.jpg";
import userProfile from "../../../public/profilePage/userProfile.jpg";
import { getOneUserById, deleteUser } from "../../features/users/userSlice";
import { formatCreatedAtDate } from "../../utils/helper/dateFormatter";
import { logOut } from "../../features/auth/authSlice";
import AreYouSureModal from "../../components/common/AreYouSureModal";

const ProfilePage = () => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const authUser = useSelector((state) => state.authR.user);
  const { user, isLoading, error, isError } = useSelector(
    (state) => state.userR,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser?.userId) {
      dispatch(getOneUserById(authUser?.userId));
    }
  }, [dispatch, authUser]);

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteUser(user._id)).unwrap();
      await dispatch(logOut());
      navigate("/login");
    } catch (err) {
      console.log(err);
    } finally {
      setShowDeleteConfirm(false);
    }
  };
  const baseURL = import.meta.env.VITE_CLIENT_URL;
  const imagePath = `${baseURL}/uploads/avatar/${user?.avatar}`;

  const iconSize = {
    size: 15,
    strokeWidth: 2.2,
  };
  return (
    <div className="m-2 p-3 pb-6 lg:p-3">
      <div
        className=" flex flex-col gap-y-3 
    lg:grid lg:grid-cols-2 lg:gap-x-5  
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
                src={user?.avatar ? `${imagePath}` : userProfile}
                alt="Profile Picture"
                className="h-[30%] w-[30%] bg-white aspect-square object-cover 
              border-4 border-white rounded-md
             "
              />
            </div>
          </div>

          <span className="pt-[15%] font-bold pb-3 text-xl text-(--card-heading-color) ">
            {user?.name || "Shakibul Hasan"}
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
      <div
        className="flex-center-between w-full  
      gap-x-3 py-5 lg:justify-center text-sm lg:text-[16px]"
      >
        {" "}
        <button
          onClick={() => navigate("/profile/edit")}
          className="px-4 py-2 rounded-md cursor-pointer
             text-white mt-4  gn-button-shadow 
             font-bold"
        >
          Edit Profile
        </button>
        <button
          type="button"
          onClick={() => setShowDeleteConfirm(true)}
          className="px-4 py-2 rounded-md cursor-pointer
          dropdown-menu-box-shadow font-bold 
          text-white delete-button-shadow"
        >
          Delete Account
        </button>
      </div>

      {/* PopupModal for acocunt delete*/}
      <AreYouSureModal
        isOpen={showDeleteConfirm}
        title="Delete Account"
        message="Are you sure? you want to delete your account?"
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
};

export default ProfilePage;
