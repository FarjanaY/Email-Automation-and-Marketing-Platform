//External Imports
import React from "react";
import { Plus, Trash2 } from "lucide-react";

//Internal Imports

const AutomationNodeCard = ({ icon: Icon, title, subtitle, className = "" }) => (
  <div
    className={`w-full rounded-md border border-gray-200 bg-white
    p-3 dropdown-menu-box-shadow ${className}`}
  >
    <div className="flex items-start justify-between gap-x-2">
      <div className="flex min-w-0 items-center gap-x-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-(--link-color)/10 text-(--link-color)">
          <Icon size={16} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-black">
            {title}
          </p>
          <span className="text-xs text-(--light-text)">{subtitle}</span>
        </div>
      </div>

      {/* Plus (add next step) sits right beside the delete icon */}
      <div className="flex shrink-0 items-center gap-x-1">
        <button
          type="button"
          aria-label="Add next step"
          className="flex h-6 w-6 items-center justify-center rounded-full
          bg-(--link-color) text-white cursor-pointer hover:bg-orange-700/90"
        >
          <Plus size={12} strokeWidth={3} />
        </button>
        <button
          type="button"
          aria-label="Delete step"
          className="flex h-6 w-6 items-center justify-center rounded-full
          text-red-500 cursor-pointer hover:bg-red-50"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  </div>
);

export default AutomationNodeCard;
