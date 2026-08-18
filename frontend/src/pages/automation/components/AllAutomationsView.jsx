//External Imports
import React, { useState } from "react";
import { Search, SlidersHorizontal, Zap, MoreVertical } from "lucide-react";

//Internal Imports
import ExportDropdown from "../../../components/common/ExportDropdown";
import Pagination from "../../../components/common/Pagination";

const AUTOMATIONS = [
  {
    name: "Welcome Series",
    subtitle: "Welcome Series",
    type: "Automated",
    launched: "30+ days ago",
    performance: "87.1%",
  },
  {
    name: "Abandoned Cart",
    subtitle: "Abandoned Cart Reminders",
    type: "Automated",
    launched: "14 days ago",
    performance: "65.8%",
  },
  {
    name: "Product Launch",
    subtitle: "New Arrivals",
    type: "Scheduled",
    launched: "7 days ago",
    performance: "92.4%",
  },
  {
    name: "Feedback Request",
    subtitle: "Post-Purchase Survey",
    type: "Automated",
    launched: "21 days ago",
    performance: "78.3%",
  },
  {
    name: "Seasonal Promotion",
    subtitle: "Holiday Specials",
    type: "Automated",
    launched: "10 days ago",
    performance: "80.5%",
  },
  {
    name: "Re-engagement",
    subtitle: "Win Back Customers",
    type: "Automated",
    launched: "30 days ago",
    performance: "55.2%",
  },
];

const TYPE_STYLES = {
  Automated: "bg-(--link-color)/10 text-(--link-color)",
  Scheduled: "bg-blue-50 text-blue-600",
};

const TOTAL_PAGES = 15;
const PAGE_NUMBERS = [1, 2, 3, 4, 5];

const AllAutomationsView = () => {
  const [activePage, setActivePage] = useState(1);

  return (
    <div className="flex flex-col gap-y-4 p-4 md:p-6">
      <div
        className="flex flex-col items-start justify-between gap-y-3
        sm:flex-row sm:items-center"
      >
        <p className="text-xl font-bold text-black md:text-2xl">
          All Automations
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-(--light-text)"
            />
            <input
              type="text"
              placeholder="Search Contacts..."
              className="w-full rounded-full border border-gray-200 bg-white
              py-2 pl-9 pr-3 text-sm text-(--text-color) outline-none
              focus:border-(--link-color) sm:w-56"
            />
          </div>
          <button
            type="button"
            className="flex items-center gap-x-1.5 rounded-full border
            border-gray-200 bg-white px-4 py-2 text-sm font-semibold
            text-(--card-heading-color) cursor-pointer hover:bg-(--card-body-bg)"
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>
          <ExportDropdown />
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border border-gray-200 bg-white p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-bold text-(--light-text)">
              <th className="pb-3 font-normal">Automation Name</th>
              <th className="pb-3 font-normal">Type</th>
              <th className="pb-3 font-normal">Launched</th>
              <th className="pb-3 font-normal">Performance</th>
              <th className="pb-3 font-normal">Action</th>
            </tr>
          </thead>
          <tbody>
            {AUTOMATIONS.map((a) => (
              <tr key={a.name} className="border-t border-(--text-color)/10">
                <td className="py-3">
                  <div className="flex items-center gap-x-2">
                    <Zap size={16} className="shrink-0 text-(--link-color)" />
                    <div>
                      <p className="font-semibold text-(--card-heading-color)">
                        {a.name}
                      </p>
                      <span className="text-xs text-(--light-text)">
                        {a.subtitle}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${TYPE_STYLES[a.type]}`}
                  >
                    {a.type}
                  </span>
                </td>
                <td className="py-3 text-(--text-color)">{a.launched}</td>
                <td className="py-3 font-semibold text-black">
                  {a.performance}
                </td>
                <td className="py-3">
                  <MoreVertical size={16} className="text-(--light-text)" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        activePage={activePage}
        totalPages={TOTAL_PAGES}
        onPageChange={setActivePage}
        pageNumbers={PAGE_NUMBERS}
      />
    </div>
  );
};

export default AllAutomationsView;
