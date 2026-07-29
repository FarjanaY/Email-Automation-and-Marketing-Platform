//External Imports
import React from "react";
import { Sparkle } from "lucide-react";

//Internal Imports

const DEFAULT_COLORS = [
  "#2563eb", // blue
  "#0d9488", // teal
  "#16a34a", // green
  "#b45309", // amber/brown
  "#dc2626", // red
  "#a855f7", // purple
];

const PlusGridBackground = ({
  colWidths = [2, 3, 2], // matches flex-2 / flex-3 / flex-2
  rows = 5,
  colors = DEFAULT_COLORS,
  size = 12,
  className = "",
}) => {
  const cols = colWidths.length;
  const totalWidth = colWidths.reduce((sum, w) => sum + w, 0);

  //Cumulative proportional offsets: [0, 2, 5, 7] for [2,3,2]
  const colOffsets = [0];
  colWidths.forEach((w) => {
    colOffsets.push(colOffsets[colOffsets.length - 1] + w);
  });
  const xPercent = (colIndex) => (colOffsets[colIndex] / totalWidth) * 100;

  const points = [];
  for (let row = 0; row <= rows; row++) {
    for (let col = 0; col <= cols; col++) {
      const isOuterEdge =
        row === 0 || row === rows || col === 0 || col === cols;
      if (isOuterEdge) continue;
      points.push({ row, col, index: row * (cols + 1) + col });
    }
  }

  const verticalLines = [];
  for (let col = 1; col < cols; col++) verticalLines.push(col);

  const horizontalLines = [];
  for (let row = 1; row < rows; row++) horizontalLines.push(row);

  return (
    <div
      className={`absolute inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {verticalLines.map((col) => (
        <div
          key={`v-${col}`}
          className="absolute top-0 bottom-0 border-l border-gray-100"
          style={{ left: `${xPercent(col)}%` }}
        />
      ))}

      {horizontalLines.map((row) => (
        <div
          key={`h-${row}`}
          className="absolute left-0 right-0 border-t border-gray-100"
          style={{ top: `${(row / rows) * 100}%` }}
        />
      ))}

      {points.map((p) => (
        <Sparkle
          key={`${p.row}-${p.col}`}
          size={size}
          strokeWidth={1}
          style={{
            position: "absolute",
            left: `${xPercent(p.col)}%`,
            top: `${(p.row / rows) * 100}%`,
            transform: "translate(-50%, -50%)",
            color: colors[p.index % colors.length],
            fill: colors[p.index % colors.length],
            opacity:0.8,
          }}

        />
      ))}
    </div>
  );
};

export default PlusGridBackground;
