//External Imports
import React, { useMemo, useState } from "react";

//Internal Imports

const WIDTH = 560;
const HEIGHT = 260;
const PADDING_LEFT = 44;
const PADDING_RIGHT = 8;
const PADDING_TOP = 10;
const PADDING_BOTTOM = 26;

const Y_TICKS = [0, 800, 1600, 2400, 3200];
const MAX_VALUE = 3200;

//Fixed shape-levels per series, expanded into flat step-blocks across the month
const SERIES = [
  {
    key: "opens",
    label: "Opens",
    color: "#5a5fe0",
    levels: [500, 1400, 2400, 2400, 1800, 1900],
  },
  {
    key: "clicks",
    label: "Clicks",
    color: "#b7bbc3",
    levels: [1600, 1600, 1200, 800, 1200, 1200],
  },
  {
    key: "conversions",
    label: "Conversions",
    color: "#eb6834",
    levels: [400, 400, 700, 1000, 700, 600],
  },
];

//Holds flat for most of each block, then ramps linearly toward the next level
//over the last `rampDays` days — produces rise/flat/fall instead of a hard step
const buildTrapezoidSeries = (levels, days, rampDays = 2) => {
  const blockSize = Math.ceil(days / levels.length);
  const values = new Array(days);

  for (let b = 0; b < levels.length; b++) {
    const blockStart = b * blockSize;
    const blockEnd = Math.min((b + 1) * blockSize, days) - 1;
    const level = levels[b];
    const nextLevel = levels[Math.min(b + 1, levels.length - 1)];
    const rampStart = Math.max(blockEnd - rampDays + 1, blockStart);

    for (let day = blockStart; day <= blockEnd && day < days; day++) {
      if (day < rampStart || b === levels.length - 1) {
        values[day] = level;
      } else {
        const progress = (day - rampStart + 1) / (blockEnd - rampStart + 1);
        values[day] = Math.round(level + (nextLevel - level) * progress);
      }
    }
  }
  return values;
};

//"step-after" path: flat, then a vertical jump to the next value
// const buildStepPath = (values, xForIndex, yForValue) => {
//   let d = `M ${xForIndex(0)} ${yForValue(values[0])}`;
//   for (let i = 1; i < values.length; i++) {
//     const x = xForIndex(i);
//     d += ` L ${x} ${yForValue(values[i - 1])} L ${x} ${yForValue(values[i])}`;
//   }
//   return d;
// };

//Straight lines everywhere, except a small rounded curve inserted
//at each point where the slope actually changes (a real corner)
const buildLinePath = (values, xForIndex, yForValue, radius = 6) => {
  const points = values.map((v, i) => [xForIndex(i), yForValue(v)]);
  let d = `M ${points[0][0]} ${points[0][1]}`;

  for (let i = 1; i < points.length - 1; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];

    const deltaIn = y1 - y0;
    const deltaOut = y2 - y1;

    //Same slope in and out (flat run, or mid-ramp) — no corner, just a straight line
    if (deltaIn === deltaOut) {
      d += ` L ${x1} ${y1}`;
      continue;
    }

    const inLen = Math.hypot(x1 - x0, y1 - y0) || 1;
    const outLen = Math.hypot(x2 - x1, y2 - y1) || 1;
    const r = Math.min(radius, inLen / 2, outLen / 2);

    const beforeX = x1 - ((x1 - x0) / inLen) * r;
    const beforeY = y1 - ((y1 - y0) / inLen) * r;
    const afterX = x1 + ((x2 - x1) / outLen) * r;
    const afterY = y1 + ((y2 - y1) / outLen) * r;

    d += ` L ${beforeX} ${beforeY} Q ${x1} ${y1} ${afterX} ${afterY}`;
  }

  const last = points[points.length - 1];
  d += ` L ${last[0]} ${last[1]}`;
  return d;
};

