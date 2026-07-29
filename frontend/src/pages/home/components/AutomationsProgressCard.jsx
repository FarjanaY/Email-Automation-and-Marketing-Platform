//External Imports
import React from "react";

//Internal Imports

const AutomationsProgressCard = ({
  title = "Top Automations",
  subtitle = "Best performers",
  automations = [
    { name: "Welcome Series", triggered: 342, completed: 298 },
    { name: "Re-engagement Campaign", triggered: 156, completed: 89 },
  ],
  onViewAll,
}) => {
  return (
    <div
      className="rounded-md  flex flex-col justify-between
       hover:dropdown-menu-box-shadow  p-4  
      h-full border border-gray-200 w-full 
      "
    >
      <div className="flex  items-start justify-between">
        <div className="flex flex-col items-start justify-between ">
          <p className="font-bold text-(--card-heading-color)">{title}</p>
          <span className="text-xs text-(--light-text) font-semibold">
            {subtitle}
          </span>
        </div>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs text-center font-semibold text-(--link-color) cursor-pointer"
        >
          View All
        </button>
      </div>

      <div className="mt-3 flex flex-col flex-1 justify-around gap-y-2">
        {automations.map((a) => {
          const percent = a.triggered
            ? Math.min((a.completed / a.triggered) * 100, 100)
            : 0;

          return (
            <div key={a.name} className="bg-(--card-body-bg) rounded-md p-2">
              <p className="font-semibold text-xs text-(--text-color)">
                {a.name}
              </p>
              <p className="text-sm font-bold text-black mt-1">
                {percent.toFixed(1)}%
              </p>
              <div
                className="flex items-center justify-between text-[11px]
              text-(--light-text) mt-1 font-semibold"
              >
                <span>{a.triggered} triggered</span>
                <span>{a.completed} completed</span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-white/70 overflow-hidden">
                <div
                  className="h-full rounded-full bg-(--link-color)"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AutomationsProgressCard;
