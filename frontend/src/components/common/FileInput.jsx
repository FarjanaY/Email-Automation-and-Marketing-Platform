import React from "react";

const FileInput = ({ fieldlabel, name, onChange, imageFileName, error }) => {
  return (
    <div>
      <div className="flex place-content-between py-2 px-2 ">
        <label htmlFor={name} className="font-bold w-[30%] cursor-pointer">
          {fieldlabel} :
        </label>
        <label className="w-[60%] h-7 shadow-[0_-0.5px_5px_rgba(0,0,0,0.1)] mx-2 rounded-md overflow-hidden focus:outline-none ">
          <input
            type="file"
            name={name}
            onChange={onChange}
            className="hidden"
          />
          <span className="text-md px-2 text-slate-600 opacity-75 ">
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
