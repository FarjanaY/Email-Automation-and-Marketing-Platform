//External Imports
import React, { useState } from "react";
import { Eye, Save, Send } from "lucide-react";

//Internal Imports
import AutomationBuilderPanel from "./AutomationBuilderPanel";
import EmailCanvas from "./EmailCanvas";
import PropertiesPanel from "./PropertiesPanel";

const CampaignBuilderView = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  return (
    <div className="flex flex-col gap-y-4 p-4 md:p-6">
      <div
        className="flex flex-col items-start justify-between gap-y-3
      sm:flex-row sm:items-center"
      >
        <div>
          <p className="text-xl font-bold text-black md:text-2xl">
            New Campaign
          </p>
          <span className="text-sm text-(--light-text)">Draft · Not sent</span>
        </div>

        <div className="flex items-center gap-x-2">
          <button
            type="button"
            className="flex items-center gap-x-1.5 rounded-full border
          border-gray-200 bg-white px-4 py-2 text-sm font-semibold
          text-(--card-heading-color) cursor-pointer hover:bg-(--card-body-bg)"
          >
            <Eye size={14} />
            Preview
          </button>
          <button
            type="button"
            className="flex items-center gap-x-1.5 rounded-full border
          border-gray-200 bg-white px-4 py-2 text-sm font-semibold
          text-(--card-heading-color) cursor-pointer hover:bg-(--card-body-bg)"
          >
            <Save size={14} />
            Save Draft
          </button>
          <button
            type="button"
            className="flex items-center gap-x-1.5 rounded-full
          bg-(--link-color) px-4 py-2 text-sm font-semibold text-white
          cursor-pointer hover:bg-orange-700/90"
          >
            <Send size={14} />
            Send Campaign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[240px_1.5fr]">
        <AutomationBuilderPanel onSelectTemplate={setSelectedTemplate} />
        <div className="flex flex-col gap-y-4 lg:grid xl:grid-cols-[1.5fr_1fr] lg:gap-x-4">
          <EmailCanvas template={selectedTemplate} />
          <PropertiesPanel />
        </div>
      </div>
    </div>
  );
};

export default CampaignBuilderView;
