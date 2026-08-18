import React from "react";

const HomeButton = ({ type, buttonText, className, onclick, icon }) => {
  return (
    <div className=" flex place-content-center">
      <button
        type={type}
        onClick={onclick}
        className={`rounded-4xl flex-center
            dropdown-menu-box-shadow text-xs gap-x-1.5 
            py-1.25 px-4 text-center cursor-pointer
            font-semibold sm:text-sm ${className}`}
      >
        <span>{buttonText}</span>
        {icon}
      </button>
    </div>
  );
};

export default HomeButton;
