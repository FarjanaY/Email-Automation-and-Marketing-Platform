//External Imports
import React from "react";
import {
  Search,
  Type,
  AlignLeft,
  Hash,
  Calendar,
  Image as ImageIcon,
  Paperclip,
  ToggleLeft,
  ChevronDown,
  Square,
  ListChecks,
  SlidersHorizontal,
  Rows3,
  Table2,
} from "lucide-react";

//Internal Imports
import SidebarBlockSection from "../../../../src/components/common/SidebarBlockSection.jsx";

const TEXT_AND_INPUT = [
  { icon: Type, label: "Short Text", color: "#2563eb", bg: "#eff6ff" },
  { icon: AlignLeft, label: "Paragraph", color: "#7c3aed", bg: "#f5f3ff" },
  { icon: Hash, label: "Numeric Input", color: "#0891b2", bg: "#ecfeff" },
  { icon: Calendar, label: "Date Picker", color: "#db5825", bg: "#fff7ed" },
  { icon: ImageIcon, label: "Image Upload", color: "#16a34a", bg: "#f0fdf4" },
  { icon: Paperclip, label: "Attachment", color: "#0000ff", bg: "#eff6ff" },
];

const SELECTION_AND_CHOICES = [
  { icon: ToggleLeft, label: "Toggle Switch", color: "#db5825", bg: "#fff7ed" },
  {
    icon: ChevronDown,
    label: "Dropdown Menu",
    color: "#0891b2",
    bg: "#ecfeff",
  },
  { icon: Square, label: "Single Checkbox", color: "#db5825", bg: "#fff7ed" },
  {
    icon: ListChecks,
    label: "Checklist Group",
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    icon: SlidersHorizontal,
    label: "Range Slider",
    color: "#0000ff",
    bg: "#eff6ff",
  },
];

const LAYOUT_AND_STRUCTURE = [
  { icon: Rows3, label: "Section Break", color: "#7c3aed", bg: "#f5f3ff" },
  { icon: Table2, label: "Data Table", color: "#db5825", bg: "#fff7ed" },
];

const FieldsSidebar = () => (
  <div
    className="flex h-fit w-full flex-col rounded-md border
    border-gray-200 bg-white p-4"
  >
    <p className="mb-3 font-semibold text-(--card-heading-color)">
      Search Field
    </p>
    <div className="relative mb-5">
      <Search
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-(--light-text)"
      />
      <input
        type="text"
        placeholder="Search field..."
        className="w-full rounded-md border border-gray-200 bg-white
        py-2 pl-9 pr-3 text-sm text-(--text-color) outline-none
        focus:border-(--link-color)"
      />
    </div>

    <SidebarBlockSection
      title="Text & Input"
      items={TEXT_AND_INPUT}
      gridClassName="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-1"
    />
    <SidebarBlockSection
      title="Selection & Choices"
      items={SELECTION_AND_CHOICES}
      gridClassName="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-1"
    />
    <SidebarBlockSection
      title="Layout & Structure"
      items={LAYOUT_AND_STRUCTURE}
      gridClassName="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-1"
    />
  </div>
);

export default FieldsSidebar;
