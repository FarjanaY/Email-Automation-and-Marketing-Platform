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
  MoveUpRight,
} from "lucide-react";

//Internal imports
import dp from "../../../assets/defaultDP.jpg";
import NotificationCard from "./navbarComponents/NotificationCard";
import ShortCutsCard from "./navbarComponents/shortCutsCard";
import SidebarProfileCard from "./navbarComponents/SidebarProfileCard";
import DropdownMenuGlobeCard from "./navbarComponents/DropdownMenuGlobeCard";
import { useDispatch, useSelector } from "react-redux";
import { getOneUserById } from "../../../features/users/userSlice";
import { useNavigate } from "react-router-dom";
import HomeButton from "../../../pages/home/components/HomeButton";

const TopNavbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const authUser = useSelector((state) => state.authR.user);
  const { user, isLoading, error, isError } = useSelector(
    (state) => state.userR,
  );
  const isAuthenticated = useSelector((state) => state.authR.isAuthenticated);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    strokeWidth: 2.2,
  };

  const ICON_SIZE_CLASS = "w-4.5 h-4.5 sm:w-5 sm:h-5 lg:w-5.5 lg:h-5.5";

  const baseURL = import.meta.env.VITE_CLIENT_URL;
  const imagePath = `${baseURL}/uploads/avatar/${user?.avatar}`;
  return (
    <div
      className="flex flex-col items-center justify-end 
      relative text-(--text-color) w-full mx-auto 
      gap-x-2 gap-y-2 px-1 "
    >
      <div
        className="w-full flex items-center 
      justify-end gap-x-2 mx-auto"
      >
        {/* =========Search Input======= */}
        {isSearchOpen && (
          <div className="hidden w-full sm:block sm:w-auto ">
            <input
              type="text"
              placeholder="Search..."
              autoFocus
              className="w-full sm:w-48 h-7 px-3 
              rounded-4xl border border-gray-300
              outline-none input-box-focus bg-white 
              text-sm text-(--text-color) 
              placeholder:font-semibold "
            />
          </div>
        )}

        {/* =========Search Icon Button======= */}
        <div
          className={
            isAuthenticated
              ? "flex-center"
              : "flex-center invisible pointer-events-none"
          }
        >
          <span
            className="cursor-pointer"
            onClick={() => {
              setIsSearchOpen((prev) => !prev);
              setActiveMenu(null);
              setIsProfile(false);
            }}
          >
            <Search {...iconSize} className={ICON_SIZE_CLASS} />
          </span>
        </div>
        {/*=============== Globe============= */}
        <div className="flex-center ">
          <span
            onClick={() => {
              activeMenuHandler("globe");
              setIsProfile(false);
            }}
          >
            {
              <Globe
                {...iconSize}
                className={`${ICON_SIZE_CLASS} ${getIconClass("globe")}`}
              />
            }
          </span>
          {activeMenu === "globe" && <DropdownMenuGlobeCard />}
        </div>
        {/* ==========Dark Mode===== */}
        <div className="flex-center ">
          <span
            onClick={() => {
              setIsDarkMode((prev) => !prev);
              activeMenuHandler("darkmode");
              setIsProfile(false);
            }}
          >
            {isDarkMode ? (
              <Moon
                {...iconSize}
                className={`${ICON_SIZE_CLASS} ${getIconClass("darkmode")}`}
              />
            ) : (
              <Sun
                {...iconSize}
                className={`${ICON_SIZE_CLASS} ${getIconClass("darkmode")}`}
              />
            )}
          </span>
        </div>
        {/* =====Shortcut Block====== */}
        <div
          className={
            isAuthenticated
              ? "flex-center"
              : "flex-center invisible pointer-events-none"
          }
        >
          <span onClick={() => activeMenuHandler("shortcuts")}>
            <LayoutGrid
              {...iconSize}
              className={`${ICON_SIZE_CLASS} ${getIconClass("shortcuts")}`}
            />
          </span>
          {activeMenu === "shortcuts" && <ShortCutsCard />}
        </div>
        {/* ==============Notification block======== */}
        {isAuthenticated && (
          <div className="flex-center">
            <span
              onClick={() => {
                activeMenuHandler("notifications");
                setIsProfile(false);
              }}
            >
              {activeMenu === "notifications" ? (
                <Bell
                  className={`${ICON_SIZE_CLASS} ${getIconClass("notifications")}`}
                />
              ) : (
                <BellDot
                  className={`${ICON_SIZE_CLASS} ${getIconClass("notifications")}`}
                />
              )}
            </span>
            {activeMenu === "notifications" && <NotificationCard />}
          </div>
        )}
        {/* Profile block */}
        <div className="flex-center ">
          {isAuthenticated ? (
            <>
              <span
                className="cursor-pointer shrink-0"
                onClick={() => {
                  setIsProfile((prev) => !prev);
                  activeMenuHandler("userprofile");
                }}
              >
                <img
                  src={user?.avatar ? `${imagePath}` : dp}
                  alt="user"
                  className="h-5 w-5 sm:h-7 sm:w-7 rounded-full 
                  ring-2 ring-blue-500"
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
            </>
          ) : (
            <HomeButton
              buttonText="Sign In"
              onclick={() => navigate("/login")}
              // icon={<MoveUpRight size={10} strokeWidth={4} />}
              className={`bg-(--link-color)
                shadow-md/40! shadow-orange-600!
                 text-white  hover:bg-orange-700/90`}
            />
          )}
        </div>
      </div>
      {/* Row 2 — mobile/tablet only, appears below the icon row */}
      {isSearchOpen && (
        <div
          className="block w-full sm:hidden  sm:w-auto 
        pr-5 mt-2"
        >
          <input
            type="text"
            placeholder="Search..."
            autoFocus
            className="w-full h-7 px-3 
              rounded-4xl border border-gray-300
              outline-none input-box-focus bg-white 
              text-sm text-(--text-color) 
              placeholder:font-semibold "
          />
        </div>
      )}
    </div>
  );
};

export default TopNavbar;
