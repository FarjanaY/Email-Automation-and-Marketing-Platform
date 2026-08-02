//External Imports
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

//Internal Imports
import CustomSelect from "../../../components/common/CustomSelect";

const PADDING_OPTIONS = ["0px", "4px", "8px", "16px", "24px", "32px"];

const PropertiesPanel = () => {
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [fontSize, setFontSize] = useState(56);
  const [paddingTop, setPaddingTop] = useState("");
  const [paddingBottom, setPaddingBottom] = useState("");

  return (
    <div
      className="flex h-fit w-full flex-col gap-y-5 rounded-md border
      border-gray-200 bg-white p-4"
    >
      <p className="font-semibold text-(--card-heading-color)">Properties</p>

      <div>
        <p className="mb-2 text-xs font-semibold text-(--light-text)">
          Background Color
        </p>
        <div className="flex items-center gap-x-2">
          <span
            className="h-8 w-8 shrink-0 rounded-md border border-gray-200"
            style={{ backgroundColor: bgColor }}
          />
          <input
            type="text"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-full rounded-md border border-gray-200 px-2.5 py-1.5
            text-sm text-(--text-color) outline-none focus:border-(--link-color)"
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold text-(--light-text)">
          Padding
        </p>
        <div className="grid grid-cols-2 gap-x-2">
          <CustomSelect
            options={PADDING_OPTIONS}
            value={paddingTop}
            onChange={setPaddingTop}
            placeholder="Top"
          />
          <CustomSelect
            options={PADDING_OPTIONS}
            value={paddingBottom}
            onChange={setPaddingBottom}
            placeholder="Bottom"
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold text-(--light-text)">
          Font Size
        </p>
        <div className="flex items-center justify-between rounded-md border border-gray-200 px-2.5 py-1.5">
          <span className="text-sm text-(--text-color)">{fontSize}</span>
          <div className="flex flex-col">
            <button
              type="button"
              aria-label="Increase font size"
              onClick={() => setFontSize((v) => v + 1)}
              className="cursor-pointer text-(--light-text) hover:text-(--card-heading-color)"
            >
              <ChevronUp size={13} />
            </button>
            <button
              type="button"
              aria-label="Decrease font size"
              onClick={() => setFontSize((v) => Math.max(0, v - 1))}
              className="cursor-pointer text-(--light-text) hover:text-(--card-heading-color)"
            >
              <ChevronDown size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;
