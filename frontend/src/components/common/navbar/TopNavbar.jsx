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
    <div className=" flex-center-between relative text-(--text-color) w-full mx-w-7xl mx-auto ">
      <div>
        <Search {...iconSize} />
      </div>
      <div className="flex-center px-5 gap-x-2">
        <div>
          <span
            onClick={() => {
              activeMenuHandler("globe");
            }}
          >
            {<Globe {...iconSize} className={getIconClass("globe")} />}
          </span>
        </div>
        <div>
          <span
            onClick={() => {
              setIsDarkMode((prev) => !prev);
              activeMenuHandler("darkmode");
            }}
          >
            {isDarkMode ? (
              <Moon {...iconSize} className={getIconClass("darkmode")} />
            ) : (
              <Sun {...iconSize} className={getIconClass("darkmode")} />
            )}
          </span>
        </div>
        <div>
          <span onClick={() => activeMenuHandler("shortcuts")}>
            <LayoutGrid {...iconSize} className={getIconClass("shortcuts")} />
          </span>
          {activeMenu === "shortcuts" && <ShortCutsCard />}
        </div>
        <div>
          <span
            onClick={() => {
              activeMenuHandler("notifications");
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
        <div>
          <span>
            <img
              onClick={() => {
                setIsProfile((prev) => !prev);
              }}
              src={dp}
              alt="user"
              className="h-7 w-7 rounded-full ring-2 ring-blue-500"
            />
          </span>
          {isProfile && <SidebarProfileCard />}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