const CampaignPerformanceCard = () => {
  const [hoveredDay, setHoveredDay] = useState(null);

  const { daysInMonth, monthLabel, xTickDays, series } = useMemo(() => {
    const now = new Date();
    const daysInMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
    ).getDate();
    const monthLabel = now.toLocaleString("en-US", { month: "short" });

    const xTickDays = [1, 5, 10, 15, 20, 25, daysInMonth].filter(
      (d, i, arr) => d <= daysInMonth && arr.indexOf(d) === i,
    );

    const series = SERIES.map((s) => ({
      ...s,
      values: buildTrapezoidSeries(s.levels, daysInMonth),
    }));

    return { daysInMonth, monthLabel, xTickDays, series };
  }, []);

  const chartWidth = WIDTH - PADDING_LEFT - PADDING_RIGHT;
  const chartHeight = HEIGHT - PADDING_TOP - PADDING_BOTTOM;

  const xForIndex = (i) => PADDING_LEFT + (i / (daysInMonth - 1)) * chartWidth;
  const yForValue = (v) =>
    PADDING_TOP + chartHeight - (v / MAX_VALUE) * chartHeight;

  const activeIndex = hoveredDay ?? Math.floor((daysInMonth - 1) / 2);
  const activeX = xForIndex(activeIndex);
  const activePercent = (activeX / WIDTH) * 100;
  const flipTooltip = activePercent > 62;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(
      Math.max((e.clientX - rect.left) / rect.width, 0),
      1,
    );
    setHoveredDay(Math.round(ratio * (daysInMonth - 1)));
  };

  return (
    <div
      className="rounded-md flex flex-col 
      hover:dropdown-menu-box-shadow bg-white p-4  
      h-full border border-gray-200 w-full
      justify-between"
    >
      <div className="flex items-start justify-between flex-wrap gap-y-4">
        <div className="flex flex-col gap-y-0">
          <p className="font-bold text-(--card-heading-color)">
            Campaign Performance
          </p>
          <span className="font-semibold text-xs text-(--light-text)">
            Last 30 days overview
          </span>
        </div>
        <div className="flex items-center gap-x-4">
          {series.map((s) => (
            <span
              key={s.key}
              className="flex items-center font-medium gap-x-1.5 text-xs"
            >
              <span
                className="h-2 w-2 rounded-full shrink-0"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-(--text-color)">{s.label}</span>
            </span>
          ))}
        </div>
      </div>

      <div
        className="relative mt-4 w-full p-1 "
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Y gridlines + labels */}
          {Y_TICKS.map((tick) => (
            <g key={tick}>
              <line
                x1={PADDING_LEFT}
                x2={WIDTH - PADDING_RIGHT}
                y1={yForValue(tick)}
                y2={yForValue(tick)}
                stroke="#e1e0d9"
                strokeWidth={1}
              />
              <text
                x={0}
                y={yForValue(tick)}
                textAnchor="start"
                dominantBaseline="middle"
                className="fill-(--light-text)"
                fontSize="11"
              >
                {tick}
              </text>
            </g>
          ))}

          {/* X labels */}
          {xTickDays.map((day) => (
            <text
              key={day}
              x={xForIndex(day - 1)}
              y={HEIGHT - PADDING_BOTTOM + 28}
              textAnchor="middle"
              className="fill-(--light-text)  "
              fontSize="11"
            >
              {monthLabel} {day}
            </text>
          ))}

          {/* Crosshair */}
          <line
            x1={activeX}
            x2={activeX}
            y1={PADDING_TOP}
            y2={HEIGHT - PADDING_BOTTOM}
            stroke="#c3c2b7"
            strokeWidth={1}
            strokeDasharray="3 3"
          />

          {/* Series lines */}
          {series.map((s) => (
            <path
              key={s.key}
              d={buildLinePath(s.values, xForIndex, yForValue)}
              fill="none"
              stroke={s.color}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: `drop-shadow(2px 10px 7px ${s.color})` }}
            />
          ))}

          {/* Active-day markers */}
          {series.map((s) => (
            <circle
              key={s.key}
              cx={activeX}
              cy={yForValue(s.values[activeIndex])}
              r={4}
              fill={s.color}
              stroke="#ffffff"
              strokeWidth={2}
            />
          ))}

          {/* Hover capture area */}
          <rect
            x={PADDING_LEFT}
            y={PADDING_TOP}
            width={chartWidth}
            height={chartHeight}
            fill="transparent"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredDay(null)}
            className="cursor-crosshair "
          />
        </svg>

        {/* Tooltip */}
        <div
          className="absolute top-0 bg-white rounded-md dropdown-menu-box-shadow
          p-2 text-[11px] pointer-events-none"
          style={{
            left: `${activePercent}%`,
            transform: flipTooltip ? "translateX(-105%)" : "translateX(8%)",
          }}
        >
          <p className="font-bold  text-(--card-heading-color) pb-1">
            {monthLabel} {activeIndex + 1}
          </p>
          {series.map((s) => (
            <p key={s.key} className="flex items-center justify-start gap-x-1">
              <span
                className="text-(--text-color) font-semibold"
                style={{ color: s.color }}
              >
                {s.label} :
              </span>
              <span className="font-semibold" style={{ color: s.color }}>
                {s.values[activeIndex]}
              </span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignPerformanceCard;
