//External Imports
import React, { useState } from "react";

//Internal Imports
import AutomationTopBar from "./components/AutomationTopBar";
import AutomationBuilderView from "./components/AutomationBuilderView";
import AllAutomationsView from "./components/AllAutomationsView";

const NewAutomationPage = () => {
  const [activeTab, setActiveTab] = useState("new");

  return (
    <div className="flex flex-col bg-(--body-bg)">
      <AutomationTopBar activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "new" ? <AutomationBuilderView /> : <AllAutomationsView />}
    </div>
  );
};

export default NewAutomationPage;
