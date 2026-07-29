//External Imports
import React from "react";
import { Mail } from "lucide-react";

//Internal Imports

const AVATAR_COLORS = [
  "#5a5dfe",
  "#db5825",
  "#0d9488",
  "#16a34a",
  "#a855f7",
  "#dc2626",
];

const Avatar = ({ name, index }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full
      text-[11px] font-semibold text-white"
      style={{ backgroundColor: AVATAR_COLORS[index % AVATAR_COLORS.length] }}
    >
      {initials}
    </span>
  );
};

//7 cards total: column1 = 2 (1st double height), column2 = 3, column3 = 2
//(2nd double height, highlighted, last). gridClass only applies at lg:+ —
//below that everything just stacks in normal source order.
const CARDS = [
  {
    company: "Airwallex",
    name: "Olsen Ingrid",
    role: "CTO, Airwallex",
    quote:
      "Email Automation & Marketing Platform has totally changed the game for our email automation. What used to take us hours is now automated, letting us focus on what really matters. Our efficiency and productivity have shot up — it's a total game-changer.",
    gridClass: "lg:col-start-1 lg:row-start-1 lg:row-span-2",
  },
  {
    name: "Priya Patel",
    role: "Head of Marketing, GlobalCorp",
    quote:
      "Email Automation & Marketing Platform's reporting tools give us deep insights. We've optimized our campaigns for better engagement and conversions.",
    gridClass: "lg:col-start-1 lg:row-start-3",
  },
  {
    name: "Omar Hassan",
    role: "CTO, Apex Ventures",
    quote:
      "Email Automation & Marketing Platform's customer support is outstanding. They're always ready to help with any questions or issues.",
    gridClass: "lg:col-start-2 lg:row-start-1",
  },
  {
    name: "Anya Sharma",
    role: "Marketing Director, LumenSoft",
    quote:
      "The automation builder is incredibly user-friendly. We set up our initial workflow in minutes.",
    gridClass: "lg:col-start-2 lg:row-start-2",
  },
  {
    name: "Kenji Tanaka",
    role: "Sales Manager, ZenTech",
    quote:
      "Email Automation & Marketing Platform's segmentation features are a game-changer. Messages that resonate with our audience.",
    gridClass: "lg:col-start-2 lg:row-start-3",
  },
  {
    name: "Carlos Ramirez",
    role: "Marketing Director, Northwind",
    quote:
      "Email Automation & Marketing Platform's A/B testing has significantly improved our email marketing. We now make data-driven decisions.",
    gridClass: "lg:col-start-3 lg:row-start-1",
  },
  {
    company: "SpaceX",
    name: "Ingrid Olsen",
    role: "CTO, SpaceX",
    quote:
      "Email Automation & Marketing Platform has totally changed the way we handle email automation. Tasks that were once manual are now automated, so we can concentrate on the big stuff. Our productivity has shot up — it's a real game-changer.",
    highlighted: true,
    gridClass: "lg:col-start-3 lg:row-start-2 lg:row-span-2",
  },
];

const GrowingTeamsCard = () => {
  return (
    <div className="bg-white px-6 py-16 md:px-16 sm:text-sm">
      <div className="mb-10 flex flex-col items-center gap-y-2 text-center">
        <p className="text-xl md:text-2xl lg:text-3xl font-bold text-black ">
          Trusted By Growing Teams
        </p>
        <span className="max-w-lg text-sm text-(--text-color) py-2">
          From startups to enterprises, teams use Email Automation & Marketing
          Platform to automate smarter and drive better results.
        </span>
      </div>

      <div
        className="grid grid-cols-1 gap-4 md:grid-cols-2 
      lg:grid-cols-3 lg:grid-rows-3 "
      >
        {CARDS.map((card, i) => (
          <div
            key={card.name || card.company}
            className={`flex flex-col rounded-lg p-5 border 
              border-gray-200 dropdown-menu-box-shadow
              hover:shadow-xl corsor-pointer justify-between ${
                card.highlighted
                  ? "justify-between bg-(--link-color) text-white hover:bg-orange-600/8n0"
                  : "bg-[#ffff] text-(--text-color)"
              } ${card.gridClass}`}
          >
            {card.company && !card.highlighted && (
              <p
                className="mb-3 flex items-center gap-x-2 
                font-bold text-[13px] sm:text-sm
               text-(--card-heading-color)"
              >
                <Mail size={16} className="text-(--link-color)" />
                {card.company}
              </p>
            )}
            {card.company && card.highlighted && (
              <p className="mb-3  font-bold">{card.company}</p>
            )}

            <p
              className={`text-xs sm:text-sm ${card.highlighted ? "text-white/90" : ""}`}
            >
              "{card.quote}"
            </p>

            {card.name && (
              <div className="mt-4 flex items-center gap-x-2  text-[13px] sm:text-sm">
                {card.highlighted ? (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-[11px] font-semibold">
                    {card.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                ) : (
                  <Avatar name={card.name} index={i} />
                )}
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      card.highlighted
                        ? "text-white"
                        : "text-(--card-heading-color)"
                    }`}
                  >
                    {card.name}
                  </p>
                  <span
                    className={`text-xs ${
                      card.highlighted ? "text-white/70" : "text-(--light-text)"
                    }`}
                  >
                    {card.role}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrowingTeamsCard;
