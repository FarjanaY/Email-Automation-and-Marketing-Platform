//External Imports
import React, { useState, useEffect } from "react";
import {
  User,
  Settings,
  CreditCard,
  CircleQuestionMark,
  DollarSign,
  Power,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Internal imports
import dp from "../../../../assets/defaultDP.jpg";
import { getOneUserById } from "../../../../features/users/userSlice.jsx";
import { logOut } from "../../../../features/auth/authSlice";

const SidebarProfileCard = ({ closeProfile }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isClicked, setIsClicked] = useState(null);

  const authUser = useSelector((state) => state.authR.user);
  const { user, isLoading, error, isError } = useSelector(
    (state) => state.userR,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser?.userId) {
      dispatch(getOneUserById(authUser?.userId));
    }
  }, [dispatch, authUser]);

  const baseURL = import.meta.env.VITE_CLIENT_URL;
  const imagePath = `${baseURL}/uploads/avatar/${user?.avatar}`;

  console.log("image Path" + user?.avatar);

  return (
    <div className="text-[15px] py-1">
      <div
        className="absolute  right-3 top-15 left-0 w-auto 
        lg:w-100 lg:left-auto  bg-white rounded-md 
        dropdown-menu-box-shadow border  border-gray-200 z-50"
      >
        <div
          onClick={() => {
            navigate("/profile");
            closeProfile();
          }}
          className="flex items-center justify-items-start 
          gap-x-3 py-1.5 px-4 my-1 p-2 pl-5 cursor-pointer 
          hover:bg-(--text-color)/7  "
        >
          <img
            src={user?.avatar ? `${imagePath}` : dp}
            alt="user"
            className="h-7 w-7 rounded-full ring-2 ring-blue-500"
          />
          <div>
            <span className="text-md font-semibold">{user?.name}</span>
            <p className="capitalize text-sm text-(--text-color) font-light">
              {user?.role}
            </p>
          </div>
        </div>
        <span className="w-full my-1 h-px block bg-(--text-color)/30"></span>
        <NavLink
          to="/profile"
          onClick={closeProfile}
          className="my-1 p-2 pl-5  flex items-center 
                    gap-x-2 cursor-pointer 
                    hover:bg-(--text-color)/10"
        >
          <sapn className="flex items-center">
            <User size={18} strokeWidth={2.2} className="mr-2.5" />
            My Profile
          </sapn>
        </NavLink>

        <NavLink
          to="/settings"
          onClick={closeProfile}
          className="my-1 p-2 pl-5  flex items-center 
                    gap-x-2 cursor-pointer 
                    hover:bg-(--text-color)/10"
        >
          <span className="flex items-center ">
            <Settings size={18} strokeWidth={2.2} className="mr-2.5" />
            Settings
          </span>
        </NavLink>

        <NavLink
          to="/billing"
          onClick={closeProfile}
          className="my-1 p-2 pl-5  flex items-center 
                    gap-x-2 cursor-pointer 
                   hover:bg-(--text-color)/7 "
        >
          <span className="flex items-center ">
            <CreditCard size={18} strokeWidth={2.2} className="mr-2.5" />
            Billing
          </span>
        </NavLink>

        <span className="w-full my-1  h-px block bg-(--text-color)/30"></span>
        <NavLink
          to="/faq"
          onClick={closeProfile}
          className="my-1 p-2 pl-5  flex items-center 
                    gap-x-2 cursor-pointer 
                    hover:bg-(--text-color)/7"
        >
          <span className="flex items-center ">
            <CircleQuestionMark
              size={17}
              strokeWidth={2.2}
              className="mr-2.5"
            />
            FAQ
          </span>
        </NavLink>

        <NavLink
          to="/pricing"
          onClick={closeProfile}
          className="my-1 p-2 pl-5 flex items-center 
                    gap-x-2 cursor-pointer 
                    hover:bg-(--text-color)/7"
        >
          <span className="flex items-center ">
            <DollarSign size={17} strokeWidth={2.2} className="mr-2.5" />
            Pricing
          </span>
        </NavLink>
        <span className="w-full  h-px block bg-(--text-color)/30"></span>
        <NavLink
          onClick={() => {
            dispatch(logOut());
            closeProfile();
            navigate("/login");
          }}
          className="my-1 p-2 pl-5  flex items-center 
                    gap-x-2 cursor-pointer 
                    hover:bg-(--text-color)/7"
        >
          <span className="flex items-center ">
            <Power size={16} strokeWidth={2.2} className="mr-2.5" />
            Log out
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default SidebarProfileCard;
