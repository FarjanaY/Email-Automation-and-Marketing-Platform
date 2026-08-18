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
import { EMAIL_TEMPLATES } from "../../../utils/data/emailTemplateData";
import SidebarBlockSection from "../../../components/common/SidebarBlockSection";

const CONTENT_BLOCKS = [
  { icon: Type, label: "Text", color: "#2563eb", bg: "#eff6ff" },
  { icon: ImageIcon, label: "Image", color: "#16a34a", bg: "#f0fdf4" },
  { icon: Plus, label: "Button", color: "#7c3aed", bg: "#f5f3ff" },
  { icon: Minus, label: "Divider", color: "#db5825", bg: "#fff7ed" },
  { icon: Columns3, label: "Columns", color: "#0891b2", bg: "#ecfeff" },
  { icon: MoveVertical, label: "Spacer", color: "#6b7280", bg: "#f3f4f6" },
];

const AutomationBuilderPanel = ({ onSelectTemplate }) => {
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

      <SidebarBlockSection title="Content Blocks" items={CONTENT_BLOCKS} />

      <p className="mb-2 text-xs font-semibold uppercase text-(--light-text)">
        Templates
      </p>
      <div className=" grid grid-cols-2 gap-x-2 gap-y-2 md:grid-cols-3 lg:grid-cols-1  ">
        {EMAIL_TEMPLATES.map((template) => (
          <button
            key={template.name}
            type="button"
            onClick={() => onSelectTemplate(template)}
            className="rounded-md px-3 py-2 
            text-left text-sm font-medium text-(--card-heading-color)
            cursor-pointer hover:bg-white shadow-sm/10 drop-shadow-sm"
          >
            {template?.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AutomationBuilderPanel;
