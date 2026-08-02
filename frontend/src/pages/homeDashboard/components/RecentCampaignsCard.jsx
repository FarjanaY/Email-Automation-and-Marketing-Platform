//External Imports
import React from "react";
import { MoreVertical } from "lucide-react";

//Internal Imports

const CAMPAIGNS = [
  {
    name: "Spring Sale Launch",
    status: "Active",
    sent: "2,450",
    opens: "1,089",
  },
  {
    name: "Weekly Newsletter",
    status: "Scheduled",
    sent: "2,450",
    opens: "1,089",
  },
  {
    name: "Abandoned Cart",
    status: "Active",
    sent: "2,450",
    opens: "1,089",
  },
  {
    name: "Product Update",
    status: "Completed",
    sent: "2,450",
    opens: "1,089",
  },
];

const STATUS_STYLES = {
  Active: "bg-green-100 text-green-700",
  Scheduled: "bg-(--link-color)/10 text-(--link-color)",
  Completed: "bg-gray-100 text-gray-500",
};

const RecentCampaignsCard = ({ campaigns = CAMPAIGNS }) => (
  <div
    className="flex h-full w-full flex-col rounded-md border
    border-gray-200 bg-white p-4 hover:dropdown-menu-box-shadow"
  >
    <p className="font-bold text-(--card-heading-color)">Recent Campaigns</p>
    <div className="flex flex-1 flex-col justify-center overflow-x-auto py-3">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs font-bold text-(--light-text)">
            <th className="pb-2 font-semibold">Campaign</th>
            <th className="pb-2 font-semibold">Status</th>
            <th className="pb-2 font-semibold">Sent</th>
            <th className="pb-2 font-semibold">Opens</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c) => (
            <tr
              key={c.name}
              className="border-t border-(--text-color)/10 text-xs text-[13px] font-medium"
            >
              <td className="py-2 whitespace-nowrap text-[13px] font-medium text-(--card-heading-color)">
                {c.name}
              </td>
              <td className="py-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_STYLES[c.status]}`}
                >
                  {c.status}
                </span>
              </td>
              <td className="py-2 text-(--text-color)">{c.sent}</td>
              <td className="py-2 text-(--text-color)">{c.opens}</td>
              <td className="py-2 text-right">
                <MoreVertical
                  size={14}
                  className="inline text-(--light-text)"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default RecentCampaignsCard;
