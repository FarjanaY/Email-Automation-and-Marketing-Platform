import React from "react";

const HomePage = () => {
  return (
    <div className="">
      <div className="p-4">
        {Array.from({ length: 200 }).map((_, i) => (
          <p key={i}>Lorem ipsum {i}</p>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
