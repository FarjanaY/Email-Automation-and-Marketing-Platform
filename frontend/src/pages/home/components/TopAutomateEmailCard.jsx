//External Imports
import React from "react";
import { useNavigate } from "react-router-dom";
import { MoveUpRight, Play } from "lucide-react";

//Internal Imports
import CirclePercentageCard from "./CirclePercentageCard";
import CampaignPerformanceCard from "./CampaignPerformanceCard";
import AutomationsProgressCard from "./AutomationsProgressCard";
import PlusGridBackground from "./PlusGridBackground";
import HomeButton from "./HomeButton";

const TopAutomateEmailCard = () => {
  const navigate = useNavigate();
  return (
    <div className="relative px-3 pt-3 sm:px-5 sm:pt-5 ">
      <PlusGridBackground colWidths={[2, 3, 2]} rows={5} />
      <div className="grid md:grid-rows-[0.8fr_0.3fr] gap-y-5 ">
        <div className="h-96 md:h-auto flex-center flex-col ">
          <div
            className="rounded-4xl border sm:text-sm  
           border-(--border-light) flex w-fit gap-x-2
           px-3 py-1 text-black my-4 bg-(--light-text)/20
           text-xs sm:font-semibold "
          >
            <span>10K+</span>
            <span>Trusted By 10000+ teams</span>
          </div>
          <p
            className="text-xl text-center text-black 
          font-bold px-4 pb-2 sm:text-3xl md:text-4xl md:pb-4 
          md:max-w-lg md:pt-2"
          >
            Automate Your Emails Without Complexity
          </p>
          <span
            className="text-center  md:max-w-lg px-2
           md:px-5 text-(--text-color) text-sm 
            sm:text-md md:text-lg font-medium"
          >
            Buils Powerful workflows , send campaings, and track performance all
            in one simple platform.
          </span>
          <div className="flex-center gap-x-5 py-10">
            <HomeButton
              buttonText="Get Started"
              onclick={() => navigate("/login")}
              icon={<MoveUpRight size={10} strokeWidth={4} />}
              className={`bg-(--link-color) md:py-2
                shadow-md/40! shadow-orange-600!
                text-white  hover:bg-orange-700/90`}
            />
            <HomeButton
              buttonText="Watch video"
              icon={<Play size={10} strokeWidth={4} fill="white" />}
              className={`gn-button-shadow md:py-2
                shadow-md/40! shadow-gray-600!
                 text-white  `}
            />
          </div>
        </div>
        <div
          className="flex flex-3 flex-col gap-3 md:flex-row 
        bg-(--body-bg) py-1"
        >
          <div className="flex-2">
            <CirclePercentageCard />
          </div>
          <div className="flex-3">
            <CampaignPerformanceCard />
          </div>
          <div className="flex-2 ">
            <AutomationsProgressCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopAutomateEmailCard;
