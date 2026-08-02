//External Imports
import React from "react";

//Internal Imports

const TemplatesListPanel = ({ templates, activeKey, onSelect }) => (
  <div
    className="flex h-fit w-full flex-col rounded-md border
    border-gray-200 bg-white p-4"
  >
    <p className="font-semibold text-(--card-heading-color)">Templates</p>
    <span className="mb-4 text-xs text-(--light-text)">
      Choose a template to preview
    </span>

    <div className="flex flex-col gap-y-2">
      {templates.map((template) => {
        const isActive = activeKey === template.key;
        return (
          <button
            key={template.key}
            type="button"
            onClick={() => onSelect(template.key)}
            className={`rounded-md border px-3 py-2 text-left text-sm
            font-medium cursor-pointer transition-colors ${
              isActive
                ? "border-(--link-color) bg-(--link-color)/10 text-(--link-color)"
                : "border-gray-200 text-(--card-heading-color) hover:bg-(--card-body-bg)"
            }`}
          >
            {template.name}
          </button>
        );
      })}
    </div>
  </div>
);

export default TemplatesListPanel;
