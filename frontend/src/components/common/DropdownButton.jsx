//External imports
import React, { useState, useEffect, useReducer, useRef } from "react";
import { Download, ChevronDown } from "lucide-react";

//Internal Imports

const DropdownButton = ({
  options = [],
  onSelect,
  label = "Select",
  icon: Icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //Single Button
  if (options.length <= 1) {
    return (
      <button
        type="button"
        onClick={() => {
          onSelect?.(options[0]);
        }}
        className="flex items-center gap-x-1.5 rounded-md border
        border-gray-200 text-white px-4 py-2 text-sm font-semibold
         cursor-pointer bg-(--other-blue) hover:bg-(--other-blue)/90
          dropdown-menu-box-shadow"
      >
        {Icon && <Icon size={14} />}
        {label}
      </button>
    );
  }
  //For multiple dropdown button
  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-x-1.5 rounded-md border
        border-gray-200  px-4 py-2 text-sm font-semibold
         cursor-pointer  bg-( --card-body-bg) hover:bg-(--other-blue)/10 
         text-(--other-blue) dropdown-menu-box-shadow "
      >
        {Icon && <Icon size={14} />}
        {label}
        <ChevronDown
          size={13}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul
          className="absolute right-0 top-[calc(100%+4px)]  
            rounded-md border border-gray-200 bg-white p-1 
            dropdown-menu-box-shadow z-20 w-35"
        >
          {options.map((option) => {
            return (
              <li
                key={option}
                className="flex flex-col justify-center
               items-center text-center"
              >
                <button
                  type="button"
                  onClick={() => {
                    onSelect?.(option);
                    setIsOpen(false);
                  }}
                  className="w-full rounded-md px-2.5 py-1.5 
                    text-(--text-color) cursor-pointer text-sm text-center
                   hover:bg-(--other-blue)/10  hover:text-(--other-blue)"
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DropdownButton;
