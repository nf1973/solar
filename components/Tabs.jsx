"use client";
import DailySummaryTable from "@/components/DailySummaryTable";
import MonthlySummaryTable from "@/components/MonthlySummaryTable";
import YearlySummaryTable from "@/components/YearlySummaryTable";

import YearlySummaryChart from "@/components/YearlySummaryChart";
import MonthlySummaryChart from "@/components/MonthlySummaryChart";

import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import React, { Fragment, useState, useEffect } from "react";
import DailySummaryChart from "./DailySummaryChart";

const MainTabs = ({ yearlyData, monthlyData, allData }) => {
  const [selectedMonthYear, setSelectedMonthYear] = useState("");
  const [selectedTab, setSelectedTab] = useState("charts");

  useEffect(() => {
    // This runs when the component mounts to set the selectedMonthYear to the current year + month, or if it is 1st Jan, to December of the previous year
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // January is month 0

    let tmpMonth;
    if (currentMonth !== 1) {
      currentMonth < 10
        ? (tmpMonth = "0" + currentMonth.toString())
        : (tmpMonth = currentMonth.toString());
      setSelectedMonthYear(currentYear.toString() + tmpMonth);
    } else {
      setSelectedMonthYear((currentYear - 1).toString() + "12");
    }
  }, [setSelectedMonthYear]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const uniqueMonths = [
    ...new Set(allData.map((record) => record.date.slice(0, 6))),
  ];

  function formatSelectedMonthForCardTitle(dateString) {
    const year = dateString.slice(0, 4);
    const month = Number(dateString.slice(4)) - 1; // Subtracting 1 to convert to zero-based month
    const date = new Date(Date.UTC(year, month, 1));
    const options = { month: "long" };
    const monthName = date.toLocaleString(undefined, options);
    return `${monthName} ${year}`;
  }

  return (
    <Tabs
      value={selectedTab}
      onValueChange={handleTabChange}
      className="space-y-4"
    >
      <div className="flex justify-between items-center sticky top-0">
        <TabsList>
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="tablular">Tabular Data</TabsTrigger>
        </TabsList>
        <div>
          <select
            value={selectedMonthYear}
            onChange={(e) => setSelectedMonthYear(e.target.value)}
            className="rounded border-gray-300 border px-2 py-1"
          >
            {uniqueMonths.map((monthYear, index) => {
              const formattedMonthYear =
                formatSelectedMonthForCardTitle(monthYear);
              const year = monthYear.slice(0, 4);
              const isDecember = monthYear.slice(4) === "12";
              const nextMonthYear = uniqueMonths[index + 1];
              const isNextJanuary =
                nextMonthYear && nextMonthYear.slice(4) === "01";

              return (
                <React.Fragment key={monthYear}>
                  <option value={monthYear}>{formattedMonthYear}</option>
                  {isDecember && isNextJanuary && (
                    <option disabled className="text-gray-500">
                      {/* No content here, just an empty option for the separator */}
                    </option>
                  )}
                </React.Fragment>
              );
            })}
          </select>
        </div>
      </div>
      <TabsContent value="charts" className="space-y-4 ">
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          <YearlySummaryChart yearlyData={yearlyData} />
          <MonthlySummaryChart
            monthlyData={monthlyData}
            selectedMonthYear={selectedMonthYear}
            setSelectedMonthYear={setSelectedMonthYear}
          />
        </div>
        <DailySummaryChart
          allData={allData}
          selectedMonthYear={selectedMonthYear}
          setSelectedMonthYear={setSelectedMonthYear}
        />
      </TabsContent>
      <TabsContent value="tablular" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          <YearlySummaryTable yearlyData={yearlyData} />
          <MonthlySummaryTable
            monthlyData={monthlyData}
            selectedMonthYear={selectedMonthYear}
            setSelectedMonthYear={setSelectedMonthYear}
          />
        </div>
        <DailySummaryTable
          allData={allData}
          selectedMonthYear={selectedMonthYear}
          setSelectedMonthYear={setSelectedMonthYear}
        />
      </TabsContent>
    </Tabs>
  );
};

export default MainTabs;
