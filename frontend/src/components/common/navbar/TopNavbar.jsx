//External Imports
import React, { useEffect, useState } from "react";
import {
  Search,
  Globe,
  Sun,
  Moon,
  LayoutGrid,
  BellDot,
  Bell,
} from "lucide-react";

//Internal imports
import dp from "../../../assets/defaultDP.jpg";
import NotificationCard from "./navbarComponents/NotificationCard";
import ShortCutsCard from "./navbarComponents/shortCutsCard";
import SidebarProfileCard from "./navbarComponents/SidebarProfileCard";
import DropdownMenuGlobeCard from "./navbarComponents/DropdownMenuGlobeCard";
import { useDispatch, useSelector } from "react-redux";
import { getOneUserById } from "../../../features/users/userSlice";

const TopNavbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const authUser = useSelector((state) => state.authR.user);
  const { user, isLoading, error, isError } = useSelector(
    (state) => state.userR,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser?.userId) {
      dispatch(getOneUserById(authUser?.userId));
    }
  }, [dispatch, authUser]);

  //Active menu
  const activeMenuHandler = (menuName) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  const DarkModeSet = () => {
    setIsDarkMode((prev) => !prev);
  };

  //Styling
  const getIconClass = (menuName) =>
    `cursor-pointer ${
      activeMenu === menuName
        ? "text-black/70 font-semibold"
        : "hover:text-black/70"
    }`;

  const iconSize = {
    size: 22,
    strokeWidth: 2.2,
  };

  const baseURL = import.meta.env.VITE_CLIENT_URL;
  const imagePath = `${baseURL}/uploads/avatar/${user?.avatar}`;
  return (
    <div
      className="flex-center-between relative
     text-(--text-color) w-full mx-auto "
    >
      <div className="px-4">
        <Search {...iconSize} />
      </div>
      <div className="flex-center  px-5 gap-x-2">
        <div className="flex-center ">
          <span
            onClick={() => {
              activeMenuHandler("globe");
              setIsProfile(false);
            }}
          >
            {<Globe {...iconSize} className={getIconClass("globe")} />}
          </span>
          {activeMenu === "globe" && <DropdownMenuGlobeCard />}
        </div>
        <div className="flex-center ">
          <span
            onClick={() => {
              setIsDarkMode((prev) => !prev);
              activeMenuHandler("darkmode");
              setIsProfile(false);
            }}
          >
            {isDarkMode ? (
              <Moon {...iconSize} className={getIconClass("darkmode")} />
            ) : (
              <Sun {...iconSize} className={getIconClass("darkmode")} />
            )}
          </span>
        </div>
        <div className="flex-center ">
          <span onClick={() => activeMenuHandler("shortcuts")}>
            <LayoutGrid {...iconSize} className={getIconClass("shortcuts")} />
          </span>
          {activeMenu === "shortcuts" && <ShortCutsCard />}
        </div>
        <div className="flex-center ">
          <span
            onClick={() => {
              activeMenuHandler("notifications");
              setIsProfile(false);
            }}
          >
            {activeMenu === "notifications" ? (
              <Bell className={getIconClass("notifications")} />
            ) : (
              <BellDot className={getIconClass("notifications")} />
            )}
          </span>
          {activeMenu === "notifications" && <NotificationCard />}
        </div>
        <div className="flex-center ">
          <span
            className="cursor-pointer "
            onClick={() => {
              setIsProfile((prev) => !prev);
              activeMenuHandler("userprofile");
            }}
          >
            <img
              src={user?.avatar ? `${imagePath}` : dp}
              alt="user"
              className="h-7 w-7 rounded-full ring-2 ring-blue-500"
            />
          </span>
          {activeMenu === "userprofile" && isProfile && (
            <SidebarProfileCard
              closeProfile={() => {
                setIsProfile(false);
                setActiveMenu(null);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
