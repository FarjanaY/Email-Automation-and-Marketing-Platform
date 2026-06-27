import React from "react";
import { CirclePlus, CalendarDays } from "lucide-react";

const ShortCutsCard = () => {
  return (
    <div className="text-[15px] py-1">
      <div
        className="absolute  right-0 top-15 left-0 w-auto 
        lg:w-100 lg:left-auto  rounded-md 
        dropdown-menu-box-shadow z-50 bg-white"
      >
        <div className="p-5 flex-center-between font-bold text-lg">
          <h3>Shortuts</h3>
          <CirclePlus />
        </div>
        <div className="grid grid-cols-2 grid-rows-2  ">
          <div className="p-6 flex-center flex-col dropdown-menu-box-shadow m-0.5 rounded-sm">
            <div className="rounded-full h-fit p-4 m-1 w-fit bg-(--text-color)/20">
              <CalendarDays className="size-5 " />
            </div>
            <span className="font-semibold py-1">Calendar</span>
            <p className="text-[13px] text-(--text-color)/50">Appointments</p>
          </div>
          <div className="p-6 flex-center flex-col dropdown-menu-box-shadow m-0.5  rounded-sm">
            <div className="rounded-full h-fit p-4 m-1 w-fit bg-(--text-color)/20">
              <CalendarDays className="size-5 " />
            </div>
            <span className="font-semibold py-1">Calendar</span>
            <p className="text-[13px] text-(--text-color)/50">Appointments</p>
          </div>
          <div className="p-6 flex-center flex-col dropdown-menu-box-shadow m-0.5 rounded-sm">
            <div className="rounded-full h-fit p-4 m-1 w-fit bg-(--text-color)/20">
              <CalendarDays className="size-5 " />
            </div>
            <span className="font-semibold py-1">Calendar</span>
            <p className="text-[13px] text-(--text-color)/50">Appointments</p>
          </div>
          <div className="p-6 flex-center flex-col dropdown-menu-box-shadow m-0.5 rounded-sm">
            <div className="rounded-full h-fit p-4 m-1 w-fit bg-(--text-color)/20">
              <CalendarDays className="size-5 " />
            </div>
            <span className="font-semibold py-1">Calendar</span>
            <p className="text-[13px] text-(--text-color)/50">Appointments</p>
          </div>
          <div className="p-6 flex-center flex-col dropdown-menu-box-shadow m-0.5 rounded-sm">
            <div className="rounded-full h-fit p-4 m-1 w-fit bg-(--text-color)/20">
              <CalendarDays className="size-5 " />
            </div>
            <span className="font-semibold py-1">Calendar</span>
            <p className="text-[13px] text-(--text-color)/50">Appointments</p>
          </div>
          <div className="p-6 flex-center flex-col dropdown-menu-box-shadow m-0.5 rounded-sm">
            <div className="rounded-full h-fit p-4 m-1 w-fit bg-(--text-color)/20">
              <CalendarDays className="size-5 " />
            </div>
            <span className="font-semibold py-1">Calendar</span>
            <p className="text-[13px] text-(--text-color)/50">Appointments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortCutsCard;
