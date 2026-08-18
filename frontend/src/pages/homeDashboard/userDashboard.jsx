//External Imports
import React from "react";
import { useSelector } from "react-redux";
import { Mail, Users, Percent, DollarSign, Plus } from "lucide-react";

//Internal Imports
import HomeButton from "../home/components/HomeButton";
import CirclePercentageCard from "../home/components/CirclePercentageCard";
import CampaignPerformanceCard from "../home/components/CampaignPerformanceCard";
import AutomationsProgressCard from "../home/components/AutomationsProgressCard";
import DashboardStatCard from "./components/DashboardStatCard";
import AudienceGrowthCard from "./components/AudienceGrowthCard";
import RecentCampaignsCard from "./components/RecentCampaignsCard";
import AIInsightsCard from "./components/AIInsightsCard";

const STATS = [
  {
    icon: <Mail size={14} />,
    label: "Total Campaigns",
    value: "24",
    delta: "+12%",
  },
  {
    icon: <Users size={14} />,
    label: "Active Contacts",
    value: "8,429",
    delta: "+23%",
  },
  {
    icon: <Percent size={14} />,
    label: "Avg Open Rate",
    value: "42.8%",
    delta: "+5.2%",
  },
  {
    icon: <DollarSign size={14} />,
    label: "Revenue (MTD)",
    value: "$12,450",
    delta: "-2.4%",
    isDown: true,
  },
];

const UserDashboard = () => {
  const { user } = useSelector((state) => state.authR);

  return (
    <div className="flex flex-col gap-y-4 bg-(--body-bg) pb-4 px-4 md:px-6">
      {/* Welcome header */}
      <div
        className="flex flex-col items-start justify-between gap-y-3
        sm:flex-row sm:items-center"
      >
        <div>
          <p className="text-xl font-bold text-black md:text-2xl">
            Welcome back, {user?.name || "there"}!
          </p>
          <span className="text-sm text-(--text-color)">
            Here's what's happening with your campaigns today.
          </span>
        </div>
        <HomeButton
          buttonText="Create Automation"
          icon={<Plus size={14} strokeWidth={2.5} />}
          className="orange-button flex-row-reverse md:py-2.5"
        />
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:grid-cols-4">
        {STATS.map((stat) => (
          <DashboardStatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Campaign Performance / Campaign Types / Top Automations */}
      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-[1.4fr_1fr_1fr]">
        <CampaignPerformanceCard />
        <CirclePercentageCard />
        <AutomationsProgressCard />
      </div>

      {/* Audience Growth / Recent Campaigns / AI Insights */}
      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-[1fr_1.4fr_1fr]">
        <AudienceGrowthCard />
        <RecentCampaignsCard />
        <AIInsightsCard />
      </div>
    </div>
  );
};

export default UserDashboard;
