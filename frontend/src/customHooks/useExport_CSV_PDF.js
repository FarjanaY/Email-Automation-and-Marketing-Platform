//External Imports
import React, { useCallback } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

//Internal Imports

const escapeCsvCell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;

//CSV function
//CSV is just plain text. No library needed.
// CSV is used for multiple inputs and multiple submissions
export const downloadAsCsv = (rows, filename) => {
  const csvContent = rows
    .map((row) => row.map(escapeCsvCell).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

//PDF Function
//Create Image by DOM node and place it as pdf.
// For long content it divided by multiple pages.
export const downloadAsPdf = async (node, filename) => {
  if (!node) return;

  const canvas = await html2canvas(node, {
    scale: 2,
    backgroundColor: "#ffffff",
  });
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(`${filename}.pdf`);
};

//custom hook craete
export const useExportCSV_PDF = ({ nodeRef, getRows, filename = "export" }) => {
  const handleExport = useCallback(
    async (format) => {
      if (format === "PDF") {
        await downloadAsPdf(nodeRef?.current, filename);
      } else if (format === "CSV") {
        downloadAsCsv(getRows(), filename);
      }
    },
    [nodeRef, getRows, filename],
  );
  return handleExport;
};
