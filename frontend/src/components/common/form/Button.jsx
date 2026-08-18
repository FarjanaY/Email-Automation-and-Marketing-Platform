import React from "react";

const Button = ({
  children,
  type = "button",
  disabled = false,
  onClick,
  className = "",
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`w-full h-10 px-2 
             font-medium text-sm rounded-sm
             dropdown-menu-box-shadow 
             bg-(--nav-link-color) text-white
        ${className} `}
    >
      {children}
    </button>
  );
};

export default Button;
