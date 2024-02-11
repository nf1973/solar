import React, { Fragment, useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardHeader, CardContent } from "./ui/card";

const DailySummaryTable = ({ allData }) => {
  const kWhFormatter = (num) => {
    return (num / 1000).toFixed(1);
  };

  const roundToOneDecimalPlace = (num) => {
    return (num / 1).toFixed(1);
  };

  const formatDateforDisplay = (date) => {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);
    return day + "/" + month + "/" + year;
  };

  function formatSelectedMonthForCardTitle(dateString) {
    const year = dateString.slice(0, 4);
    const month = Number(dateString.slice(4)) - 1; // Subtracting 1 to convert to zero-based month
    const date = new Date(Date.UTC(year, month, 1));
    const options = { month: "long" };
    const monthName = date.toLocaleString(undefined, options);
    return `${monthName} ${year}`;
  }

  const [filteredDailyData, setFilteredDailyData] = useState([]);
  const [selectedMonthYear, setSelectedMonthYear] = useState("");

  const uniqueMonths = [
    ...new Set(allData.map((record) => record.date.slice(0, 6))),
  ]; // Get unique month values from monthlyData

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
  }, []);

  //Filtr allData based on selectedMonthYear
  useEffect(() => {
    const filteredData = allData.filter(
      (record) => record.date.slice(0, 6) === selectedMonthYear
    );
    setFilteredDailyData(filteredData);
  }, [selectedMonthYear, allData]);

  return (
    <Card>
      <CardHeader>
        {" "}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">
            Daily Summary for{" "}
            {formatSelectedMonthForCardTitle(selectedMonthYear)}
          </h3>
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
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">
                Total Energy Generated (kWh)
              </TableHead>
              <TableHead className="text-right">Efficiency (kWh/kWp)</TableHead>
              <TableHead className="text-right">Peak Power (KW)</TableHead>
              <TableHead className="text-right">Peak Time</TableHead>
              <TableHead className="text-right">Weather Conditions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDailyData.map((record) => (
              <TableRow key={record.date}>
                <TableCell className="font-medium">
                  {formatDateforDisplay(record.date)}
                </TableCell>
                <TableCell className="text-right">
                  {kWhFormatter(record.energyGenerated)}
                </TableCell>
                <TableCell className="text-right">
                  {record.efficiency}
                </TableCell>
                <TableCell className="text-right">{record.peakPower}</TableCell>
                <TableCell className="text-right">{record.peakTime}</TableCell>
                <TableCell className="text-right">
                  {record.weatherCondition}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DailySummaryTable;
