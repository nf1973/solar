import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardContent } from "./ui/card";
const YearlySummaryTable = ({ yearlyData }) => {
  const kWhFormatter = (num) => {
    return (num / 1000).toFixed(1);
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-bold">Yearly Summary</h3>
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
            {yearlyData.map((record) => (
              <TableRow key={record.year}>
                <TableCell className="font-medium">{record.year}</TableCell>
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

export default YearlySummaryTable;
