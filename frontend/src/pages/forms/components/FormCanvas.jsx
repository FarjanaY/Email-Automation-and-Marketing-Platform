//External Imports
import React, { useState } from "react";
import {
  MoreVertical,
  Plus,
  Copy,
  Move,
  Settings,
  Trash2,
  HelpCircle,
  MessageSquareText,
  CircleDot,
  Star,
  Phone,
  AlignLeft,
  Upload,
  Check,
  Mail,
  Lock,
  Calendar,
  Hash,
  ListChecks,
} from "lucide-react";

//Internal Imports
import { FIELD_TYPE_PRESETS } from "./formFieldsData";
import { QUICK_ADD_FIELDS } from "../../../utils/data/emailTemplateData.js";
import SelectableCardsGrid from "../../../components/common/form/SelectableCardsGrid.jsx";

const FIELD_TYPE_ICONS = {
  "Short Text": AlignLeft,
  String: AlignLeft,
  Email: Mail,
  Password: Lock,
  "Numeric Input": Hash,
  "Date Picker": Calendar,
  Paragraph: MessageSquareText,
  "Single Choice": CircleDot,
  "Multiple Choice": ListChecks,
  Agree: Check,
  Attatchment: Upload,
};

const FieldToolbar = ({ onOpenSettings }) => {
  return (
    <div
      className="absolute -bottom-4 right-2 flex items-center gap-x-1
    rounded-full border border-gray-200 bg-white p-1 dropdown-menu-box-shadow"
    >
      {[Plus, Copy, Move, Settings, Trash2].map((Icon, i) => (
        <button
          key={i}
          type="button"
          onClick={Icon === Settings ? onOpenSettings : undefined}
          className="flex h-6 w-6 items-center justify-center rounded-full
        text-(--light-text) cursor-pointer hover:bg-(--card-body-bg) hover:text-(--link-color)"
        >
          <Icon size={13} />
        </button>
      ))}
    </div>
  );
};

const DragHandle = ({ position }) => (
  <span
    className={`absolute left-1/2 h-1 w-6 -translate-x-1/2 rounded-full
    bg-(--link-color)/60 ${position === "top" ? "-top-1" : "-bottom-1"}`}
  />
);

const getFieldIcon = (field) => {
  if (field.icon) return field.icon;
  if (field.label?.toLowerCase().includes("phone")) return Phone;
  return FIELD_TYPE_ICONS[field.fieldType] ?? AlignLeft;
};

const FormField = ({ field, isSelected, onSelect, onOpenSettings }) => {
  const Icon = getFieldIcon(field);
  const isTextarea = field.type === "Paragraph" || field.type === "textarea";

  const renderInputPreview = () => {
    switch (field.fieldType) {
      case "Single Choice":
        return <div></div>;
    }
  };

  return (
    <div
      onClick={() => onSelect(field.id)}
      className={`relative cursor-pointer rounded-md p-2 ${
        field.span === "full" ? "sm:col-span-2" : ""
      } ${isSelected ? "border-2 border-dashed border-(--link-color)" : "border-2 border-transparent"}`}
    >
      {isSelected && (
        <>
          <DragHandle position="top" />
        </>
      )}

      <label className="mb-1.5 block text-sm font-medium text-(--card-heading-color)">
        {field.label}
        {field.required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <Icon
          size={15}
          className={`absolute left-3 text-(--light-text) ${
            isTextarea ? "top-3" : "top-1/2 -translate-y-1/2"
          }`}
        />
        {isTextarea ? (
          <textarea
            placeholder={field.placeholder}
            rows={3}
            readOnly
            className="w-full resize-none rounded-md border border-gray-200
            py-2 pl-9 pr-3 text-sm text-(--text-color) outline-none
            placeholder:text-(--light-text) focus:border-(--link-color)"
          />
        ) : (
          <input
            type="text"
            placeholder={field.placeholder}
            readOnly
            className="w-full rounded-md border border-gray-200 py-2 pl-9
            pr-3 text-sm text-(--text-color) outline-none
            placeholder:text-(--light-text) focus:border-(--link-color)"
          />
        )}
      </div>

      {isSelected && (
        <>
          <DragHandle position="bottom" />
          <FieldToolbar onOpenSettings={onOpenSettings} />
        </>
      )}
    </div>
  );
};

const EmptyState = ({ onAddFields }) => {
  return (
    <SelectableCardsGrid
      icon={HelpCircle}
      title="Get started with these Form Fields"
      description="Or Drag & Drop items from the left to this area to start building"
      items={QUICK_ADD_FIELDS.map((item) => ({
        ...item,
        key: item.buttonLabel,
        cardLabel: item.buttonLabel,
      }))}
      multiple
      confirmLabel="Add selected"
      onConfirm={onAddFields}
    />
  );
};

const FormCanvas = ({
  fields,
  onAddFields,
  selectedFieldId,
  onSelectField,
  onOpenSettings,
  onAddDescription,
  formTitle,
  formDescription,
}) => {
  return (
    <div
      className="min-w-0 rounded-md border border-gray-200 
  bg-(--other-blue)/5 p-4 xl:p-8 h-full min-h-[calc(100vh-10rem)] 
  flex items-center justify-center"
    >
      <div
        className="mx-auto h-full max-w-4xl xl:max-w-3xl rounded-md w-full bg-white p-2 sm:p-4 
      dropdown-menu-box-shadow "
      >
        {fields?.length === 0 ? (
          <EmptyState onAddFields={onAddFields} />
        ) : (
          <>
            <div className="mb-1 flex items-start justify-between gap-x-3">
              <p className="text-xl font-bold text-black md:text-2xl">
                {formTitle}
              </p>
              <button
                type="button"
                aria-label="Form options"
                className="shrink-0 cursor-pointer text-(--light-text) hover:text-(--card-heading-color)"
              >
                <MoreVertical size={18} />
              </button>
            </div>

            <button
              type="button"
              onClick={onAddDescription}
              className={`mb-6 text-sm font-semibold  cursor-pointer  ${formDescription ? "text-(--text-color)" : "text-(--link-color) hover:underline"} `}
            >
              {formDescription ? formDescription : "+ Add description"}
            </button>

            <p className="mb-3 font-semibold text-(--card-heading-color)">
              Personal Information
            </p>

            <div className="grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2">
              {fields.map((field) => (
                <FormField
                  key={field.id}
                  field={field}
                  isSelected={selectedFieldId === field.id}
                  onSelect={onSelectField}
                  onOpenSettings={onOpenSettings}
                />
              ))}
            </div>

            <button
              type="button"
              className="mt-4 w-full rounded-md border-2 border-dashed
        border-gray-200 py-3 text-sm font-semibold text-(--link-color)
        cursor-pointer hover:border-(--link-color)/40 hover:bg-(--link-color)/5"
            >
              + Add Field
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FormCanvas;
