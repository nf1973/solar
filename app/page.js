"use client";
import { useState, useEffect } from "react";
import { getInitialDateValues } from "@/lib/dateUtils";
import DateRangePicker from "@/components/DateRangePicker";
import DataTable from "@/components/DataTable";
import MonthlySummaryTable from "@/components/MonthlySummaryTable";
import YearlySummaryTable from "@/components/YearlySummaryTable";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader } from "@/components/ui/card";

// TODO: Switch to using historical weather from https://open-meteo.com/ as the weather here is very unreliable

export default function Home() {
  const {
    initialStartYear,
    initialStartMonth,
    initialEndYear,
    initialEndMonth,
  } = getInitialDateValues();

  const [startYear, setStartYear] = useState(initialStartYear);
  const [startMonth, setStartMonth] = useState(initialStartMonth);
  const [endYear, setEndYear] = useState(initialEndYear);
  const [endMonth, setEndMonth] = useState(initialEndMonth);
  const [selectedTab, setSelectedTab] = useState("charts");

  useEffect(() => {
    if (startYear > endYear) {
      setEndYear(startYear);
    }
    if (startMonth > endMonth) {
      setEndMonth(startMonth);
    }
  }, [startYear, startMonth, endYear, endMonth]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start mx-8">
      <div className="flex-1 flex-col space-y-4 pt-4 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start -mb-12">
          <div className="flex items-center justify-between space-y-2">
            <div className="mb-12 md:mb-0">
              <h2 className="text-3xl pt-12 font-bold text-teal-600">
                Solar Analysis
              </h2>
              <p className="text-sm italic text-teal-600">
                Insights in to our home power station
              </p>
            </div>
          </div>
          <DateRangePicker
            startYear={startYear}
            setStartYear={setStartYear}
            endYear={endYear}
            setEndYear={setEndYear}
            startMonth={startMonth}
            setStartMonth={setStartMonth}
            endMonth={endMonth}
            setEndMonth={setEndMonth}
          />
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
              <Card>
                <CardHeader>Charts will appear here</CardHeader>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="tablular" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
              <YearlySummaryTable startYear={startYear} endYear={endYear} />

              <MonthlySummaryTable
                startYear={startYear}
                startMonth={startMonth}
                endYear={endYear}
                endMonth={endMonth}
              />
              <div className="col-span-2">
                <DataTable
                  startYear={startYear}
                  startMonth={startMonth}
                  endYear={endYear}
                  endMonth={endMonth}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
