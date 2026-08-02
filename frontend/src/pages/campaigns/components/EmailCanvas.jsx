//External Imports
import React, { useState } from "react";
import { Mail, Plus } from "lucide-react";

//Internal Imports

const EmailCanvas = () => {
  const [subject, setSubject] = useState("");

  return (
    <div
      className="flex h-fit w-full flex-col rounded-md border
      border-gray-200 bg-(--card-body-bg) p-4 sm:p-8"
    >
      <div className="rounded-md bg-white p-4 sm:p-6">
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Email Subject Line"
          className="w-full border-none text-lg font-semibold
          text-(--card-heading-color) outline-none placeholder:text-(--light-text)"
        />
        <span className="block text-xs text-(--light-text)">
          Preview text...
        </span>

        <div
          className="mt-6 flex flex-col items-center justify-center gap-y-3
          rounded-md py-14 text-center sm:py-20"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-(--link-color)/10">
            <Mail size={26} className="text-(--link-color)" />
          </span>
          <p className="font-semibold text-(--card-heading-color)">
            Start building your email
          </p>
          <span className="max-w-xs text-sm text-(--light-text)">
            Click on content blocks from the left sidebar to add them here
          </span>
          <button
            type="button"
            className="mt-2 flex items-center gap-x-1.5 rounded-full
            bg-(--link-color) px-4 py-2 text-sm font-semibold text-white
            cursor-pointer hover:bg-orange-700/90"
          >
            <Plus size={14} strokeWidth={2.5} />
            Add Your First Block
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

export default EmailCanvas;
