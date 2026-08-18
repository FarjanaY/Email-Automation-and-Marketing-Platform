//External Imports
import React, { useState } from "react";
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";

//Internal Imports
import FormTopBar from "./components/FormTopBar";
import FieldsSidebar from "./components/FieldsSidebar";
import FormCanvas from "./components/FormCanvas";
import FieldSettingsPanel from "./components/FieldSettingsPanel";
import { FORM_FIELDS } from "./components/formFieldsData";
import { FIELD_TYPE_PRESETS } from "./components/formFieldsData";

import CustomScrollbar from "../../components/common/CustomScrollbar";
import FormPreview from "./components/FormPreview";

const FormBuilderPage = () => {
  const location = useLocation();
  const [formTitle, setFormTitle] = useState(
    "Jumpstart Your Dream Career with Us  – Unlock Opportunities & Grow Your Future!",
  );
  const [formDescription, setFormDescription] = useState("");
  const [activeSettingsTab, setActiveSettingsTab] = useState("field");
  const [descriptionFocusSignal, setDescriptionFocusSignal] = useState(0);

  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [isSettingsOverlayOpen, setIsSettingsOverlayOpen] = useState(false);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [fields, setFields] = useState(location.state?.templateFields ?? []);

  const selectedField = fields.find((f) => f.id === selectedFieldId);

  const handleAddFields = (templates) => {
    const newFields = templates.map((template, i) => ({
      id: `field-${Date.now()}-${i}`,
      required: false,
      span: "full",
      fieldSize: "Normal",
      ...template,
    }));
    setFields((prev) => [...prev, ...newFields]);
    setSelectedFieldId(newFields[0]?.id ?? null);
  };

  const openFieldSettings = () => {
    setActiveSettingsTab("field");
    setIsSettingsOverlayOpen(true);
  };
  const openFormDescriptionEditor = () => {
    setActiveSettingsTab("form");
    setDescriptionFocusSignal((n) => n + 1); // bump every click so it refocuses even if already open
    setIsSettingsOverlayOpen(true);
  };

  if (isPreviewOpen) {
    return (
      <FormPreview
        formTitle={formTitle}
        formDescription={formDescription}
        fields={fields}
        onBack={() => setIsPreviewOpen(false)}
      />
    );
  }

  return (
    <div className="flex flex-col bg-(--body-bg)">
      <FormTopBar onPreview={() => setIsPreviewOpen(true)} />

      <div className="grid grid-cols-1 items-start gap-4 p-4 md:p-3 xl:grid-cols-[280px_1.5fr]">
        <FieldsSidebar />
        <div className="grid grid-col-1 w-full lg:grid-cols-[1fr_280px] gap-4 ">
          <FormCanvas
            fields={fields}
            onAddFields={handleAddFields}
            selectedFieldId={selectedFieldId}
            onSelectField={setSelectedFieldId}
            onOpenSettings={() => setIsSettingsOverlayOpen(true)}
            onAddDescription={openFormDescriptionEditor}
            formTitle={formTitle}
            formDescription={formDescription}
          />
          <div className="hidden lg:block">
            <FieldSettingsPanel
              selectedField={selectedField}
              activeTab={activeSettingsTab}
              onTabChange={setActiveSettingsTab}
              formTitle={formTitle}
              onFormTitleChange={setFormTitle}
              formDescription={formDescription}
              onOpenSettings={openFieldSettings}
              onFormDescriptionChange={setFormDescription}
              descriptionFocusSignal={descriptionFocusSignal}
            />
          </div>

          {/* Moblie and tablet verison overlay field settings */}
          {isSettingsOverlayOpen && (
            <div
              // onClick={() => setIsSettingsOverlayOpen(false)}
              className="fixed w-auto inset-0 z-50 pt-15 flex justify-end
             bg-black/30  overflow-y-auto lg:hidden pb-10"
            >
              {/* <CustomScrollbar wrapperClassName="h-auto" maxHeight="100%"> */}
              <div
                className="flex w-full max-w-sm flex-col
                 bg-white dropdown-menu-box-shadow 
                 h-auto rounded-md mt-10 overflow-x-hidden hide-scrollbar"
              >
                <div
                  className="flex items-center justify-end
                 p-4"
                >
                  <button
                    onClick={() => {
                      setIsSettingsOverlayOpen(false);
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>
                <CustomScrollbar
                  wrapperClassName=" min-h-0 rounded-md"
                  className=" px-4 pb-4  "
                  maxHeight="100%"
                >
                  <FieldSettingsPanel
                    selectedField={selectedField}
                    activeTab={activeSettingsTab}
                    onTabChange={setActiveSettingsTab}
                    formTitle={formTitle}
                    formDescription={formDescription}
                    onFormTitleChange={setFormTitle}
                    onFormDescriptionChange={setFormDescription}
                    descriptionFocusSignal={descriptionFocusSignal}
                  />
                </CustomScrollbar>
              </div>
              {/* </CustomScrollbar> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormBuilderPage;
