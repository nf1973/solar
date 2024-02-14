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

const DailySummaryTable = ({
  allData,
  selectedMonthYear,
  setSelectedMonthYear,
}) => {
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

  //Filter allData based on selectedMonthYear
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
          <h3 className="text-lg font-bold text-[#30AEBE]">
            Daily Summary for{" "}
            {formatSelectedMonthForCardTitle(selectedMonthYear)}
          </h3>
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
              <TableHead className="text-center">Peak Time</TableHead>
              <TableHead className="text-left">Weather Conditions</TableHead>
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
                  {roundToOneDecimalPlace(record.efficiency)}
                </TableCell>
                <TableCell className="text-right">
                  {kWhFormatter(record.peakPower)}
                </TableCell>
                <TableCell className="text-center">{record.peakTime}</TableCell>
                <TableCell>{record.weatherCondition}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DailySummaryTable;
