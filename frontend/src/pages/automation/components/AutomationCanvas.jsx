//External Imports
import React from "react";
import {
  UserPlus,
  MailOpen,
  MousePointerClick,
  ShoppingCart,
} from "lucide-react";

//Internal Imports
import AutomationNodeCard from "./AutomationNodeCard";

const NODES = [
  { icon: UserPlus, title: "User subscribes", subtitle: "When this happens" },
  { icon: MailOpen, title: "Opens email", subtitle: "When this happens" },
  {
    icon: MousePointerClick,
    title: "Clicks link",
    subtitle: "When this happens",
  },
  {
    icon: ShoppingCart,
    title: "Makes purchase",
    subtitle: "When this happens",
  },
];

//Virtual coordinate space the desktop layout is authored in — node positions (%)
//and the SVG connector paths both derive from this, so they stay aligned at any
//rendered size via the aspect-ratio-locked container + preserveAspectRatio="none"
const VIRTUAL_W = 700;
const VIRTUAL_H = 620;
const NODE_W = 260;

const POSITIONS = [
  { x: 20, y: 20 },
  { x: 420, y: 140 },
  { x: 20, y: 260 },
  { x: 420, y: 380 },
];

const CONNECTOR_PATHS = [
  "M 150 90 V 115 Q 150 125 160 125 H 540 Q 550 125 550 135 V 140",
  "M 550 210 V 235 Q 550 245 540 245 H 160 Q 150 245 150 255 V 260",
  "M 150 330 V 355 Q 150 365 160 365 H 540 Q 550 365 550 375 V 380",
];

const pct = (value, total) => `${(value / total) * 100}%`;

const AutomationCanvas = () => (
  <div
    className="rounded-md border border-gray-200 p-4 sm:p-6"
    style={{
      backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
      backgroundSize: "16px 16px",
      backgroundColor: "var(--card-body-bg)",
    }}
  >
    {/* Mobile / tablet — simple vertical stack, one connector between each pair */}
    <div className="flex flex-col lg:hidden ">
      {NODES.map((node, i) => (
        <div key={node.title} className="flex flex-col bg-red-400 items-center">
          <AutomationNodeCard {...node} className="max-w-md" />
          {i < NODES.length - 1 && (
            <svg
              width="20"
              height="28"
              viewBox="0 0 20 28"
              className="shrink-0"
            >
              <defs>
                <marker
                  id={`automation-arrow-mobile-${i}`}
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--link-color)" />
                </marker>
              </defs>
              <line
                x1="10"
                y1="0"
                x2="10"
                y2="24"
                stroke="var(--link-color)"
                strokeOpacity="0.45"
                strokeWidth="2"
                strokeDasharray="4 4"
                markerEnd={`url(#automation-arrow-mobile-${i})`}
              />
            </svg>
          )}
        </div>
      ))}
    </div>

    {/* Desktop — staggered zigzag layout, positions + connectors share one
        virtual coordinate space so they scale together at any width */}
    <div
      className="relative hidden w-full lg:block"
      style={{ aspectRatio: `${VIRTUAL_W} / ${VIRTUAL_H}` }}
    >
      <svg
        viewBox={`0 0 ${VIRTUAL_W} ${VIRTUAL_H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <marker
            id="automation-arrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--link-color)" />
          </marker>
        </defs>
        {CONNECTOR_PATHS.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="var(--link-color)"
            strokeOpacity="0.45"
            strokeWidth="2"
            strokeDasharray="6 6"
            markerEnd="url(#automation-arrow)"
          />
        ))}
      </svg>

      {NODES.map((node, i) => (
        <div
          key={node.title}
          className="absolute"
          style={{
            left: pct(POSITIONS[i].x, VIRTUAL_W),
            top: pct(POSITIONS[i].y, VIRTUAL_H),
            width: pct(NODE_W, VIRTUAL_W),
          }}
        >
          <AutomationNodeCard {...node} />
        </div>
      ))}
    </div>
  </div>
);

export default AutomationCanvas;
