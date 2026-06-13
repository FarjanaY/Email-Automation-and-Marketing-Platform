import React from "react";

const ShortCutsCard = () => {
  return (
    <div className="bg-amber-600 ">
      {" "}
      <div
        className="absolute  right-3 top-15 left-0 w-auto lg:w-100 lg:left-auto
      bg-white rounded-lg shadow-lg 
      border border-gray-200 p-4 z-50"
      >
        <div className="">
          <h3>Shortuts</h3>
        </div>
        <div className="grid grid-cols-2">
          <div>
            <span>New email campaign created</span>
          </div>
          <div>
            <span>Automation completed successfully</span>
          </div>
          <div>
            <span> 5 new subscribers joined</span>
          </div>
          <div>
            <span>New email campaign created</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortCutsCard;
