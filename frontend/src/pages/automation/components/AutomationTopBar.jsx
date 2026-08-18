//External Imports
import React from "react";

//Internal Imports

const TABS = [
  { key: "new", label: "New" },
  { key: "all", label: "All Automations" },
];

const AutomationTopBar = ({ activeTab, onTabChange }) => (
  <div
    className="flex flex-col gap-y-3 border-b border-gray-200 bg-white
    px-4 py-3 sm:flex-row sm:items-center sm:justify-between md:px-6"
  >
    <div
      className="flex items-center gap-x-1 
     rounded-md  p-0 w-fit"
    >
      {TABS.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onTabChange(tab.key)}
          className={`rounded-md px-4 py-1.5 text-sm font-semibold cursor-pointer transition-colors ${
            activeTab === tab.key
              ? "bg-(--link-color) text-white hover:bg-orange-700/90"
              : "text-(--text-color) hover:bg-(--card-body-bg)  hover:text-black"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  </div>
);

export default AutomationTopBar;
