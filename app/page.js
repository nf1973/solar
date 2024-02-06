"use client";
import { useState, useEffect } from "react";
import { getInitialDateValues } from "@/lib/dateUtils";
import DateRangePicker from "@/components/DateRangePicker";
import DataTable from "@/components/DataTable";
import MonthlySummaryTable from "@/components/MonthlySummaryTable";
import YearlySummaryTable from "@/components/YearlySummaryTable";

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

  useEffect(() => {
    if (startYear > endYear) {
      setEndYear(startYear);
    }
    if (startMonth > endMonth) {
      setEndMonth(startMonth);
    }
  }, [startYear, startMonth, endYear, endMonth]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-2xl font-semibold">Solar Logs</h1>
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
      <h3 className="pt-12 pb-8 font-semibold">Yearly Summary</h3>
      <YearlySummaryTable startYear={startYear} endYear={endYear} />
      <h3 className="pt-12 pb-8 font-semibold">Monthly Summary</h3>
      <MonthlySummaryTable
        startYear={startYear}
        startMonth={startMonth}
        endYear={endYear}
        endMonth={endMonth}
      />
      <h3 className="pt-12 pb-8 font-semibold">Daily Logs</h3>
      <DataTable
        startYear={startYear}
        startMonth={startMonth}
        endYear={endYear}
        endMonth={endMonth}
      />
    </main>
  );
}
