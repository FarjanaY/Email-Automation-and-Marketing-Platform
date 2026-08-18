import React from "react";

const SidebarBlockSection = ({
  title,
  items,
  gridClassName = "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1",
}) => {
  return (
    <div className="mb-5 ">
      <p className="mb-2 text-xs font-semibold text-(--light-text)">{title}</p>
      <div className={`mb-5  gap-x-2 gap-y-2 ${gridClassName}`}>
        {items.map(({ icon: Icon, label, color, bg, onClick }) => (
          <button
            key={label}
            type="button"
            className="flex items-center gap-x-2.5 rounded-md px-2 py-2
            text-left text-sm font-medium text-(--text-color) border border-gray-100
            cursor-grab hover:bg-white hover:text-black   hover:drop-shadow-md"
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center 
                justify-center rounded-md 
                ${bg ? "" : "border border-gray-200 text-(--text-color)"}`}
              style={bg ? { backgroundColor: bg, color } : undefined}
            >
              <Icon size={14} />
            </span>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SidebarBlockSection;
