import DailySummaryTable from "@/components/DailySummaryTable";
import MonthlySummaryTable from "@/components/MonthlySummaryTable";
import YearlySummaryTable from "@/components/YearlySummaryTable";

import YearlySummaryChart from "@/components/YearlySummaryChart";
import MonthlySummaryChart from "@/components/MonthlySummaryChart";

import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import DailySummaryChart from "./DailySummaryChart";

const MainTabs = ({ yearlyData, monthlyData, allData }) => {
  const [selectedTab, setSelectedTab] = useState("charts");
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <Tabs
      value={selectedTab}
      onValueChange={handleTabChange}
      className="space-y-4 "
    >
      <TabsList>
        <TabsTrigger value="charts">Charts</TabsTrigger>
        <TabsTrigger value="tablular">Tabular Data</TabsTrigger>
      </TabsList>
      <TabsContent value="charts" className="space-y-4 ">
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          <YearlySummaryChart yearlyData={yearlyData} />
          <MonthlySummaryChart monthlyData={monthlyData} />
        </div>
        <DailySummaryChart allData={allData} />
      </TabsContent>
      <TabsContent value="tablular" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          <YearlySummaryTable yearlyData={yearlyData} />
          <MonthlySummaryTable monthlyData={monthlyData} />
        </div>
        <DailySummaryTable allData={allData} />
      </TabsContent>
    </Tabs>
  );
};

export default MainTabs;
