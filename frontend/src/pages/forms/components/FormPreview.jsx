//External Imports
import React, { useRef, useState } from "react";
import { ArrowLeft, Save, FileText } from "lucide-react";

//Internal Imports
import { useExportCSV_PDF } from "../../../customHooks/useExport_CSV_PDF";
import ExportDropdown from "../../../components/common/ExportDropdown";
import HomeButton from "../../../pages/home/components/HomeButton";
import ExportDropdownCSV_PDF from "../../../components/common/ExportDropdownCSV_PDF";

const FormPreview = ({ formTitle, formDescription, fields, onBack }) => {
  const [values, setValues] = useState({});
  const formRef = useRef(null);

  //CSV & PDF export handler
  const { handleExport } = useExportCSV_PDF({
    nodeRef: formRef,
    getRows: () => [
      ["Field Label", "Value"],
      ...fields.map((field) => [field.label, values[field.id] || ""]),
    ],
    filename: formTitle || "form",
  });

  const handleChange = (id, value) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };
  return (
    <div
      className="flex h-auto w-full  flex-col 
    items-center bg-(--body-bg) p-4 pt-10"
    >
      <form
        ref={formRef}
        action=""
        onSubmit={(e) => e.preventDefault()}
        className=" w-full max-w-2xl flex-col rounded-md bg-white
        p-6  md:px-16 md:py-8 dropdown-menu-box-shadow"
      >
        <div className="pb-6 pt-8 text-center">
          <p className="text-lg lg:text-xl font-bold text-(--card-heading-color)">
            {formTitle}
          </p>
          {formDescription && (
            <span className="mt-1 block text-xs lg:text-sm text-(--text-color)">
              {formDescription}
            </span>
          )}
        </div>
        {fields.map((field) => {
          return (
            <div
              key={field.id}
              className="mb-4 text-xs md:text-sm flex flex-col md:flex-row"
            >
              <label
                htmlFor=""
                className="mb-1.5 block w-1/3  font-medium text-(--card-heading-color)"
              >
                {field.label}
                {field.required && <span className="text-red-600">*</span>} :
              </label>
              {field.type === "textarea" ? (
                <textarea
                  name=""
                  id=""
                  value={values[field.id] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  placeholder={field?.placeholder}
                  rows={3}
                  className="w-full resize-none rounded-md border border-gray-200
                px-3 py-2 outline-none focus:border-(--link-color) 
                text-xs md:text-sm placeholder:text-xs md:placeholder:text-sm"
                ></textarea>
              ) : (
                <input
                  type="text"
                  value={values[field.id] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  placeholder={field?.placeholder}
                  className="w-full rounded-md border border-gray-200 px-3 py-2
                text-sm outline-none focus:border-(--link-color)"
                />
              )}
            </div>
          );
        })}
        <div className="flex py-5 ">
          <button
            type="submit"
            className="mt-2 w-full rounded-sm bg-(--link-color) py-2.5
          text-sm font-semibold text-white dropdown-menu-box-shadow cursor-pointer"
          >
            Save &amp; Publish
          </button>
        </div>
        <div className="flex gap-x-5 pb-5 w-full justify-center">
          <ExportDropdownCSV_PDF label="Download" onSelect={handleExport} />
          <HomeButton
            type="button"
            buttonText="Save as Draft"
            className="rounded-md text-white 
            bg-(--other-blue) hover:bg-(--other-blue)/90"
            //   disabled={isLoading}
            icon={<Save size={14} />}
          />
        </div>
        <div className="w-full flex justify-center">
          <button
            type="button"
            onClick={onBack}
            className="mb-4 flex items-center gap-x-1.5 self-start text-sm font-semibold
        text-(--link-color) cursor-pointer hover:underline"
          >
            <ArrowLeft size={14} />
            Back to Editor
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPreview;
