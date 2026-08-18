//External Imports
import React from "react";

//Internal Imports

const SIMPLE_INPUT_TYPES = {
  "Short Text": "text",
  String: "text",
  "Numeric Input": "number",
  "Date Picker": "date",
  Email: "email",
  Password: "password",
  Attatchment: "file",
};

const inputClass = `w-full rounded-md border border-gray-200 px-2 h-7
text-sm text-(--text-color) outline-none focus:border-(--link-color) 
 `;

const renderField = (field, value, onChange) => {
  switch (field.fieldType) {
    case "Paragraph":
      return (
        <textarea
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={3}
          className={`resize-none ${inputClass} `}
        />
      );

    //Multiple and single data selection data must be array.
    case "Single Choice": //radio button — single option select
      return (
        <div className="flex flex-col gap-y-2">
          {field.options?.map((option) => {
            return (
              <label
                key={option}
                className="flex items-center gap-x-2 
              text-sm text-(--text-color)"
              >
                <input
                  type="radio"
                  name={field.id ?? field.label}
                  value={option}
                  checked={value === option}
                  onChange={(e) => onChange(e.target.value)}
                  className="h-4 w-4 accent-(--link-color)"
                />
                {option}
              </label>
            );
          })}
        </div>
      );

    case "Multiple Choice": //Select multiple options
      return (
        <div className="flex flex-col gap-y-2">
          {field.options?.map((option) => {
            const selectedValues = Array.isArray(value) ? value : [];
            const isChecked = selectedValues.includes(option);
            return (
              <label
                key={option}
                className="flex items-center gap-x-2 
                 text-sm text-(--text-color)"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {
                    const next = isChecked
                      ? selectedValues.filter((v) => v !== option)
                      : [...selectedValues, option];
                    onChange(next);
                  }}
                  className="h-4 w-4 accent-(--link-color)"
                />
                {option}
              </label>
            );
          })}
        </div>
      );
    case "Agree":
      return (
        <label
          className="flex items-center gap-x-2 
          text-sm text-(--text-color)"
        >
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
            className="h-4 w-4 accent-(--link-color)"
          />
          {field.placeholder || field.label}
        </label>
      );

    default:
      return (
        <input
          type={SIMPLE_INPUT_TYPES[field.fieldType] ?? "text"}
          {...(field.fieldType === "Attatchment" ? {} : { value: value ?? "" })}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={inputClass}
        />
      );
  }
};

const DynamicForm = ({
  title,
  description,
  fields = [],
  values = [],
  onChange,
  actionLabel = "Submit",
  onAction,
}) => {
  return (
    <div
      className="flex w-full max-w-lg flex-col rounded-md 
     bg-white px-6 pb-8 pt-8 dropdown-menu-box-shadow lg:px-10 lg:py-14"
    >
      {(title || description) && (
        <div className="mb-6 text-center">
          {title && (
            <p className="text-xl font-bold text-(--card-heading-color)">
              {title}
            </p>
          )}
          {description && (
            <span className="mt-1 block text-sm text-(--text-color)">
              {description}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-col gap-y-4 ">
        {fields.map((field) => {
          const key = field.id ?? field.label;
          const value = values[key];
          const handleChange = (v) => onChange?.(key, v);

          if (field.fieldType === "Agree") {
            return (
              <div key={key}>{renderField(field, value, handleChange)}</div>
            );
          }

          return (
            <div key={key}>
              <label
                className="mb-1.5 block text-sm font-medium 
                text-(--card-heading-color) "
              >
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>

              {/* Date picker format hint */}
              {field.fieldType === "Date Picker" && field.placeholder && (
                <span className="mb-1 block text-xs text-(--light-text) ">
                  Format : {field.placeholder}
                </span>
              )}
              {renderField(field, value, handleChange)}
            </div>
          );
        })}
      </div>

      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 w-full rounded-sm bg-(--link-color) py-2.5
        text-sm font-semibold text-white dropdown-menu-box-shadow
        cursor-pointer hover:bg-orange-700/90"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default DynamicForm;
