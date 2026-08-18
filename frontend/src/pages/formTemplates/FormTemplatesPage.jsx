//External Imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//Internal Imports
import { FORM_TEMPLATES } from "../../utils/data/emailTemplateData";
import SelectableCardsGrid from "../../components/common/form/SelectableCardsGrid";
import TemplateCardsOverlay from "./components/TemplateCardsOverlay";

const FormTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleAddTemplate = (template) => {
    const cloneFields = template.fields.map((field, i) => ({
      ...field,
      id: `field-${Date.now()}-${i}`,
    }));
    navigate("/forms", { state: { templateFields: cloneFields } });
  };

  return (
    <div
      className="min-w-0 rounded-md border border-gray-200 
                 bg-(--other-blue)/5 p-4 xl:p-8 
                 min-h-[calc(100vh-7rem)] 
                 flex items-center justify-center"
    >
      <div
        className="mx-auto h-full max-w-4xl xl:max-w-3xl 
        rounded-md w-full bg-white p-2 sm:p-4 
        dropdown-menu-box-shadow "
      >
        <SelectableCardsGrid
          title="Choose a Template"
          description="Click a template to preview it"
          items={FORM_TEMPLATES.map((item) => ({
            ...item,
            cardLabel: item.popular ? `${item.name} ⭐` : item.name,
          }))}
          multiple={false}
          confirmLabel=""
          onConfirm={handleTemplateSelect}
          gridClass="grid w-full grid-cols-2 gap-3 sm:grid-cols-3"
        />
      </div>

      {selectedTemplate && (
        <TemplateCardsOverlay
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
          onAddTemplate={handleAddTemplate}
        />
      )}
    </div>
  );
};

export default FormTemplates;
