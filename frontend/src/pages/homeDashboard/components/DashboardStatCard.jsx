//External Imports
import React from "react";
import { MoreVertical, TrendingUp, TrendingDown } from "lucide-react";

//Internal Imports

const DashboardStatCard = ({ icon, label, value, delta, isDown = false }) => (
  <div
    className="flex h-full w-full flex-col justify-center
    rounded-md bg-white p-3 xl:px-7 xl:py-4 dropdown-menu-box-shadow"
  >
    <div className="mb-3 flex items-center justify-between text-xs text-(--text-color)">
      <span className="flex items-center gap-x-1 md:gap-x-1.5 font-semibold">
        {icon} {label}
      </span>
      <MoreVertical size={14} className="text-(--light-text)" />
    </div>
    <div className="flex items-center justify-between">
      <span className="text-lg font-bold text-(--card-heading-color) md:text-2xl">
        {value}
      </span>
      <span
        className={`flex items-center gap-x-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
          isDown ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
        }`}
      >
        {isDown ? <TrendingDown size={11} /> : <TrendingUp size={11} />}
        {delta}
      </span>
    </div>
  </div>
);

export default DashboardStatCard;
