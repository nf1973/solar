import { useState, useEffect } from "react";
import { getYearlySummary } from "@/app/actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardContent } from "./ui/card";
const DataTable = ({ startYear, endYear }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedSolarLogs = await getYearlySummary(startYear, endYear);
        setData(fetchedSolarLogs);
      } catch (err) {
        console.error("Error fetching solar logs:", err);
      }
    };

    fetchData();
  }, [startYear, endYear]);

  const kwhFormatter = (num) => {
    return (num / 1000).toFixed(1);
  };

  const roundToOneDecimalPlace = (num) => {
    return (num / 1).toFixed(1);
  };

  return (
    <Card>
      <CardHeader>Yearly Summary</CardHeader>
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
                <TableCell className="font-medium">{record.date}</TableCell>
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
