import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

const DesktopMenu = ({ navMenus }) => {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <aside
      className="
      fixed
      top-0
      left-0
      w-72
      h-screen
      bg-[#182535]
      text-[#BEC5CC]
      border-r
      border-white/10
      overflow-y-auto
      hide-scrollbar
      "
    >
      {/* Logo */}

      <div className="px-6 py-5 border-b border-white/10">
        <h2 className="text-xl font-bold text-white">Email Platform</h2>
      </div>

      {/* Menu */}

      <ul className="py-4">
        {navMenus.map((menu, index) => {
          const Icon = menu.icon;
          const isOpen = openMenu === index;

          return (
            <li key={menu.title}>
              {/* Parent */}

              <button
                onClick={() => setOpenMenu(isOpen ? null : index)}
                className="
                w-full
                flex
                items-center
                gap-3
                px-6
                py-3
                hover:bg-white/5
                transition-all
                duration-300
                cursor-pointer
                "
              >
                <Icon size={18} />

                <span className="flex-1 text-left">{menu.title}</span>

                {menu.submenu && (
                  <ChevronRight
                    size={18}
                    className={`
                      transition-transform
                      duration-300
                      ${isOpen ? "rotate-90" : ""}
                    `}
                  />
                )}
              </button>

              {/* Submenu */}

              {menu.submenu && (
                <div
                  className={`
                  overflow-hidden
                  transition-all
                  duration-300
                  ${isOpen ? "max-h-96" : "max-h-0"}
                  `}
                >
                  {menu.submenu.map((sub) => (
                    <button
                      key={sub.title}
                      className="
                      w-full
                      text-left
                      pl-14
                      py-2.5
                      text-sm
                      hover:text-white
                      hover:bg-white/5
                      transition-all
                      "
                    >
                      {sub.title}
                    </button>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default DesktopMenu;

// //External Imports
// import React, { useState } from "react";
// import { ChevronRight, Icon, Menu, X } from "lucide-react";
// import { motion } from "framer-motion";

// //Internal Imports

// const MobileMenu = ({ navMenus }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isClicked, setIsClicked] = useState(null);
//   const [activeMenu, setActiveMenu] = useState(null);

//   const isMenuOpen = () => {
//     setIsOpen(!isOpen);
//     setIsClicked(null);
//   };

//   const subMenuDrawer = {
//     enter: { height: "auto", overflow: "hidden" },
//     exit: { height: 0, overflow: "hidden" },
//   };

//   return (
//     <motion.div
//       className="flex-center-between w-full
//       gap-y-3 z-999 relative"
//       initial={{ x: "-100%" }}
//       animate={{ x: isOpen ? "0%" : "-100%" }}
//     >
//       <h3
//         style={{ fontSize: "var(--menu-heading)" }}
//         className="text-white text-sm w-fit font-bold  ml-3 "
//       >
//         Email Automation & Marketing
//       </h3>
//       <button
//         onClick={isMenuOpen}
//         className=" z-999 relative text-(--link-color) "
//       >
//         {isOpen ? <X className="size-5" /> : <Menu />}
//       </button>
//       <div
//         className="fixed w-72 left-0 right-0 top-16
//         overflow-y-auto hide-scrollbar h-full pb-20 text-sm"
//       >
//         <ul className="">
//           {navMenus?.map(({ name, subMenu, icon: Icon }, i) => {
//             const hasSubMenu = subMenu?.length > 0;
//             const clicked = isClicked === i;

//             return (
//               <li key={name} className="">
//                 <span
//                   onClick={() => setIsClicked(clicked ? null : i)}
//                   className={` flex align-center justify-start rounded-md
//                     font-semibold  px-7 py-2.5 mt-2 mx-4
//                     hover:bg-white/8 hover:text-white cursor-pointer relative
//                     ${clicked && "bg-white/5 rounded-b-none"}`}
//                 >
//                   <Icon size={18} className="mr-2.5 text-white " />
//                   {name}
//                   {hasSubMenu && (
//                     <ChevronRight
//                       className={`ml-auto size-5 text-white/60 ${clicked && "rotate-90"}`}
//                     />
//                   )}
//                 </span>
//                 {hasSubMenu && (
//                   <ul
//                     className={` mx-4 rounded-b-md  ${clicked && "bg-white/5"}`}
//                   >
//                     {subMenu?.map(({ name, icon: Icon }) => {
//                       return (
//                         <li
//                           key={name}
//                           className="ml-0.5 p-3 pl-10  flex items-center hover:bg-white/3 hover:text-white/90 rounded-md gap-x-2 cursor-pointer"
//                         >
//                           <Icon size={18} className="mr-2.5" />
//                           {name}
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </motion.div>
//   );
// };

// export default MobileMenu;
