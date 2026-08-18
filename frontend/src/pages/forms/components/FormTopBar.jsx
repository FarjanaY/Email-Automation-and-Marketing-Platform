//External Imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Hammer, LayoutTemplate, Link2, Edit3, Play } from "lucide-react";

//Internal Imports
import HomeButton from "../../home/components/HomeButton.jsx";
import { showSuccessToast, showErrorToast } from "../../../utils/helper/toast";

const TABS = [
  { key: "build", label: "Build", icon: Hammer },
  {
    key: "template",
    label: "Template",
    icon: LayoutTemplate,
    path: "/forms/templates",
  },
];

const FormTopBar = ({
  shareLink = "https://formora.com/share/job-application",
  onPreview,
}) => {
  const [activeTab, setActiveTab] = useState("build");
  const navigate = useNavigate();

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareLink);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = shareLink;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      showSuccessToast(null, "Link copied!");
    } catch (err) {
      showErrorToast(null, "Couldn't copy the link.");
    }
  };

  return (
    <div
      className="flex flex-col gap-y-3 border-b border-gray-200 bg-white
      px-4 py-3 sm:flex-row sm:items-center sm:justify-between md:px-6"
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {TABS.map(({ key, label, icon: Icon, path }) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setActiveTab(key);
              {
                if (path) {
                  navigate("/forms/templates");
                }
              }
            }}
            className={`flex items-center gap-x-1.5 text-sm font-semibold cursor-pointer ${
              activeTab === key
                ? "text-(--link-color)"
                : "text-(--light-text) hover:text-(--card-heading-color)"
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}

        <span className="hidden text-(--light-text) sm:inline">|</span>

        <div className="flex items-center gap-x-1.5 truncate text-sm text-(--text-color)">
          <span className="text-(--light-text)">Link:</span>
          <span className="max-w-45 truncate sm:max-w-xs">{shareLink}</span>
          <button
            type="button"
            aria-label="Copy link"
            onClick={handleCopyLink}
            // onClick={() => navigator.clipboard.writeText(shareLink)}
            className="cursor-pointer text-(--light-text) hover:text-(--link-color)"
          >
            <Link2 size={13} />
          </button>
        </div>
      </div>

      <div
        className="grid grid-cols-3 w-full sm:grid-cols-2 lg:grid-cols-3  justify-center 
      items-center gap-2 sm:w-fit "
      >
        <HomeButton
          buttonText="Edit"
          className="mx-1.5 bg-white w-full
          hover:text-(--card-heading-color)"
          icon={<Edit3 size={14} />}
        />
        <HomeButton
          type="button"
          buttonText="Preview"
          onclick={onPreview}
          className="mx-1.5 bg-white w-full
          hover:text-(--card-heading-color) "
          icon={<Play size={14} />}
        />
        <HomeButton
          type="button"
          buttonText="Save &amp; Publish"
          className=" mx-1.5 bg-(--link-color) 
          hover:text-(--card-heading-color) w-full
          hover:bg-orange-700/90 text-white shrink-0"
        />
      </div>
    </div>
  );
};

export default FormTopBar;
