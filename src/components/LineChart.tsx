import { useEffect, useState } from "react";
import { AgCharts } from "ag-charts-react";
import { TLineChart } from "../types";
import { AgChartOptions } from "ag-charts-community";

const getData = (): TLineChart["data"] => [
  {
    quarter: "Q1",
    petrol: 200,
    diesel: 100,
  },
  {
    quarter: "Q2",
    petrol: 300,
    diesel: 130,
  },
  {
    quarter: "Q3",
    petrol: 350,
    diesel: 160,
  },
  {
    quarter: "Q4",
    petrol: 400,
    diesel: 200,
  },
];

export const LineChart: React.FC = () => {
  const [options, setOptions] = useState<TLineChart | null>(null);
  useEffect(() => {
    setOptions({
      title: {
        text: "Annual Fuel Expenditure",
      },
      data: getData(),
      series: [
        {
          type: "line",
          xKey: "quarter",
          yKey: "petrol",
          yName: "Petrol",
        },
        {
          type: "line",
          xKey: "quarter",
          yKey: "diesel",
          yName: "Diesel",
        },
      ],
    });
  }, []);

  if (!options) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: "100%", height: "200px" }}>
      <AgCharts options={options as unknown as AgChartOptions} />
    </div>
  );
};
