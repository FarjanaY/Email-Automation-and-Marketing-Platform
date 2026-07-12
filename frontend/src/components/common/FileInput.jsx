import React from "react";

const FileInput = ({ fieldlabel, name, onChange, imageFileName, error }) => {
  return (
    <div>
      <div className="flex flex-col py-2 px-2 ">
        <label
          htmlFor={name}
          className="px-0.5 uppercase w-full text-[13px] py-1 cursor-pointer"
        >
          {fieldlabel} :
        </label>
        <label
          className="w-full max-w-sm border rounded-sm h-9 px-3 
                        bg-white border-gray-300 outline-none
                         input-box-focus flex items-center"
        >
          <input
            type="file"
            name={name}
            onChange={onChange}
            className="hidden "
          />
          <span className="text-md text-slate-600 opacity-75 ">
            {/* {imageFileName || "Choose your file"} */}
            {imageFileName?.trim() ? imageFileName : "Enter Your Picture"}
          </span>
        </label>
      </div>
      {error && <p className="text-red-700 text-sm px-2">{error}</p>}
    </div>
  );
};

export default FileInput;
