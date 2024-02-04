import { useState, useEffect } from "react";
import { getSolarLogs } from "@/app/actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const DataTable = ({ startYear, startMonth, endYear, endMonth }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedSolarLogs = await getSolarLogs(
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
    const day = date.slice(6, 8);
    return day + "/" + month + "/" + year;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Energy Generated (kWh)</TableHead>
          <TableHead className="text-right">Efficiency (kWh/kWp)</TableHead>
          <TableHead className="text-right">Peak Power (kW)</TableHead>
          <TableHead className="text-center">Peak Time</TableHead>
          <TableHead className="text-center">Weather Condition</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((record) => (
          <TableRow key={record.date}>
            <TableCell className="font-medium">
              {formatDateforDisplay(record.date)}
            </TableCell>
            <TableCell className="text-right">
              {kwhFormatter(record.energyGenerated)}
            </TableCell>
            <TableCell className="text-right">
              {roundToOneDecimalPlace(record.efficiency)}
            </TableCell>
            <TableCell className="text-right">
              {kwhFormatter(record.peakPower)}
            </TableCell>
            <TableCell className="text-center">{record.peakTime}</TableCell>
            <TableCell className="text-center">
              {record.weatherCondition}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
