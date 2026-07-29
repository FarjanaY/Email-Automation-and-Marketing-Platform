//External Imports
import React from "react";

//Internal Imports
import TopAutomateEmailCard from "../home/components/TopAutomateEmailCard";
import EmpoweringFieldTeamCard from "../home/components/EmpoweringFieldTeamCard";
import EAutomationGrowthCard from "../home/components/EAutomationGrowthCard";
import GrowingTeamsCard from "../home/components/GrowingTeamsCard";
import FAQCard from "../home/components/FAQCard";
import StartAutomatingCard from "../home/components/StartAutomatingCard";
import HomeFooter from "../home/components/HomeFooter";

const HomePage = () => {
  return (
    <div className="">
      <TopAutomateEmailCard />
      <EmpoweringFieldTeamCard />
      <EAutomationGrowthCard />
      <GrowingTeamsCard />
      <FAQCard />
      <StartAutomatingCard />
      <HomeFooter />
    </div>
  );
};

export default HomePage;
