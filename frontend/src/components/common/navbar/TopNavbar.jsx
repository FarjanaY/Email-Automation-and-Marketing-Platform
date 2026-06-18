//External Imports
import React, { useState } from "react";
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

const TopNavbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

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
              isProfile(null);
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
              isProfile(null);
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
              isProfile(null);
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
        <div className="flex-center">
          <span className=" ">
            <img
              onClick={() => {
                setIsProfile((prev) => !prev);
                activeMenuHandler("userprofile");
              }}
              src={dp}
              alt="user"
              className="h-7 w-7 rounded-full ring-2 ring-blue-500"
            />
          </span>
          {activeMenu === "userprofile" && isProfile && <SidebarProfileCard />}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
