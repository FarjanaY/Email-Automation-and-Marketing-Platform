//External Imports
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

//Internal Imports

const Pagination = ({
  activePage,
  totalPages,
  onPageChange,
  pageNumbers = [1, 2, 3, 4, 5],
}) => (
  <div
    className="flex flex-col items-center justify-between gap-y-3
    sm:flex-row"
  >
    <span className="text-sm text-(--light-text)">
      Page {activePage} of {totalPages}
    </span>

    <div className="flex items-center gap-x-1">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, activePage - 1))}
        className="flex items-center gap-x-1 rounded-md px-2 py-1.5 text-sm
        font-medium text-(--text-color) cursor-pointer hover:bg-(--card-body-bg)"
      >
        <ChevronLeft size={14} />
        Previous
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`flex h-8 w-8 items-center justify-center rounded-md
          text-sm font-medium cursor-pointer ${
            activePage === page
              ? "bg-(--card-heading-color) text-white"
              : "text-(--text-color) hover:bg-(--card-body-bg)"
          }`}
        >
          {String(page).padStart(2, "0")}
        </button>
      ))}

      <span className="px-1 text-(--light-text)">...</span>

      <button
        type="button"
        onClick={() => onPageChange(totalPages)}
        className={`flex h-8 w-8 items-center justify-center rounded-md
        text-sm font-medium cursor-pointer ${
          activePage === totalPages
            ? "bg-(--card-heading-color) text-white"
            : "text-(--text-color) hover:bg-(--card-body-bg)"
        }`}
      >
        {totalPages}
      </button>

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, activePage + 1))}
        className="flex items-center gap-x-1 rounded-md px-2 py-1.5 text-sm
        font-medium text-(--text-color) cursor-pointer hover:bg-(--card-body-bg)"
      >
        Next
        <ChevronRight size={14} />
      </button>
    </div>
  </div>
);

export default Pagination;
