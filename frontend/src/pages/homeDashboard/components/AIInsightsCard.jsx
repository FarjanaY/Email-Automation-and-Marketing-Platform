//External Imports
import React from "react";
import { Clock, PenLine, Sparkles, ArrowUpRight } from "lucide-react";

//Internal Imports

const INSIGHTS = [
  {
    icon: Clock,
    title: "Best Send Time",
    description:
      "Tuesday at 10 AM shows the highest open rates for your audience.",
  },
  {
    icon: PenLine,
    title: "Subject Line Tip",
    description:
      "Adding personalization to subject lines can lift opens by 15%.",
  },
];

const AIInsightsCard = ({ insights = INSIGHTS }) => (
  <div
    className="flex h-full w-full flex-col justify-between rounded-md
    border border-gray-200 bg-white p-4 hover:dropdown-menu-box-shadow"
  >
    <p className="flex items-center gap-x-1.5 font-semibold text-(--card-heading-color)">
      <Sparkles size={16} className="text-(--link-color)" />
      AI Insights
    </p>

    <div className="flex flex-1 flex-col justify-center gap-y-3 py-3">
      {insights.map(({ icon: Icon, title, description }) => (
        <div key={title} className="flex items-start gap-x-2">
          <Icon size={14} className="mt-0.5 shrink-0 text-(--link-color)" />
          <div className="flex w-full flex-col justify-start">
            <p className="font-semibold text-(--card-heading-color) text-[13px] ">
              {title}
            </p>
            <span className="text-xs text-(--light-text) font-medium ">
              {description}
            </span>
          </div>
        </div>
      ))}
    </div>

    <button
      type="button"
      className="mt-4 flex w-full items-center justify-center gap-x-1
      rounded-4xl border border-gray-200 py-2 text-xs font-semibold
      text-(--card-heading-color) cursor-pointer hover:bg-(--card-body-bg)"
    >
      Open AI Assistant
      <ArrowUpRight size={12} />
    </button>
  </div>
);

export default AIInsightsCard;
