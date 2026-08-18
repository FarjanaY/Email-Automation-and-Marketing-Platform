//External Imports
import React, { useState } from "react";
import { Mail, Newspaper, Tag } from "lucide-react";

//Internal Imports
import TemplatesListPanel from "./components/TemplatesListPanel";
import TemplatePreview from "./components/TemplatePreview";
import { EMAIL_TEMPLATES } from "../../utils/data/emailTemplateData.js";

const TemplatesPage = () => {
  const [activeKey, setActiveKey] = useState(EMAIL_TEMPLATES[0].key);
  const activeTemplate =
    EMAIL_TEMPLATES.find((t) => t.key === activeKey) || EMAIL_TEMPLATES[0];

  return (
    <div className="flex flex-col gap-y-4 bg-(--body-bg) p-4 md:p-6">
      <div>
        <p className="text-xl font-bold text-black md:text-2xl">Templates</p>
        <span className="text-sm text-(--text-color)">
          Preview and choose an email template
        </span>
      </div>

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[240px_1fr]">
        <TemplatesListPanel
          templates={EMAIL_TEMPLATES}
          activeKey={activeKey}
          onSelect={setActiveKey}
        />
        <TemplatePreview template={activeTemplate} />
      </div>
    </div>
  );
};

export default TemplatesPage;
