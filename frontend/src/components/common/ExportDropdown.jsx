//External Imports
import React, { useEffect, useRef, useState } from "react";
import { Download, ChevronDown } from "lucide-react";

//Internal Imports

const FORMATS = ["CSV", "PDF"];

const ExportDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-x-1.5 rounded-md border
        border-gray-200 text-white px-4 py-2 text-sm font-semibold
         cursor-pointer bg-(--other-blue) hover:bg-(--other-blue)/90"
      >
        <Download size={14} />
        Export
        <ChevronDown
          size={13}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul
          className="absolute right-0 top-[calc(100%+4px)] z-20 w-32
          rounded-md border border-gray-200 bg-white p-1 dropdown-menu-box-shadow"
        >
          {FORMATS.map((format) => (
            <li key={format}>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full rounded-md px-2.5 py-1.5 text-left text-sm
                text-(--text-color) cursor-pointer hover:bg-(--link-color)/10 hover:text-(--link-color)"
              >
                Export as {format}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExportDropdown;
