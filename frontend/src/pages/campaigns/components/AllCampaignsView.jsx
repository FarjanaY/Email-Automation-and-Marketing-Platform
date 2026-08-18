//External Imports
import React, { useState } from "react";
import { MoreVertical, Search, SlidersHorizontal } from "lucide-react";

//Internal Imports
import ExportDropdown from "../../../components/common/ExportDropdown";
import Pagination from "../../../components/common/Pagination";

const CAMPAIGNS = [
  { name: "Spring Sale Launch", status: "Sent", sent: "2,450", opens: "1,089" },
  { name: "Weekly Newsletter", status: "Draft", sent: "-", opens: "-" },
  {
    name: "Abandoned Cart Reminder",
    status: "Sent",
    sent: "1,204",
    opens: "612",
  },
  { name: "Product Update", status: "Sent", sent: "3,120", opens: "1,540" },
  { name: "Holiday Promotion", status: "Draft", sent: "-", opens: "-" },
];

const STATUS_STYLES = {
  Sent: "bg-green-100 text-green-700",
  Draft: "bg-gray-100 text-gray-500",
};

const SORT_OPTIONS = ["All", "Draft", "Sent"];
const TOTAL_PAGES = 8;
const PAGE_NUMBERS = [1, 2, 3, 4, 5];

const AllCampaignsView = () => {
  const [activeSort, setActiveSort] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [activePage, setActivePage] = useState(1);

  const campaigns = CAMPAIGNS.filter((c) => {
    const matchesSort = activeSort === "All" || c.status === activeSort;
    const matchesSearch = c.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSort && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-y-4 p-4 md:p-6">
      <div
        className="flex flex-col items-start justify-between gap-y-3
        sm:flex-row sm:items-center"
      >
        <p className="text-xl font-bold text-black md:text-2xl">
          All Campaigns
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-(--light-text)"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Campaigns..."
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

      <div className="flex items-center  gap-x-1 rounded-md bg-white p-1 w-fit">
        {SORT_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setActiveSort(option)}
            className={`rounded-md px-4 py-1.5 text-sm font-semibold cursor-pointer transition-colors ${
              activeSort === option
                ? "bg-(--link-color) text-white hover:bg-orange-700/90"
                : "text-(--text-color) hover:bg-(--card-body-bg) hover:text-black"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-md border border-gray-200 bg-white p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-bold text-(--light-text)">
              <th className="pb-2 font-normal">Campaign</th>
              <th className="pb-2 font-normal">Status</th>
              <th className="pb-2 font-normal">Sent</th>
              <th className="pb-2 font-normal">Opens</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr
                key={c.name}
                className="border-t border-(--text-color)/10 text-xs xl:text-sm"
              >
                <td className="py-3 whitespace-nowrap text-(--card-heading-color)">
                  {c.name}
                </td>
                <td className="py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_STYLES[c.status]}`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="py-3 text-(--text-color)">{c.sent}</td>
                <td className="py-3 text-(--text-color)">{c.opens}</td>
                <td className="py-3 text-right">
                  <MoreVertical
                    size={14}
                    className="inline text-(--light-text)"
                  />
                </td>
              </tr>
            ))}
            {campaigns.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-6 text-center text-(--light-text)"
                >
                  No campaigns found.
                </td>
              </tr>
            )}
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

export default AllCampaignsView;
