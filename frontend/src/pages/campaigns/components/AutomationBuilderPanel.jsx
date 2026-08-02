//External Imports
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Type,
  Image as ImageIcon,
  Plus,
  Minus,
  Columns3,
  MoveVertical,
} from "lucide-react";

//Internal Imports

const CONTENT_BLOCKS = [
  { icon: Type, label: "Text", color: "#2563eb", bg: "#eff6ff" },
  { icon: ImageIcon, label: "Image", color: "#16a34a", bg: "#f0fdf4" },
  { icon: Plus, label: "Button", color: "#7c3aed", bg: "#f5f3ff" },
  { icon: Minus, label: "Divider", color: "#db5825", bg: "#fff7ed" },
  { icon: Columns3, label: "Columns", color: "#0891b2", bg: "#ecfeff" },
  { icon: MoveVertical, label: "Spacer", color: "#6b7280", bg: "#f3f4f6" },
];

const TEMPLATES = ["Welcome Email", "Newsletter", "Promotional"];

const AutomationBuilderPanel = () => {
  const navigate = useNavigate();

  return (
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

      <p className="mb-2 text-xs font-semibold uppercase text-(--light-text)">
        Content Blocks
      </p>
      <div className="mb-5 flex flex-col gap-y-1">
        {CONTENT_BLOCKS.map(({ icon: Icon, label, color, bg }) => (
          <button
            key={label}
            type="button"
            className="flex items-center gap-x-2.5 rounded-md px-2 py-2
            text-left text-sm font-medium text-(--text-color)
            cursor-grab hover:bg-(--card-body-bg)"
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
              style={{ backgroundColor: bg, color }}
            >
              <Icon size={14} />
            </span>
            {label}
          </button>
        ))}
      </div>

      <p className="mb-2 text-xs font-semibold uppercase text-(--light-text)">
        Templates
      </p>
      <div className="flex flex-col gap-y-2">
        {TEMPLATES.map((template) => (
          <button
            key={template}
            type="button"
            onClick={() => navigate("/templates")}
            className="rounded-md border border-gray-200 px-3 py-2
            text-left text-sm font-medium text-(--card-heading-color)
            cursor-pointer hover:bg-(--card-body-bg)"
          >
            {template}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AutomationBuilderPanel;
