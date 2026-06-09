//External Imports
import React, { useState } from "react";
import { ChevronRight, Icon, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

//Internal Imports
import logo from "../../../assets/emailLogo-nobg.png";

const MobileMenu = ({ navMainMenus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  const isMenuOpen = () => {
    setIsOpen(!isOpen);
    setIsClicked(null);
  };

  const subMenuDrawer = {
    enter: { height: "auto", overflow: "hidden" },
    exit: { height: 0, overflow: "hidden" },
  };

  return (
    <header className="h-full fixed inset-0 shadow-md w-72 overflow-y-auto">
      <nav className="p-3.5 h-full w-full mx-w-7xl mx-auto flex-top">
        <div className="flex-center-between w-full z-999 relative ">
          <button
            onClick={isMenuOpen}
            className=" z-999 relative  text-(--link-color) "
          >
            <Menu />
            {/* {isOpen ? <X className="size-5" /> : <Menu />} */}
          </button>
        </div>
        <motion.div
          className="bg-menu-theme fixed w-68
           left-0 right-0 top-0 overflow-y-auto hide-scrollbar 
           h-full pb-20 text-sm gap-y-3 z-999 transition-all duration-120 ease-linear "
          initial={{ x: "-100%" }}
          animate={{ x: isOpen ? "0%" : "-100%" }}
        >
          <div className="my-6 flex-center-between w-full px-2 gap-y-2">
            <div
              className="flex items-center justify-items-start w-full 
            px-2"
            >
              <img
                src={logo}
                alt="Logo"
                className="mr-1 -mt-1.5 size-10 rounded-full ring-0 ring-(--link-color) "
              />
              <NavLink
                to={"/"}
                onClick={isMenuOpen}
                style={{ fontSize: "var(--menu-heading)" }}
                className="text-white text-[22px]! w-fit font-bold"
              >
                Email Platform
              </NavLink>
            </div>

            <button
              onClick={isMenuOpen}
              className=" z-999 relative text-(--link-color) font-extrabold mr-2"
            >
              <X className="size-4.5" strokeWidth={3} />
            </button>
          </div>
          <ul className="">
            {navMainMenus?.map(({ name, mainMenu }) => {
              const navMenus = mainMenu?.length > 0;
              return (
                <li key={name} className="my-auto ">
                  {name && (
                    <span className="text-xs text-white/30 uppercase px-3 mx-3 my-6 ">
                      {name}
                    </span>
                  )}
                  {navMenus && (
                    <ul className="mt-5 mb-8">
                      {mainMenu?.map(
                        ({ name, subMenu, path, icon: Icon }, i) => {
                          const hasSubMenu = subMenu?.length > 0;
                          const clicked = isClicked === name;
                          const isMenuActive = activeMenu === name;

                          return (
                            <li key={name} className="">
                              <NavLink
                                to={path}
                                onClick={() => {
                                  if (hasSubMenu) {
                                    setIsClicked(clicked ? null : name);
                                  } else {
                                    setActiveMenu(name);
                                    setActiveSubMenu(null);

                                    // closing the menu while clicking the menu without submenu
                                    setIsOpen(!isOpen);
                                    setIsClicked(null);
                                  }
                                }}
                                className={` flex align-center justify-start rounded-sm
                                          font-medium  px-3 py-2.5 mt-0.5 mx-3  
                                         hover:text-white cursor-pointer 
                                          relative ${
                                            isMenuActive
                                              ? "bg-(--link-color) text-white font-semibold"
                                              : "hover:bg-white/3 hover:text-white/90"
                                          } 
                                            ${
                                              clicked
                                                ? "bg-white/5 rounded-b-none"
                                                : ""
                                            }`}
                              >
                                <Icon
                                  size={18}
                                  strokeWidth={2.5}
                                  className="mr-2.5  "
                                />
                                {name}
                                {hasSubMenu && (
                                  <ChevronRight
                                    className={`ml-auto size-4 text-white/60 ${clicked && "rotate-90"}`}
                                  />
                                )}
                              </NavLink>
                              {hasSubMenu && (
                                <motion.ul
                                  initial="exit"
                                  animate={clicked ? "enter" : "exit"}
                                  variants={subMenuDrawer}
                                  className={` mx-3 rounded-b-sm  ${clicked && "bg-white/5"}`}
                                >
                                  {subMenu?.map(
                                    ({ name, icon: Icon, path }) => {
                                      const isActive = activeSubMenu === name;
                                      return (
                                        <li
                                          onClick={() => {
                                            setIsClicked(name);
                                           
                                            setActiveSubMenu(name);
                                            setActiveMenu(null);
                                            // closing the menu while clicking the menu without submenu
                                            setIsOpen(false);
                                          }}
                                          className={` p-3 pl-5  flex items-center 
                                                rounded-sm gap-x-2 cursor-pointer 
                                                ${
                                                  isActive
                                                    ? "bg-(--link-color) text-white font-semibold"
                                                    : "hover:bg-white/3 hover:text-white/90"
                                                }`}
                                        >
                                          <NavLink
                                            to={path}
                                            key={name}
                                            className="flex items-center "
                                          >
                                            <Icon
                                              size={18}
                                              className="mr-2.5"
                                            />
                                            {name}
                                          </NavLink>
                                        </li>
                                      );
                                    },
                                  )}
                                </motion.ul>
                              )}
                            </li>
                          );
                        },
                      )}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </motion.div>

        {/* <ul className="hidden">
            {NavMenus.map((menu) => (
              <DesktopMenu menu={menu} key={menu?.name} />
            ))}
          </ul>
          <div className="">
            <MobileMenu navMenus={NavMenus} />
          </div> */}
      </nav>
    </header>
  );
};

export default MobileMenu;
