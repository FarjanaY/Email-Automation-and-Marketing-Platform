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
      <div className="flex flex-col py-2 px-2 w-full Cm">
        <label
          htmlFor={name}
          className="px-0.5 uppercase w-full text-[12px] 
          py-0.5 text-[#516377] font-normal"
        >
          {fieldlabel}:
        </label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full max-w-sm border rounded-sm h-9 px-2.5 
                  bg-white border-gray-300 outline-none 
                    input-box-focus placeholder:text-[14px] 
                    placeholder:font-medium"
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
