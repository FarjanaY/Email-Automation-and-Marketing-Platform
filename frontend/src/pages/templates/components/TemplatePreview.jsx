//External Imports
import React from "react";

//Internal Imports

const TemplatePreview = ({ template }) => {
  const Icon = template.icon;

  return (
    <div
      className="rounded-md border border-gray-200 bg-(--card-body-bg)
      p-4 sm:p-8"
    >
      <div className="mx-auto max-w-lg rounded-md bg-white p-4 sm:p-6">
        <span className="block text-xs text-(--light-text)">Subject</span>
        <p className="mb-4 font-semibold text-(--card-heading-color)">
          {template.subject}
        </p>

        <div className="flex flex-col items-center gap-y-3 rounded-md py-10 text-center sm:py-14">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-(--link-color)/10">
            <Icon size={26} className="text-(--link-color)" />
          </span>
          <p className="text-lg font-bold text-(--card-heading-color)">
            {template.heading}
          </p>
          <span className="max-w-sm text-sm text-(--light-text)">
            {template.body}
          </span>
          <button
            type="button"
            className="mt-2 rounded-full bg-(--link-color) px-5 py-2
            text-sm font-semibold text-white cursor-pointer hover:bg-orange-700/90"
          >
            {template.cta}
          </button>
        </div>

        <div className="border-t border-gray-100 pt-4 text-center">
          <p className="text-xs text-(--light-text)">
            © 2026 Your Company. All rights reserved.
          </p>
          <span className="text-xs text-(--light-text)">
            Unsubscribe | Update Preferences
          </span>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;
