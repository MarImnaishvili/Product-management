import { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";

const getData = [
  { asset: "Stocks", amount: 60000 },
  { asset: "Bonds", amount: 40000 },
  { asset: "Cash", amount: 7000 },
  { asset: "Real Estate", amount: 5000 },
  { asset: "Commodities", amount: 3000 },
];

export const PieChart = () => {
  const [options, setOptions] = useState<AgChartOptions | null>(null);

  useEffect(() => {
    const totalAmount = getData.reduce((sum, item) => sum + item.amount, 0);

    setOptions({
      data: getData,
      title: {
        text: "Portfolio Composition",
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
      },
      series: [
        {
          type: "pie",
          angleKey: "amount",
          calloutLabelKey: "asset",
          calloutLabel: {
            fontWeight: "bold", // 🔥 Bold text
            fontSize: 12, // Optional: Adjust font size
            color: "#333", // Optional: Darker text for better visibility
          },
          sectorLabelKey: "amount",
          sectorLabel: {
            color: "white",
            fontWeight: "bold",
            formatter: ({ value }) =>
              `${((value / totalAmount) * 100).toFixed(1)}%`,
          },
          fills: ["#4E79A7", "#F28E2B", "#E15759", "#76B7B2", "#59A14F"],
          strokes: ["#3A5A8D", "#D0711F", "#B63D47", "#5E938F", "#44883E"],
          // Soft outline
        },
      ],
    });
  }, []);

  return (
    <div
      style={{
        width: "600px",
        height: "600px",
        borderRadius: "10px",
        overflow: "hidden", // Clips the overflowing chart to match border radius
        backgroundColor: "white",
      }}
    >
      {options && (
        <AgCharts
          options={options}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      )}
    </div>
  );
};
