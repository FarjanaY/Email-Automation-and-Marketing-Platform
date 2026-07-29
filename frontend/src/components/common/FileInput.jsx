import React from "react";

const FileInput = ({ fieldlabel, name, onChange, imageFileName, error }) => {
  return (
    <div>
      <div className="flex flex-col py-2 w-full">
        <label
          htmlFor={name}
          className="px-0.5 uppercase w-full text-[11px] lg:text-[12px] 
          py-0.5 text-[#516377] font-normal cursor-pointer"
        >
          {fieldlabel} :
        </label>
        <label
          className={`w-full border rounded-sm h-9 lg:h-10 
          bg-white border-gray-300 outline-none px-2.5
            input-box-focus  flex items-center 
            ${error ? "border-red-500" : ""}`}
        >
          <input
            type="file"
            name={name}
            onChange={onChange}
            className="hidden "
          />
          <span
            className="text-[13px] lg:text-[14px] 
            text-[#516377]/50 font-medium "
          >
            {/* {imageFileName || "Choose your file"} */}
            {imageFileName?.trim() ? imageFileName : "Enter Your Picture"}
          </span>
        </label>
      </div>
      {error && (
        <p
          className="text-(--invalid-color) text-[13px] px-2 
        "
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default FileInput;
