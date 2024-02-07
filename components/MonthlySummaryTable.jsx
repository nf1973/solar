import { useState, useEffect } from "react";
import { getMonthlySummary } from "@/app/actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardContent } from "./ui/card";
const DataTable = ({ startYear, startMonth, endYear, endMonth }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedSolarLogs = await getMonthlySummary(
          startYear,
          startMonth,
          endYear,
          endMonth
        );
        setData(fetchedSolarLogs);
      } catch (err) {
        console.error("Error fetching solar logs:", err);
      }
    };

    fetchData();
  }, [startYear, startMonth, endYear, endMonth]);

  const kwhFormatter = (num) => {
    return (num / 1000).toFixed(1);
  };

  //function to take a number and set to one decimal place
  const roundToOneDecimalPlace = (num) => {
    return (num / 1).toFixed(1);
  };

  const formatDateforDisplay = (date) => {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    return month + "/" + year;
  };

  return (
    <Card>
      <CardHeader>Monthly Summary</CardHeader>
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
              </TableHead>{" "}
              <TableHead className="text-right">
                Average Daily Efficiency (kWh/kWp)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((record) => (
              <TableRow key={record.date}>
                <TableCell className="font-medium">
                  {formatDateforDisplay(record.date)}
                </TableCell>
                <TableCell className="text-right">
                  {kwhFormatter(record.totalEnergy)}
                </TableCell>
                <TableCell className="text-right">
                  {kwhFormatter(record.averageDailyEnergy)}
                </TableCell>
                <TableCell className="text-right">
                  {roundToOneDecimalPlace(record.averageEfficiency)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DataTable;
