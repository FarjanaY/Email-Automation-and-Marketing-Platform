//External Imports
import React, { useState } from "react";
import {
  User,
  Settings,
  CreditCard,
  CircleQuestionMark,
  DollarSign,
  Power,
} from "lucide-react";
import { NavLink } from "react-router-dom";

//Internal imports
import dp from "../../../../assets/defaultDP.jpg";

const SidebarProfileCard = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  return (
    <div className="bg-amber-600 text-[15px] ">
      <div
        className="absolute  right-3 top-15 left-0 w-auto 
        lg:w-100 lg:left-auto  bg-white rounded-lg 
        shadow-lg border border-gray-200 z-50"
      >
        <div
          className="flex items-center justify-items-start 
          gap-x-3 py-2 px-4 my-1 p-2 pl-5 cursor-pointer 
          hover:bg-(--text-color)/10"
        >
          <img
            src={dp}
            alt="user"
            className="h-7 w-7 rounded-full ring-2 ring-blue-500"
          />
          <div>
            <sapn className="text-md font-semibold">John Doe</sapn>
            <p className="text-sm text-(--text-color) font-light">Admin</p>
          </div>
        </div>
        <span className="w-full h-px block bg-(--text-color)/30"></span>
        <span
          className="my-1 p-2 pl-5  flex items-center 
                    gap-x-2 cursor-pointer 
                    hover:bg-(--text-color)/10"
        >
          <NavLink to={"/profile"} className="flex items-center ">
            <User size={18} className="mr-2.5" />
            My Profile
          </NavLink>
        </span>

        <span
          className="my-1 p-2 pl-5  flex items-center 
                    gap-x-2 cursor-pointer 
                    hover:bg-(--text-color)/10"
        >
          <NavLink to={"/profile"} className="flex items-center ">
            <Settings size={18} className="mr-2.5" />
            Settings
          </NavLink>
        </span>

        <span
          className="my-1 p-2 pl-5  flex items-center 
                    gap-x-2 cursor-pointer 
                    hover:bg-(--text-color)/10"
        >
          <NavLink to={"/profile"} className="flex items-center ">
            <CreditCard size={18} className="mr-2.5" />
            Billing
          </NavLink>
        </span>
        <span className="w-full h-px block bg-(--text-color)/30"></span>
        <span
          className="my-1 p-2 pl-5  flex items-center 
                    gap-x-2 cursor-pointer 
                    hover:bg-(--text-color)/10"
        >
          <NavLink to={"/profile"} className="flex items-center ">
            <CircleQuestionMark size={18} className="mr-2.5" />
            FAQ
          </NavLink>
        </span>

        <span
          className="my-1 p-2 pl-5  flex items-center 
                    gap-x-2 cursor-pointer 
                    hover:bg-(--text-color)/10"
        >
          <NavLink to={"/profile"} className="flex items-center ">
            <DollarSign size={18} className="mr-2.5" />
            Pricing
          </NavLink>
        </span>
        <span className="w-full h-px block bg-(--text-color)/30"></span>
        <span
          className="my-1 p-2 pl-5  flex items-center 
                    gap-x-2 cursor-pointer 
                    hover:bg-(--text-color)/10"
        >
          <NavLink to={"/logout"} className="flex items-center ">
            <Power size={18} className="mr-2.5" />
            Log out
          </NavLink>
        </span>
      </div>
    </div>
  );
};

export default SidebarProfileCard;
