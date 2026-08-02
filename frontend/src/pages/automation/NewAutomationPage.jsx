//External Imports
import React from "react";
import { Eye, Save, Play } from "lucide-react";

//Internal Imports
import AutomationBuilderSidebar from "./components/AutomationBuilderSidebar";
import AutomationCanvas from "./components/AutomationCanvas";

const NewAutomationPage = () => (
  <div className="flex flex-col gap-y-4 bg-(--body-bg) p-4 md:p-6">
    <div
      className="flex flex-col items-start justify-between gap-y-3
      sm:flex-row sm:items-center"
    >
      <div>
        <p className="text-xl font-bold text-black md:text-2xl">
          New Automation
        </p>
        <span className="text-sm text-(--light-text)">Draft · Not active</span>
      </div>

      <div className="flex items-center gap-x-2">
        <button
          type="button"
          className="flex items-center gap-x-1.5 rounded-full border
          border-gray-200 bg-white px-4 py-2 text-sm font-semibold
          text-(--card-heading-color) cursor-pointer hover:bg-(--card-body-bg)"
        >
          <Eye size={14} />
          Test
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
          <Play size={14} />
          Activate
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[240px_1fr]">
      <AutomationBuilderSidebar />
      <AutomationCanvas />
    </div>
  </div>
);

export default NewAutomationPage;
