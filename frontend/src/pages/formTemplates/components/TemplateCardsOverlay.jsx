//External Imports
import React, { useState } from "react";
import { X } from "lucide-react";
import { useSelector } from "react-redux";

//Internal Imports
import DynamicForm from "../../../components/common/form/DynamicForm";

const TemplateCardsOverlay = ({ template, onClose, onAddTemplate }) => {
  const { sidebarCollapsed } = useSelector((state) => state.uiR);

  const [values, setValues] = useState({});
  const handleAddTemplate = () => {
    onAddTemplate?.(template);
  };
  return (
    <div
      className={`fixed inset-0 z-999 flex items-center 
     justify-center bg-black/40 p-4 transition-all duration-300
     ease-linear ${sidebarCollapsed ? "lg:pl-0" : "lg:pl-68"}`}
    >
      <div className=" relative w-full max-w-lg">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 cursor-pointer 
                    text-(--card-heading-color) 
                    hover:text-(--link-color) "
        >
          <X size={18} />
        </button>

        <DynamicForm
          title={template.name}
          fields={template.fields}
          values={values}
          onChange={(key, value) =>
            setValues((prev) => ({ ...prev, [key]: value }))
          }
          actionLabel="Add to Form"
          onAction={handleAddTemplate}
        />
      </div>
    </div>
  );
};

export default TemplateCardsOverlay;
