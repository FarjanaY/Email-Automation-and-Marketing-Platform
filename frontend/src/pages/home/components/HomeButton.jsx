import React from "react";

const HomeButton = ({ buttonText, className, onclick, icon }) => {
  return (
    <div className="">
      <button
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
