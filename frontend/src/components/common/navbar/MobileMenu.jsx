//External Imports
import React, { useState } from "react";
import { ChevronRight, Icon, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";


//Internal Imports
import logo from "../../../assets/emailLogo-nobg.png";
import TopNavbar from "./TopNavbar";

const MobileMenu = ({ navMainMenus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  //======for single expand menu other will be auto close
  //const [expandedMenu, setExpandedMenu] = useState(null);
  const [expandedMenus, setExpandedMenus] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);

  const navigate = useNavigate();

  const isMenuOpen = () => {
    setIsOpen(!isOpen);
    setIsClicked(null);
  };

  //=====For multiple expanded submenu at a time
  const toggleMenu = (menuName) => {
    setExpandedMenus((prev) =>
      prev.includes(menuName)
        ? prev.filter((item) => item !== menuName)
        : [...prev, menuName],
    );
  };

  const subMenuDrawer = {
    enter: { height: "auto", overflow: "hidden" },
    exit: { height: 0, overflow: "hidden" },
  };

  return (
    <header className=" ">
      <div className="fixed left-0 right-0 top-0 w-full flex-center-between z-999 bg-white ">
        <button
          onClick={isMenuOpen}
          className="relative  cursor-pointer  p-5  text-(--text-color) "
        >
          <Menu className="size-5" strokeWidth={3} />
          {/* {isOpen ? <X className="size-5" /> : <Menu />} */}
        </button>
        <TopNavbar />
      </div>
      <nav className="h-full w-full mx-w-7xl mx-auto flex-top ">
        <motion.div
          className="bg-menu-theme fixed w-68
           left-0 right-0 top-0 overflow-y-auto hide-scrollbar 
           h-full pb-20 text-sm gap-y-3 z-999 transition-all duration-120 ease-linear "
          initial={{ x: "-100%" }}
          animate={{ x: isOpen ? "0%" : "-100%" }}
        >
          <div className="my-6 flex-center-between cursor-pointer w-full px-2 gap-y-2">
            <div
              onClick={() => {
                navigate("/");
                setIsOpen(!isOpen);
              }}
              className="flex items-center justify-items-start w-full 
            px-2"
            >
              <img
                src={logo}
                alt="Logo"
                className="mr-1 -mt-1.5 size-10 rounded-full ring-0 ring-(--link-color) "
              />
              <NavLink
                // to={"/"}
                style={{ fontSize: "var(--menu-heading)" }}
                className="text-white text-[22px]! w-fit font-bold"
              >
                Email Platform
              </NavLink>
            </div>

            <button
              onClick={isMenuOpen}
              className=" z-999 relative text-(--link-color) cursor-pointer  font-extrabold p-2 "
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
                          // const clicked = isClicked === name;
                          //======for single expand menu other will be auto close
                          //const clicked = expandedMenu === name;
                          const clicked = expandedMenus.includes(name);
                          const isMenuActive = activeMenu === name;

                          return (
                            <li key={name} className="">
                              <NavLink
                                to={path}
                                onClick={() => {
                                  if (hasSubMenu) {
                                    // setIsClicked(clicked ? null : name);
                                    //======for single expand menu other will be auto close
                                    //setExpandedMenu(clicked ? null : name);
                                    toggleMenu(name);
                                  } else {
                                    setActiveMenu(name);
                                    setActiveSubMenu(null);
                                    //======for single expand menu other will be auto close
                                    //setExpandedMenu(null);
                                    //only for mobile closing the menu while clicking the menu without submenu
                                    setIsOpen(false);
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
                                            //setIsClicked(name);

                                            setActiveSubMenu(name);
                                            setActiveMenu(null);
                                            //only for mobile closing the menu while clicking the menu without submenu
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
