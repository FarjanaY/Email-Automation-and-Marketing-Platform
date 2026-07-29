//External Imports
import React from "react";

//Internal Imports

const userDashboard = () => {
  return (
    <div>
      <div className="">
        <div className="p-4">
          {Array.from({ length: 200 }).map((_, i) => (
            <p key={i}>Lorem ipsum {i}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default userDashboard;
