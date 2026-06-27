import React from "react";
import { MailOpen } from "lucide-react";

//Internal imports
import dp from "../../../../assets/defaultDP.jpg";

const NotificationCard = () => {
  return (
    <div className="text-[15px] py-1">
      <div
        className="absolute  right-0 top-15 left-0 w-auto 
        lg:w-100 lg:left-auto  rounded-md 
        dropdown-menu-box-shadow z-50 bg-white"
      >
        <div className="p-5 flex-center-between font-bold text-lg ">
          <h3>Notifications</h3>
          <MailOpen size={18} strokeWidth={2.5} />
        </div>
        <div className="pb-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border-t border-(--text-color)/30">
              <div
                className="flex items-center justify-items-start 
                  gap-x-3 py-1.5 px-5 p-2 pl-5 cursor-pointer 
                  hover:bg-(--text-color)/7 "
              >
                <img
                  src={dp}
                  alt="user"
                  className="h-8 w-8 rounded-full ring-2 ring-blue-500"
                />
                <div className="flex flex-col gap-1 px-2">
                  <sapn className="text-md font-bold">
                    Congratulation Lettie 🎉
                  </sapn>
                  <p className="text-sm text-(--text-color) font-light">
                    Won the monthly best seller gold badge
                  </p>
                  <span className="text-[13px] text-(--text-color)/70">
                    1hour ago
                  </span>
                </div>
              </div>
            </div>
          ))}
          <span className="w-full h-px block bg-(--text-color)/30"></span>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
