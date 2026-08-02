//External Imports
import React from "react";
import {
  UserPlus,
  MailOpen,
  MousePointerClick,
  ShoppingCart,
  Tag,
  Send,
  XCircle,
  GitBranch,
  Clock,
} from "lucide-react";

//Internal Imports

const TRIGGERS = [
  { icon: UserPlus, label: "User subscribes" },
  { icon: MailOpen, label: "Opens email" },
  { icon: MousePointerClick, label: "Clicks link" },
  { icon: ShoppingCart, label: "Makes purchase" },
  { icon: Tag, label: "Tag added" },
];

const ACTIONS = [
  { icon: Send, label: "Send email" },
  { icon: Tag, label: "Add tag" },
  { icon: XCircle, label: "Remove tag" },
];

const LOGIC = [
  { icon: GitBranch, label: "If/Else condition" },
  { icon: Clock, label: "Wait/Delay" },
];

const Section = ({ title, items }) => (
  <div className="mb-5">
    <p className="mb-2  text-xs font-semibold text-(--light-text)">{title}</p>
    <div className="flex flex-col gap-y-1.5 ">
      {items.map(({ icon: Icon, label }) => (
        <button
          key={label}
          type="button"
          className="flex items-center gap-x-2.5 rounded-md border
          border-gray-200 px-2.5 py-2 text-left text-sm font-medium 
          text-(--card-heading-color) bg-white dropdown-menu-box-shadow 
          cursor-grab hover:text-black hover:font-semibold"
        >
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center
           rounded-md bg-(--link-color)/10  text-(--link-color) 
           "
          >
            <Icon size={14} />
          </span>
          {label}
        </button>
      ))}
    </div>
  </div>
);

const AutomationBuilderSidebar = () => (
  <div
    className="flex h-fit w-full flex-col rounded-md border
    border-gray-200 bg-white p-4"
  >
    <p className="font-semibold text-(--card-heading-color)">
      Automation Builder
    </p>
    <span className="mb-4 text-xs text-(--light-text)">
      Drag and drop to build your workflow
    </span>

    <Section title="Triggers" items={TRIGGERS} />
    <Section title="Actions" items={ACTIONS} />
    <Section title="Logic" items={LOGIC} />
  </div>
);

export default AutomationBuilderSidebar;
