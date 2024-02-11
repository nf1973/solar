import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardHeader, CardContent } from "./ui/card";

const MonthlySummaryTable = ({ monthlyData }) => {
  const kWhFormatter = (num) => {
    return (num / 1000).toFixed(1);
  };

  const roundToOneDecimalPlace = (num) => {
    return (num / 1).toFixed(1);
  };

  const formatDateforDisplay = (date) => {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    return month + "/" + year;
  };

  const [filteredMonthlyData, setFilteredMonthlyData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");

  const uniqueYears = [
    ...new Set(monthlyData.map((record) => record.month.slice(0, 4))),
  ]; // Get unique year values from monthlyData

  useEffect(() => {
    // This runs when the component mounts to set the selectedYear to the current year, or if it is 1st Jan, to the previous year
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // January is month 0

    if (currentMonth !== 1) {
      setSelectedYear(currentYear.toString());
    } else {
      setSelectedYear((currentYear - 1).toString());
    }
  }, []);

  useEffect(() => {
    const filteredData = monthlyData.filter(
      (record) => record.month.slice(0, 4) === selectedYear
    );
    setFilteredMonthlyData(filteredData);
  }, [selectedYear, monthlyData]);

  return (
    <Card>
      <CardHeader>
        {" "}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">
            Monthly Summary for {selectedYear}
          </h3>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="rounded border-gray-300 border px-2 py-1"
          >
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">
                Total Energy Generated (kWh)
              </TableHead>
              <TableHead className="text-right">
                Average Daily Enegery (kWh)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMonthlyData.map((record) => (
              <TableRow key={record.month}>
                <TableCell className="font-medium">
                  {formatDateforDisplay(record.month)}
                </TableCell>
                <TableCell className="text-right">
                  {kWhFormatter(record.energyGenerated)}
                </TableCell>
                <TableCell className="text-right">
                  {kWhFormatter(record.averageDailyEnergyGenerated)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MonthlySummaryTable;
