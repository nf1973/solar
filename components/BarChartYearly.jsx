import { getYearlySummary } from "@/app/actions";
import { useState, useEffect } from "react";
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

const { Card, CardHeader, CardContent } = require("./ui/card");

const BarChartYearly = ({ startYear, endYear }) => {
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

  const kWhFormatter = (num) => {
    return (num / 1000).toFixed(1);
  };

  const transformedData = data.map((item) => ({
    "Total Energy Generated": kWhFormatter(item.totalEnergy),
    date: item.date,
  }));

  console.log(data);
  return (
    <Card className="w-fit">
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

export default BarChartYearly;
