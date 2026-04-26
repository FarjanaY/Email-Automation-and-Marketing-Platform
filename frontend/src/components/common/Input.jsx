import React from "react";

const Input = ({
  fieldlabel,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  extraError,
}) => {
  return (
    <div>
      <div className="flex place-content-between py-2 px-2">
        <label htmlFor={name} className=" font-bold w-[30%]">
          {fieldlabel}:
        </label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder="Enter Your Email"
          className="px-2 h-7  shadow-[0_-0.5px_5px_rgba(0,0,0,0.1)] mx-2 rounded-md w-[60%] focus:outline-none autofill:bg-white autofill:text-black"
        />
      </div>
      {error && (
        <p className="text-red-700 text-sm px-2">
          {error}
          {extraError}
        </p>
      )}
    </div>
  );
};

export default Input;
