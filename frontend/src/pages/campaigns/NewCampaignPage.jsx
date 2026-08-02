//External Imports
import React, { useState } from "react";

//Internal Imports
import CampaignTopBar from "./components/CampaignTopBar";
import CampaignBuilderView from "./components/CampaignBuilderView";
import AllCampaignsView from "./components/AllCampaignsView";

const NewCampaignPage = () => {
  const [activeTab, setActiveTab] = useState("new");

  return (
    <div className="flex flex-col bg-(--body-bg)">
      <CampaignTopBar activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "new" ? <CampaignBuilderView /> : <AllCampaignsView />}
    </div>
  );
};

export default NewCampaignPage;
