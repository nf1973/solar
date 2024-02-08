"use client";
import { useState, useEffect } from "react";
// import { getInitialDateValues } from "@/lib/dateUtils";
import DateRangePicker from "@/components/DateRangePicker";
import DataTable from "@/components/DataTable";
import MonthlySummaryTable from "@/components/MonthlySummaryTable";
import YearlySummaryTable from "@/components/YearlySummaryTable";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader } from "@/components/ui/card";
import BarChartYearly from "@/components/BarChartYearly";
import { getAllSolarLogs } from "./actions";
import { set } from "mongoose";

// TODO: Switch to using historical weather from https://open-meteo.com/ as the weather here is very unreliable

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("charts");

  const [allData, setAllData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  const aggregateYearlyData = (fetchedSolarLogs) => {
    const aggregatedYearlyData = fetchedSolarLogs.reduce(
      (accumulator, currentLog) => {
        const year = currentLog.date.slice(0, 4);
        const index = accumulator.findIndex((entry) => entry.year === year);

        if (index !== -1) {
          accumulator[index].energyGenerated += currentLog.energyGenerated;
          accumulator[index].totalRecords += 1; // Increment totalRecords for the year
        } else {
          accumulator.push({
            year,
            energyGenerated: currentLog.energyGenerated,
            totalRecords: 1, // Initialize totalRecords for the year
          });
        }

        return accumulator;
      },
      []
    );

    // Calculate average daily energyGenerated
    aggregatedYearlyData.forEach((entry) => {
      entry.averageDailyEnergyGenerated =
        entry.energyGenerated / entry.totalRecords;
    });

    return aggregatedYearlyData;
  };

  const aggregateMonthlyData = (fetchedSolarLogs) => {
    const aggregatedMonthlyData = fetchedSolarLogs.reduce(
      (accumulator, currentLog) => {
        const month = currentLog.date.slice(0, 6);
        const index = accumulator.findIndex((entry) => entry.month === month);

        if (index !== -1) {
          accumulator[index].energyGenerated += currentLog.energyGenerated;
          accumulator[index].totalRecords += 1; // Increment totalRecords for the month
        } else {
          accumulator.push({
            month,
            energyGenerated: currentLog.energyGenerated,
            totalRecords: 1, // Initialize totalRecords for the month
          });
        }

        return accumulator;
      },
      []
    );

    // Calculate average daily energyGenerated
    aggregatedMonthlyData.forEach((entry) => {
      entry.averageDailyEnergyGenerated =
        entry.energyGenerated / entry.totalRecords;
    });

    return aggregatedMonthlyData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedSolarLogs = await getAllSolarLogs();
        setAllData(fetchedSolarLogs);
        setYearlyData(aggregateYearlyData(fetchedSolarLogs));
        setMonthlyData(aggregateMonthlyData(fetchedSolarLogs));
      } catch (err) {
        console.error("Error fetching solar logs:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("All data:", allData); // Log all data
  }, [allData]);

  useEffect(() => {
    console.log("Yearly data:", yearlyData); // Log yearly data
  }, [yearlyData]);

  useEffect(() => {
    console.log("Monthly data:", monthlyData); // Log monthly data
  }, [monthlyData]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start mx-8">
      <div className="flex-1 flex-col space-y-4 pt-4 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start ">
          <div className="flex items-center justify-between space-y-2">
            <div className="mb-12 md:mb-0 py-8">
              <h2 className="text-3xl font-bold text-teal-600">
                Solar Analysis
              </h2>
              <p className="text-sm italic text-teal-600">
                Harnessing Sunlight, Illuminating Insights
              </p>
            </div>
          </div>
          {/* <DateRangePicker
            startYear={startYear}
            setStartYear={setStartYear}
            endYear={endYear}
            setEndYear={setEndYear}
            startMonth={startMonth}
            setStartMonth={setStartMonth}
            endMonth={endMonth}
            setEndMonth={setEndMonth}
          /> */}
        </div>
        <Tabs
          value={selectedTab}
          onValueChange={handleTabChange}
          className="space-y-4 "
        >
          <TabsList>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="tablular">Tabular Data</TabsTrigger>
          </TabsList>
          <TabsContent value="charts" className="space-y-4 min-w-full">
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
              {/* <BarChartYearly startYear={startYear} endYear={endYear} /> */}
            </div>
          </TabsContent>
          <TabsContent value="tablular" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
              <YearlySummaryTable yearlyData={yearlyData} />
              <MonthlySummaryTable monthlyData={monthlyData} />

              {/* <MonthlySummaryTable
                startYear={startYear}
                startMonth={startMonth}
                endYear={endYear}
                endMonth={endMonth}
              /> */}
              {/* <div className="col-span-2">
                <DataTable
                  startYear={startYear}
                  startMonth={startMonth}
                  endYear={endYear}
                  endMonth={endMonth}
                />
              </div> */}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
