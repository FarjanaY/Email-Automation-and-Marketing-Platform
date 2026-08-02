//External Imports
import React, { useState } from "react";
import { Mail, Newspaper, Tag } from "lucide-react";

//Internal Imports
import TemplatesListPanel from "./components/TemplatesListPanel";
import TemplatePreview from "./components/TemplatePreview";

const TEMPLATES = [
  {
    key: "welcome",
    name: "Welcome Email",
    icon: Mail,
    subject: "Welcome to Email Automation & Marketing Platform!",
    heading: "Welcome aboard!",
    body: "We're thrilled to have you. Here's everything you need to get started with your first campaign.",
    cta: "Get Started",
  },
  {
    key: "newsletter",
    name: "Newsletter",
    icon: Newspaper,
    subject: "This Week's Top Picks",
    heading: "Your Weekly Digest",
    body: "Catch up on the latest updates, tips, and stories handpicked just for you.",
    cta: "Read More",
  },
  {
    key: "promotional",
    name: "Promotional",
    icon: Tag,
    subject: "Limited Time Offer Inside",
    heading: "Save 20% Today Only",
    body: "Don't miss out — grab this exclusive discount before it disappears.",
    cta: "Shop Now",
  },
];

const TemplatesPage = () => {
  const [activeKey, setActiveKey] = useState(TEMPLATES[0].key);
  const activeTemplate =
    TEMPLATES.find((t) => t.key === activeKey) || TEMPLATES[0];

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
          templates={TEMPLATES}
          activeKey={activeKey}
          onSelect={setActiveKey}
        />
        <TemplatePreview template={activeTemplate} />
      </div>
    </div>
  );
};

export default TemplatesPage;
