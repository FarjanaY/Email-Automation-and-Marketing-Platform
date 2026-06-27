import React from "react";

const ErrorPage = () => {
  return (
    <div className="h-auto flex-center flex-col min-h-[calc(100vh-7rem)] text-center">
      <span
        className="font-bold text-lg text-red-800"

      >
        404 Error!
      </span>
      <p className="text-(--text-color) font-semibold">Your requested doesnot found.</p>
    </div>
  );
};

export default ErrorPage;
