//External Imports
import React, { useState } from "react";
import { ChevronRight, Icon, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

//Internal Imports
import logo from "../../../assets/emailLogo-nobg.png";

const MobileMenu = ({ navMenus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

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
              <h3
                style={{ fontSize: "var(--menu-heading)" }}
                className="text-white text-[22px]! w-fit font-bold"
              >
                Email Platform
              </h3>
            </div>

            <button
              onClick={isMenuOpen}
              className=" z-999 relative text-(--link-color) font-extrabold mr-2"
            >
              <X className="size-4.5" strokeWidth={3} />
            </button>
          </div>
          <ul className="">
            {navMenus?.map(({ name, subMenu, icon: Icon }, i) => {
              const hasSubMenu = subMenu?.length > 0;
              const clicked = isClicked === i;

              return (
                <li key={name} className="">
                  <span
                    onClick={() => setIsClicked(clicked ? null : i)}
                    className={` flex align-center justify-start rounded-sm
                    font-semibold  px-3 py-2.5 mt-2 mx-3  
                    hover:bg-white/8 hover:text-white cursor-pointer relative  
                    ${clicked && "bg-white/5 rounded-b-none"}`}
                  >
                    <Icon size={18} strokeWidth={2.5} className="mr-2.5  " />
                    {name}
                    {hasSubMenu && (
                      <ChevronRight
                        className={`ml-auto size-5 text-white/60 ${clicked && "rotate-90"}`}
                      />
                    )}
                  </span>
                  {hasSubMenu && (
                    <ul
                      className={` mx-4 rounded-b-md  ${clicked && "bg-white/5"}`}
                    >
                      {subMenu?.map(({ name, icon: Icon, path }) => {
                        const isActive = activeSubMenu === name;
                        return (
                          <li
                            onClick={() => setActiveSubMenu(name)}
                            className={` ml-0.5 p-3 pl-10  flex items-center 
                            hover:bg-white/3 hover:text-white/90 rounded-md 
                            gap-x-2 cursor-pointer ${isActive ? "bg-(--link-color)" : ""}`}
                          >
                            <NavLink
                              to={path}
                              key={name}
                              className="flex items-center "
                            >
                              <Icon size={18} className="mr-2.5" />
                              {name}
                            </NavLink>
                          </li>
                        );
                      })}
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
