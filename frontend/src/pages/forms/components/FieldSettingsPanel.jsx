//External Imports
import React, { useEffect, useState, useRef } from "react";

//Internal Imports
import { FIELD_TYPE_PRESETS } from "./formFieldsData";
import CustomSelect from "../../../components/common/CustomSelect";

const TABS = [
  { key: "field", label: "Field Settings" },
  { key: "form", label: "Form Settings" },
];

const FIELD_TYPE_OPTIONS = [
  "Short Text",
  "Paragraph",
  "Numeric Input",
  "String",
  "Date Picker",
  "Attatchment",
  "Email",
  "Password",
];
const FIELD_SIZE_OPTIONS = ["Small", "Normal", "Large"];

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`relative h-6 w-11 shrink-0 rounded-full 
      transition-colors cursor-pointer ${
      checked ? "bg-(--link-color)" : "bg-gray-200"
    }`}
  >
    <span
      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white 
        shadow transition-transform ${
        checked ? "translate-x-0" : "-translate-x-5"
      }`}
    />
  </button>
);

const FieldSettingsForm = ({ field }) => {
  const [label, setLabel] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [fieldSize, setFieldSize] = useState("");
  const [description, setDescription] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [defaultValue, setDefaultValue] = useState("");
  const [minChars, setMinChars] = useState("");
  const [maxChars, setMaxChars] = useState("");
  const [helpText, setHelpText] = useState("");
  const [cssClass, setCssClass] = useState("");
  const [required, setRequired] = useState(false);
  const [showDescription, setShowDescription] = useState(true);

  const handleFieldTypeChange = (newType) => {
    setFieldType(newType);
    const preset = FIELD_TYPE_PRESETS[newType];
    setLabel(preset?.label ?? label);
    setPlaceholder(preset?.placeholder ?? placeholder);
    setShowDescription(preset?.showDescription ?? true);
  };

  useEffect(() => {
    setLabel(field.label ?? "");
    setFieldType(field.fieldType ?? "String");
    setFieldSize(field.fieldSize ?? "Normal");
    setDescription(field.description ?? "");
    setPlaceholder(field.placeholder ?? "");
    setDefaultValue(field.defaultValue ?? "");
    setMinChars(field.minChars ?? "");
    setMaxChars(field.maxChars ?? "");
    setHelpText(field.helpText ?? "");
    setCssClass(field.cssClass ?? "");
    setRequired(Boolean(field.required));
    setShowDescription(
      FIELD_TYPE_PRESETS[field.fieldType]?.showDescription ?? true,
    );
  }, [field]);

  const inputClass =
    `w-full rounded-md border border-gray-200 px-3 py-2 
    text-sm text-(--text-color) outline-none focus:border-(--link-color)`;

  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <p className="mb-1.5 text-xs font-semibold text-(--light-text)">
          Field Label
        </p>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-x-2">
        <div>
          <p className="mb-1.5 text-xs font-semibold text-(--light-text)">
            Field Type
          </p>
          <CustomSelect
            options={FIELD_TYPE_OPTIONS}
            value={fieldType}
            onChange={handleFieldTypeChange}
          />
        </div>
        <div>
          <p className="mb-1.5 text-xs font-semibold text-(--light-text)">
            Field Size
          </p>
          <CustomSelect
            options={FIELD_SIZE_OPTIONS}
            value={fieldSize}
            onChange={setFieldSize}
          />
        </div>
      </div>

      {showDescription && (
        <div>
          <p className="mb-1.5 text-xs font-semibold text-(--light-text)">
            Description
          </p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a brief field description"
            rows={2}
            className={`resize-none ${inputClass}`}
          />
        </div>
      )}

      <div>
        <p className="mb-1.5 text-xs font-semibold text-(--light-text)">
          Placeholder Text
        </p>
        <input
          type="text"
          value={placeholder}
          onChange={(e) => setPlaceholder(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <p className="mb-1.5 text-xs font-semibold text-(--light-text)">
          Default Value
        </p>
        <input
          type="text"
          value={defaultValue}
          onChange={(e) => setDefaultValue(e.target.value)}
          placeholder="Enter a default value"
          className={inputClass}
        />
      </div>

      <div>
        <p className="mb-1.5 text-xs font-semibold text-(--light-text)">
          Min &amp; Max Range Characters
        </p>
        <div className="flex items-center gap-x-2">
          <input
            type="number"
            value={minChars}
            onChange={(e) => setMinChars(e.target.value)}
            className="w-full rounded-md border border-gray-200 px-3 py-1
            text-sm text-(--text-color) outline-none focus:border-(--link-color)"
          />
          <span className="text-(--light-text)">-</span>
          <input
            type="number"
            value={maxChars}
            onChange={(e) => setMaxChars(e.target.value)}
            className="w-full rounded-md border border-gray-200 px-3 py-1
            text-sm text-(--text-color) outline-none focus:border-(--link-color)"
          />
        </div>
      </div>

      <div>
        <p className="mb-1.5 text-xs font-semibold text-(--light-text)">
          Help Text
        </p>
        <textarea
          value={helpText}
          onChange={(e) => setHelpText(e.target.value)}
          placeholder="Give users a helpful tip"
          rows={2}
          className={`resize-none ${inputClass}`}
        />
      </div>

      <div>
        <p className="mb-1.5 text-xs font-semibold text-(--light-text)">
          Custom CSS Class
        </p>
        <input
          type="text"
          value={cssClass}
          onChange={(e) => setCssClass(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-(--light-text)">
          Required Field
        </p>
        <Toggle checked={required} onChange={setRequired} />
      </div>
    </div>
  );
};

const FormSettingsForm = ({
  formTitle,
  onFormTitleChange,
  formDescription,
  onFormDescriptionChange,
  focusSignal,
}) => {
  const descriptionRef = useRef();
  useEffect(() => {
    if (focusSignal) descriptionRef.current?.focus();
  }, [focusSignal]);

  const inputClass =
    `w-full rounded-md border border-gray-200 px-3 py-2 text-sm 
    text-(--text-color) outline-none focus:border-(--link-color)`;

  return (
    <div className="flex flex-col gap-y-4 ">
      <div>
        <p className="mb-1.5 text-xs font-semibold text-(--light-text)">
          Form Title
        </p>
        <input
          type="text"
          value={formTitle}
          onChange={(e) => {
            onFormTitleChange(e.target.value);
          }}
          className={inputClass}
        />
      </div>
      <div>
        <p className="mb-1.5 text-xs font-semibold text-(--light-text)">
          Form Description
        </p>
        <textarea
          value={formDescription}
          onChange={(e) => {
            onFormDescriptionChange(e.target.value);
          }}
          rows={3}
          className={`resize-none ${inputClass}`}
        />
      </div>
    </div>
  );
};

const FieldSettingsPanel = ({
  selectedField,
  activeTab,
  onTabChange,
  formTitle,
  onFormTitleChange,
  formDescription,
  onFormDescriptionChange,
  descriptionFocusSignal,
}) => {
  return (
    <div
      className="flex h-fit w-full flex-col rounded-md border
      border-gray-200 bg-white  justify-center  p-4"
    >
      <div className="mb-4 flex items-center gap-x-1 
      rounded-md bg-(--card-body-bg)
        w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={`rounded-md px-3 py-2 text-xs font-semibold 
              cursor-pointer transition-colors ${
              activeTab === tab.key
                ? "bg-(--link-color) text-white hover:bg-orange-700/90"
                : "text-(--text-color) hover:bg-(--card-body-bg) hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "field" && selectedField ? (
        <FieldSettingsForm key={selectedField.id} field={selectedField} />
      ) : activeTab === "field" ? (
        <p className="text-sm text-(--light-text)">
          Select a field on the canvas to edit its settings.
        </p>
      ) : (
        <FormSettingsForm
          formTitle={formTitle}
          onFormTitleChange={onFormTitleChange}
          formDescription={formDescription}
          onFormDescriptionChange={onFormDescriptionChange}
          focusSignal={descriptionFocusSignal}
        />
      )}
    </div>
  );
};

export default FieldSettingsPanel;
