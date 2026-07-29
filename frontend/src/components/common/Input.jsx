import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  return (
    <div>
      <div className="flex flex-col w-full  py-2">
        <label
          htmlFor={name}
          className="px-0.5 uppercase w-full text-[11px] 
          lg:text-[12px] py-0.5 text-[#516377] font-normal"
        >
          {fieldlabel}:
        </label>
        <div className="relative w-full">
          <input
            type={inputType}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full  border rounded-sm h-9 lg:h-10 
          bg-white border-gray-300 outline-none px-2.5
            input-box-focus placeholder:text-[13px]
            placeholder:font-medium  lg:placeholder:text-[14px] 
            ${isPasswordField ? "pr-9" : ""}
            ${error ? "border-red-500" : ""}`}
          />{" "}
          {isPasswordField && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              className="absolute right-2 top-1/2 -translate-y-1/2 
              text-gray-500 cursor-pointer"
            >
              {" "}
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          )}
        </div>
      </div>
      {error && (
        <p
          className="text-(--invalid-color) text-[13px] 
        px-1/2"
        >
          {error}
          {extraError}
        </p>
      )}
    </div>
  );
};

export default Input;
