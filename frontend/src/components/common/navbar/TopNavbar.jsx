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

const TopNavbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [isShortCuts, setIsShortCuts] = useState(false);

  const DarkModeSet = () => {
    setIsDarkMode((prev) => !prev);
  };

  const NotificationHandler = () => {
    setIsNotification((prev) => !prev);
  };

  const ShortCutsHandler = () => {
    setIsShortCuts((prev) => !prev);
  };

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
          <span>
            <Globe {...iconSize} />
          </span>
        </div>
        <div>
          <span onClick={DarkModeSet}>
            {isDarkMode ? <Moon {...iconSize} /> : <Sun {...iconSize} />}
          </span>
        </div>
        <div>
          <span onClick={ShortCutsHandler}>
            <LayoutGrid {...iconSize} />
          </span>
          {isShortCuts && <ShortCutsCard />}
        </div>
        <div>
          <span onClick={NotificationHandler}>
            {isNotification ? <Bell /> : <BellDot />}
          </span>
          {isNotification && <NotificationCard />}
        </div>
        <div>
          <span>
            <img
              src={dp}
              alt="user"
              className="h-9 w-9 rounded-full ring-2 ring-blue-500"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
