import { Check } from "lucide-react";
import React, { useState } from "react";

const SelectableCardsGrid = ({
  icon: HeaderIcon,
  title,
  description,
  items,
  multiple = true,
  confirmLabel = "Add Selected",
  onConfirm,
  gridClassName = "grid w-full grid-cols-2 gap-3 sm:grid-cols-3",
}) => {
  const [selectedKeys, setSelectedKeys] = useState([]);

  const handleCardClick = (key) => {
    if (!multiple) {
      const item = items.find((i) => i.key === key);
      onConfirm?.(item);
      return;
    }
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const handleConfirmMultiple = () => {
    const selectedItems = items.filter((item) =>
      selectedKeys.includes(item.key),
    );
    onConfirm?.(selectedItems);
    setSelectedKeys([]);
  };
  return (
    <div className="flex flex-col items-center gap-y-4 py-10 text-center">
      {HeaderIcon && (
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-(--light-text)">
          <HeaderIcon size={20} />
        </span>
      )}
      {(title || description) && (
        <div>
          {title && (
            <p className="font-semibold text-(--card-heading-color)">{title}</p>
          )}
          {description && (
            <span className="text-sm text-(--light-text)">{description}</span>
          )}
        </div>
      )}

      <div className={gridClassName}>
        {items.map((item) => {
          const isSelected = selectedKeys.includes(item.key);
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => handleCardClick(item.key)}
              className={`relative flex flex-col items-center gap-y-2 
               px-3 py-4 text-xs font-medium rounded-md 
               cursor-pointer border 
               ${
                 isSelected
                   ? "border-(--link-color)/20 dropdown-menu-box-shadow font-bold!"
                   : ` border-gray-200 bg-white text-(--card-heading-color) 
                   hover:dropdown-menu-box-shadow  hover:font-bold `
               }
              
              `}
            >
              {multiple && isSelected && (
                <Check
                  size={12}
                  strokeWidth={3}
                  className={`absolute top-2 right-2 ${isSelected ? "text-(--link-color)" : ""}`}
                />
              )}
              {item.icon && (
                <item.icon
                  size={18}
                  className={
                    isSelected ? "text-(--link-color)" : "text-(--link-color)"
                  }
                />
              )}
              {item.cardLabel}
            </button>
          );
        })}
      </div>

      {multiple && selectedKeys.length > 0 && (
        <button
          type="button"
          onClick={handleConfirmMultiple}
          className="mt-2 rounded-full bg-(--link-color) px-5 
          font-semibold text-white cursor-pointer py-2 
          hover:bg-orange-700/90 text-sm "
        >
          {confirmLabel} ({selectedKeys.length}) item
          {selectedKeys.length > 1 ? "s" : ""}
        </button>
      )}
    </div>
  );
};

export default SelectableCardsGrid;
