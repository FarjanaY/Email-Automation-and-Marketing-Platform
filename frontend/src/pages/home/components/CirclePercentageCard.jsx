//External Imports
import React, { useState } from "react";
import { Plus } from "lucide-react";

//Internal Imports

const RADIUS = 50;
const STROKE = 15;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP = 4; // px surface gap between segments

//Neutral de-emphasis steps for every slice except the highlighted one
const MUTED_STEPS = ["#e4e6eb", "#d4d7dd", "#c1c5cc", "#aeb3bb"];

const CirclePercentageCard = ({
  title = "Campaign Types",
  subtitle = "Distribution",
  data = [
    { label: "Newsletter", value: 35 },
    { label: "Promotional", value: 28 },
    { label: "Transactional", value: 22 },
    { label: "Other", value: 15 },
  ],
  onAdd,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const activeIndex = hoveredIndex ?? 0;
  const activeSegment = data[activeIndex];

  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;

  let cumulative = 0;
  const segments = data.map((d, i) => {
    const dashLength = (d.value / total) * CIRCUMFERENCE;
    const dashOffset = -((cumulative / total) * CIRCUMFERENCE);
    cumulative += d.value;

    return {
      ...d,
      index: i,
      dashArray: `${Math.max(dashLength - GAP, 0)} ${CIRCUMFERENCE}`,
      dashOffset,
      color:
        i === activeIndex
          ? "var(--link-color)"
          : MUTED_STEPS[i % MUTED_STEPS.length],
    };
  });

  return (
    <div
      className="rounded-md flex flex-col justify-between
      hover:dropdown-menu-box-shadow bg-white p-4  
      h-full border border-gray-200 w-full
      "
    >
      <div className="flex items-start justify-between">
        <div className=" flex flex-col items-start justify-between">
          <p className="font-bold text-md text-(--card-heading-color)">
            {title}
          </p>
          <span className="text-xs text-(--light-text) font-semibold">
            {subtitle}
          </span>
        </div>
        {/* <button
          type="button"
          onClick={onAdd}
          aria-label="Add"
          className="h-7 w-7 shrink-0 rounded-full flex-center
          text-(--link-color) border border-(--link-color)/30
          hover:bg-(--link-color)/10 cursor-pointer"
        >
          <Plus size={16} strokeWidth={2.5} />
        </button> */}
      </div>

      <div className="flex flex-col justify-between h-full">
        <div className="mt-2 flex-center relative  w-fit mx-auto h-full">
          <svg
            width={(RADIUS + STROKE) * 2}
            height={(RADIUS + STROKE) * 2}
            viewBox={`0 0 ${(RADIUS + STROKE) * 2} ${(RADIUS + STROKE) * 2}`}
          >
            <g
              transform={`rotate(-90 ${RADIUS + STROKE} ${RADIUS + STROKE})`}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {segments.map((seg) => (
                <circle
                  key={seg.label}
                  cx={RADIUS + STROKE}
                  cy={RADIUS + STROKE}
                  r={RADIUS}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={STROKE}
                  strokeLinecap="round"
                  strokeDasharray={seg.dashArray}
                  strokeDashoffset={seg.dashOffset}
                  onMouseEnter={() => setHoveredIndex(seg.index)}
                  className="transition-[stroke] duration-150 ease-linear cursor-pointer"
                >
                  <title>
                    {seg.label}: {Math.round((seg.value / total) * 100)}%
                  </title>
                </circle>
              ))}
            </g>
          </svg>

          <div className="absolute flex flex-col items-center">
            <span className="text-xs text-(--light-text) font-semibold">
              {activeSegment?.label}
            </span>
            <span className="text-xl font-bold text-(--card-heading-color)">
              {Math.round((activeSegment?.value / total) * 100)}%
            </span>
          </div>
        </div>

        <ul className="mt-2 flex flex-col gap-y-1 ">
          {segments.map((seg) => (
            <li
              key={seg.label}
              onMouseEnter={() => setHoveredIndex(seg.index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="flex items-center justify-between text-xs 
              cursor-default font-semibold"
            >
              <span className="flex items-center gap-x-2">
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: seg.color }}
                />
                <span className="text-(--text-color)">{seg.label}</span>
              </span>
              <span className="font-semibold text-(--card-heading-color)">
                {Math.round((seg.value / total) * 100)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CirclePercentageCard;
