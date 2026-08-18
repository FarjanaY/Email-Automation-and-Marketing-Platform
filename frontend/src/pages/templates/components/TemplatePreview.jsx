//External Imports
import React, { useState } from "react";
import { X, ImageOff } from "lucide-react";

//Internal Imports

const ImageBlock = ({ url }) => {
  const [failed, setFailed] = useState(false);

  return (
    <div>
      <div
        className="relative rounded-md border-2 
      border-(--link-color) p-1"
      >
        {failed ? (
          <div
            className="flex w-full aspect-video items-center
           justify-center rounded-md bg-gray-100
           text-(--light-text)"
          >
            <ImageOff size={28} />
          </div>
        ) : (
          <img
            src={url}
            alt=""
            className="w-full aspect-video rounded-md object-cover"
            onError={() => setFailed(true)}
          />
        )}
        <button
          type="button"
          aria-label="Remove image"
          className="absolute -right-2 -top-2 flex h-6 w-6 items-center
          justify-center rounded-full bg-red-500 text-white shadow
          cursor-pointer hover:bg-red-600"
        >
          <X size={14} strokeWidth={3} />
        </button>
      </div>
      <div className="mt-2 truncate rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-(--light-text)">
        {url}
      </div>
    </div>
  );
};

const SubjectField = ({ subject }) => {
  const [value, setValue] = useState(subject);

  return (
    <>
      <span className="block text-xs text-(--light-text)">Subject</span>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Email Subject Line"
        className="w-full border-none p-0 text-lg font-semibold
        text-(--card-heading-color) outline-none placeholder:text-(--light-text)"
      />
      <span className="block text-xs text-(--light-text)">Preview text...</span>
    </>
  );
};

//Matches the reference mockup exactly: editable subject, body copy,
//a "selected" image block with its delete affordance + URL readout, and
//a button block with its editable text/href fields shown beneath it
const RichTemplateBody = ({ template, blocks }) => (
  <>
    <SubjectField subject={template.subject} />

    <div className="my-3 border-t border-gray-100" />

    <div className="flex flex-col gap-y-4 text-sm text-(--card-heading-color)">
      <p>{blocks.paragraphs[0]}</p>
      <ImageBlock url={blocks.image.url} />
      <p>{blocks.paragraphs[1]}</p>

      <div className="flex justify-center py-1">
        <button
          type="button"
          className="rounded-full bg-(--link-color) px-6 py-2.5
          text-sm font-semibold text-white cursor-pointer hover:bg-orange-700/90"
        >
          {blocks.button.text}
        </button>
      </div>

      <div className="flex flex-col gap-y-2">
        <div className="rounded-md border border-gray-200 px-3 py-2 text-sm text-(--text-color)">
          {blocks.button.text}
        </div>
        <div className="truncate rounded-md border border-gray-200 px-3 py-2 text-sm text-(--text-color)">
          {blocks.button.href}
        </div>
      </div>
    </div>
  </>
);

const SimpleTemplateBody = ({ template }) => {
  const Icon = template.icon;
  return (
    <>
      <SubjectField subject={template.subject} />

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
    </>
  );
};

const TemplatePreview = ({ template }) => (
  <div
    className="min-w-0 rounded-md border border-gray-200 bg-(--card-body-bg)
    p-4 sm:p-8"
  >
    <div className="mx-auto max-w-3xl rounded-md bg-white p-4 sm:p-6">
      {template.blocks ? (
        <RichTemplateBody
          key={template.key}
          template={template}
          blocks={template.blocks}
        />
      ) : (
        <SimpleTemplateBody key={template.key} template={template} />
      )}

      <div className="mt-4 border-t border-gray-100 pt-4 text-center">
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

export default TemplatePreview;
