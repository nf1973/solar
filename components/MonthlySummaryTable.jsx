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

const MonthlySummaryTable = ({
  monthlyData,
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
    return month + "/" + year;
  };

  function formatDateForCardTitle(dateString) {
    const year = dateString.slice(0, 4);
    return `${year}`;
  }

  const [filteredMonthlyData, setFilteredMonthlyData] = useState([]);

  useEffect(() => {
    const filteredData = monthlyData.filter(
      (record) => record.month.slice(0, 4) === selectedMonthYear.slice(0, 4)
    );
    setFilteredMonthlyData(filteredData);
  }, [selectedMonthYear, monthlyData]);

  return (
    <Card>
      <CardHeader>
        {" "}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-[#30AEBE]">
            Monthly Summary for {formatDateForCardTitle(selectedMonthYear)}
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
