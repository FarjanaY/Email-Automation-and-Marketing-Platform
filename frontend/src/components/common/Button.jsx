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
      className={`mr-2  h-8 px-2 font-bold rounded-sm shadow-lg shadow-gray-400 ${className} `}
    >
      {children}
    </button>
  );
};

export default Button;
