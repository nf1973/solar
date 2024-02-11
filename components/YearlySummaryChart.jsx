import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { Card, CardHeader, CardContent } from "./ui/card";

const kWhFormatter = (num) => {
  return (num / 1000).toFixed(1);
};

const YearlySummaryChart = ({ yearlyData }) => {
  // Transform the data to match the expected format for the chart
  console.log(yearlyData);
  const transformedData = yearlyData.map((item) => ({
    "Total Energy Generated": kWhFormatter(item.energyGenerated),
    date: item.year,
  }));

  return (
    <Card className="w-full">
      <CardHeader>Yearly Energy Generation</CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={transformedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              label={{
                value: "kWh",
                position: "insideLeft",
                angle: "-90",
                offset: "0",
              }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="Total Energy Generated" fill="#0D9488" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default YearlySummaryChart;
