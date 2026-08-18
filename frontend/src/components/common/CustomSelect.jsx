//External Imports
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

//Internal Imports
import CustomScrollbar from "./CustomScrollbar";

const CustomSelect = ({ options, value, onChange, placeholder = "Select" }) => {
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
    <div ref={containerRef} className="relative ">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-md
        border border-gray-200 bg-white px-2.5 py-1.5 text-sm
        text-(--text-color) cursor-pointer transition-colors
        dropdown-menu-box-shadow hover:border-(--link-color)
        hover:bg-(--card-body-bg) focus:border-(--link-color)
        focus:outline-none focus:ring-2 focus:ring-(--link-color)/30"
      >
        <span className={value ? "" : "text-(--light-text)"}>
          {value || placeholder}
        </span>
        <ChevronDown
          size={13}
          className={`shrink-0 text-(--light-text) transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute left-0 right-0 top-[calc(100%+4px)] z-20
          rounded-md border border-gray-200 bg-white p-1 dropdown-menu-box-shadow"
        >
          <CustomScrollbar maxHeight={240}>
            <ul className="flex flex-col gap-y-1">
              {options.map((option) => {
                const isSelected = option === value;
                return (
                  <li key={option}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(option);
                        setIsOpen(false);
                      }}
                      className={`flex w-full items-center gap-y-1 justify-between
                      gap-x-2 rounded-md px-2.5 py-1.5  text-sm text-left
                      cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-(--link-color) font-semibold text-white"
                          : "text-(--text-color) hover:bg-(--link-color)/10 hover:text-(--link-color)"
                      }`}
                    >
                      {option}
                      {/* {isSelected && <Check size={13} />} */}
                    </button>
                  </li>
                );
              })}
            </ul>
          </CustomScrollbar>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
