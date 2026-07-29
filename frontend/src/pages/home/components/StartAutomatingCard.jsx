//External Imports
import React from "react";
import {
  Mail,
  Send,
  Settings,
  Bell,
  BarChart3,
  Users,
  Play,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import HomeButton from "./HomeButton";

//Internal Imports

const ORBIT_ICONS = [
  { Icon: Send, top: "6%", left: "12%", color: "#5a5dfe" },
  { Icon: Settings, top: "8%", left: "78%", color: "#db5825" },
  { Icon: Bell, top: "78%", left: "6%", color: "#16a34a" },
  { Icon: BarChart3, top: "82%", left: "82%", color: "#a855f7" },
  { Icon: Users, top: "42%", left: "-2%", color: "#0d9488" },
  { Icon: Play, top: "40%", left: "94%", color: "#dc2626" },
];

const AutomationOrbitIllustration = () => (
  <div className="relative mx-auto h-64 w-64 md:h-72 md:w-72">
    <svg
      viewBox="0 0 300 300"
      className="absolute inset-0 h-full w-full"
      fill="none"
    >
      <circle
        cx="150"
        cy="150"
        r="140"
        stroke="#c7d2fe"
        strokeWidth="2"
        strokeDasharray="6 8"
      />
      <circle cx="150" cy="150" r="95" fill="#eef0fc" />
      <circle cx="150" cy="150" r="70" fill="#5a5dfe" />
    </svg>

    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/90 p-4">
      <Mail size={40} strokeWidth={2} className="text-white" />
    </div>

    {ORBIT_ICONS.map(({ Icon, top, left, color }, i) => (
      <div
        key={i}
        className="absolute flex h-9 w-9 items-center justify-center rounded-lg bg-white dropdown-menu-box-shadow"
        style={{ top, left }}
      >
        <Icon size={16} strokeWidth={2.5} style={{ color }} />
      </div>
    ))}
  </div>
);

const StartAutomatingCard = () => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white flex flex-col items-center 
   px-3 py-5 sm:px-5"
    >
      <div
        className="bg-(--light-text)/5 border border-gray-200
       w-full flex flex-col px-3 md:px-10 rounded-lg md:py-6
       items-center justify-between md:flex-row gap-x-5"
      >
        <div className="w-full lg:w-auto">
          <p
            className="mb-4 text-xl font-bold leading-tight
         text-black md:text-2xl lg:text-3xl text-center 
         md:text-left "
          >
            Start automating your emails today
          </p>
          <span
            className="mb-6 block text-sm text-(--text-color) 
            max-w-md text-center  md:text-left"
          >
            Design smarter workflows, send better campaigns, and grow faster —
            all in one simple platform.
          </span>
          <div
            className="flex items-center gap-x-2 
             justify-center  md:justify-start shrink-0 w-full
           "
          >
            <HomeButton
              buttonText="Get Started Free"
              onclick={() => navigate("/login")}
              className={`bg-(--link-color) md:py-2
                shadow-md/40! shadow-orange-600! 
                text-white  hover:bg-orange-700/90`}
            />
            <HomeButton
              buttonText="Watch video"
              icon={<Play size={10} strokeWidth={4} fill="white" />}
              className={`gn-button-shadow md:py-2
                 text-white  flex-row-reverse `}
            />
          </div>
        </div>

        <div className="w-full  lg:w-auto px-6">
          <AutomationOrbitIllustration />
        </div>
      </div>
    </div>
  );
};

export default StartAutomatingCard;
