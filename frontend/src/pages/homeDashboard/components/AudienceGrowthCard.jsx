//External Imports
import React, { useMemo, useState } from "react";

//Internal Imports

const WIDTH = 460;
const HEIGHT = 220;
const PADDING_LEFT = 34;
const PADDING_BOTTOM = 24;
const PADDING_TOP = 10;

//3 months before, the current month, then 3 months after — current month sits in the center
const MONTH_OFFSETS = [-3, -2, -1, 0, 1, 2, 3];
const DEFAULT_VALUES = [3400, 4200, 5100, 6200, 7100, 8000, 8800];

const buildDefaultData = () => {
  const now = new Date();
  return MONTH_OFFSETS.map((offset, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() + offset, 1);
    return { label: d.toLocaleString("en-US", { month: "short" }), value: DEFAULT_VALUES[i] };
  });
};

const Y_TICKS = [0, 2000, 4000, 6000, 8000];

const AudienceGrowthCard = ({
  title = "Audience Growth",
  subtitle = "New contacts per month",
  data,
}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const chartData = useMemo(() => data || buildDefaultData(), [data]);
  const currentIndex = Math.floor((chartData.length - 1) / 2);

  const maxValue = Y_TICKS[Y_TICKS.length - 1];
  const chartWidth = WIDTH - PADDING_LEFT;
  const chartHeight = HEIGHT - PADDING_BOTTOM - PADDING_TOP;
  const bandWidth = chartWidth / chartData.length;
  const barWidth = bandWidth * 0.45;

  const yFor = (value) => PADDING_TOP + chartHeight * (1 - value / maxValue);

  return (
    <div
      className="flex h-full w-full flex-col justify-between rounded-md
      border border-gray-200 bg-white p-4 hover:dropdown-menu-box-shadow"
    >
      <div className="mb-2 flex items-start justify-between">
        <div>
          <p className="font-bold text-(--card-heading-color)">{title}</p>
          <span className="text-xs font-semibold  text-(--light-text)">
            {subtitle}
          </span>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
        className="h-40 w-full sm:h-48"
        onMouseLeave={() => setActiveIndex(null)}
      >
        {Y_TICKS.map((tick) => (
          <g key={tick}>
            <line
              x1={PADDING_LEFT}
              x2={WIDTH}
              y1={yFor(tick)}
              y2={yFor(tick)}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
            <text
              x={PADDING_LEFT - 6}
              y={yFor(tick) + 3}
              fontSize="9"
              textAnchor="end"
              fill="#9ca3af"
            >
              {tick >= 1000 ? `${tick / 1000}k` : tick}
            </text>
          </g>
        ))}

        {chartData.map((point, i) => {
          const barHeight = chartHeight * (point.value / maxValue);
          const x = PADDING_LEFT + bandWidth * i + (bandWidth - barWidth) / 2;
          const y = HEIGHT - PADDING_BOTTOM - barHeight;
          //Resting state spotlights the current month; hovering any bar takes over the spotlight
          const isActive =
            activeIndex === null ? i === currentIndex : activeIndex === i;

          return (
            <g
              key={point.label}
              onMouseEnter={() => setActiveIndex(i)}
              className="cursor-pointer"
            >
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={4}
                fill="var(--link-color)"
                opacity={isActive ? 1 : 0.35}
              />
              <text
                x={x + barWidth / 2}
                y={HEIGHT - PADDING_BOTTOM + 14}
                fontSize="10"
                textAnchor="middle"
                fill="#6b7280"
              >
                {point.label}
              </text>
              {isActive && (
                <text
                  x={x + barWidth / 2}
                  y={y - 6}
                  fontSize="10"
                  fontWeight="700"
                  textAnchor="middle"
                  fill="var(--card-heading-color)"
                >
                  {point.value.toLocaleString()}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default AudienceGrowthCard;
