//External Imports
import React from "react";
import { Download } from "lucide-react";

//Internal Imports
import DropdownButton from "./DropdownButton.jsx";

const ExportDropdownCSV_PDF = ({
  formats = ["PDF", "CSV"],
  onSelect,
  label = "Export",
}) => {
  return (
    <DropdownButton
      options={formats}
      onSelect={onSelect}
      label={formats.length <= 1 ? `Save as ${formats[0]}` : label}
      icon={Download}
    >
      ExportDropdownCSV_PDF
    </DropdownButton>
  );
};

export default ExportDropdownCSV_PDF;
