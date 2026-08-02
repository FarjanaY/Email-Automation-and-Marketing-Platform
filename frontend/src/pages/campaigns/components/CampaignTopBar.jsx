//External Imports
import React from "react";
import { Search, Bell } from "lucide-react";

//Internal Imports

const TABS = [
  { key: "new", label: "New" },
  { key: "all", label: "All" },
];

const CampaignTopBar = ({ activeTab, onTabChange }) => (
  <div
    className="flex flex-col gap-y-3 border-b border-gray-200 bg-white
    px-4 py-3 sm:flex-row sm:items-center sm:justify-between md:px-6"
  >
    <div className="flex items-center gap-x-1 rounded-full bg-(--card-body-bg) p-1 w-fit">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onTabChange(tab.key)}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold cursor-pointer transition-colors ${
            activeTab === tab.key
              ? "bg-(--link-color) text-white"
              : "text-(--text-color) hover:bg-white"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>

    {/* <div className="flex items-center gap-x-3">
      <div className="relative flex-1 sm:w-64">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-(--light-text)"
        />
        <input
          type="text"
          placeholder="Search here..."
          className="w-full rounded-full border border-gray-200 bg-white
          py-1.5 pl-9 pr-3 text-sm text-(--text-color)
          outline-none focus:border-(--link-color)"
        />
      </div>
      <button
        type="button"
        aria-label="Notifications"
        className="flex h-8 w-8 shrink-0 items-center justify-center
        rounded-full border border-gray-200 text-(--light-text)
        cursor-pointer hover:bg-(--card-body-bg)"
      >
        <Bell size={15} />
      </button>
    </div> */}
  </div>
);

export default CampaignTopBar;
