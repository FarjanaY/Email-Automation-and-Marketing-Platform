//External Imports
import React from "react";

//Internal Imports

const OptionBasedField = ({ field, value, onChange, readOnly = false }) => {
  switch (field.fieldType) {
    case "Single Choice":
      return (
        <div className="flex flex-col gap-y-2">
          {field.options?.map((option) => {
            return (
              <label
                key={option}
                className="flex items-center gap-x-2 text-sm text-(--text-color)"
              >
                <input
                  type="radio"
                  name={field.id ?? field.label}
                  value={option}
                  disabled={readOnly}
                  checked={!readOnly && value === option}
                  onChange={
                    readOnly ? undefined : (e) => onChange?.(e.target.value)
                  }
                  className="h-4 w-4 accent-(--link-color)"
                />
                {option}
              </label>
            );
          })}
        </div>
      );

    case "Multiple Choice": {
      const selectedValues = Array.isArray(value) ? value : [];
      return(
        <div className="flex flex-col gap-y-2">
            {field.options?.map((option)=> {return(
                <label key={option}><input type="text" /></label>
            )})}
        </div>
      )
    }
  }
};

export default OptionBasedField;
