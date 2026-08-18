//External Imports
import React, { useState, useEffect } from "react";
import { Mail, Plus, X } from "lucide-react";

//Internal Imports

const EmailCanvas = ({ template }) => {
  const [subject, setSubject] = useState("");
  const [paragraphs, setParagraphs] = useState(["", ""]);
  const [buttonText, setButtonText] = useState("");
  const [buttonHref, setButtonHref] = useState("");

  useEffect(() => {
    if (!template) return;
    setSubject(template?.subject ?? "");
    setParagraphs(template?.blocks?.paragraphs ?? ["", ""]);
    setButtonText(template?.blocks?.button?.text ?? "");
    setButtonHref(template?.blocks?.button?.href ?? "");
  }, [template]);

  return (
    <div
      className="flex h-fit w-full justify-center flex-col rounded-md border
      border-gray-200 bg-(--card-body-bg) p-4 xl:p-8 "
    >
      <div className="rounded-md bg-white p-4 xl:p-6">
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Email Subject Line"
          className="w-full border-none text-lg font-semibold
          text-(--card-heading-color) outline-none 
          placeholder:text-(--light-text)"
        />
        <span className="block text-xs text-(--light-text)">
          Preview text...
        </span>

        {template ? (
          <div
            className=" mt-4 flex flex-col gap-y-3 
          text-sm text-(--card-heading-color)"
          >
            <textarea
              value={paragraphs[0]}
              onChange={(e) => setParagraphs([e.target.value, paragraphs[1]])}
              name=""
              id=""
              // autoFocus
              className="bg-white w-full resize-none border-none outline-none focus:auto"
              rows={2}
            />
            {template.blocks?.image && (
              <img
                src={template.blocks?.image?.url}
                alt=""
                className="w-full aspect-video rounded-md object-cover"
              />
            )}
            <textarea
              value={paragraphs[1]}
              onChange={(e) => setParagraphs([paragraphs[0], e.target.value])}
              name=""
              id=""
              // autoFocus
              className="bg-white w-full resize-none border-none outline-none focus:auto"
              rows={2}
            />
            <div className="flex justify-center py-1">
              <button
                className="rounded-full bg-(--link-color) 
              px-6 py-2.5 text-sm font-semibold text-white"
              >
                {buttonText}
              </button>
            </div>
            <input
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              type="text"
              className="rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-(--link-color)"
            />
            <input
              value={buttonHref}
              onChange={(e) => setButtonHref(e.target.value)}
              type="text"
              className="rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-(--link-color)"
            />
          </div>
        ) : (
          <div
            className="mt-3 flex flex-col items-center 
          justify-center gap-y-3
          rounded-md py-8 text-center sm:py-10"
          >
            <span
              className="flex h-14 w-14 items-center 
          justify-center rounded-full bg-(--link-color)/10"
            >
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
        )}

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
