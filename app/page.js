"use client";
import { useState, useEffect } from "react";
import { getAllSolarLogs } from "./actions"; //For future use
import { getAllSolarLogsSQL } from "./actions";
import Header from "@/components/Header";
import MainTabs from "@/components/Tabs";

// TODO: Switch to using historical weather from https://open-meteo.com/ as the weather in the solar data is very unreliable
// TODO: Switch to using MongoDB instead of SQL
// TODO: defatulProps warnings in console due to https://github.com/recharts/recharts/issues/3615

export default function Home() {
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
        const fetchedSolarLogs = await getAllSolarLogsSQL(); //TODO: Switch to MongoDB version
        setAllData(fetchedSolarLogs);
        setYearlyData(aggregateYearlyData(fetchedSolarLogs));
        setMonthlyData(aggregateMonthlyData(fetchedSolarLogs));
      } catch (err) {
        console.error("Error fetching solar logs:", err);
      }
    };

    fetchData();
  }, []);

  //console.log(allData);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start mx-8">
      <div className="flex-1 flex-col space-y-4 pt-4 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start ">
          <Header />
        </div>
        <MainTabs
          yearlyData={yearlyData}
          monthlyData={monthlyData}
          allData={allData}
        />
      </div>
    </main>
  );
}
