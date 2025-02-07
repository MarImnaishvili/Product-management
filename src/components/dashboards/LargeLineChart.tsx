import { useEffect, useState } from "react";
import { AgCharts } from "ag-charts-react";
import { LineChartProps, TLineChart } from "../../types";
import { AgChartOptions } from "ag-charts-community";

export const LargeLineChart: React.FC<LineChartProps> = ({
  title,
  data,
  xKeyName,
  yKeyName,
  YName,
}) => {
  const [options, setOptions] = useState<TLineChart | null>(null);

  useEffect(() => {
    if (title && data) {
      setOptions({
        title: {
          text: title || "Default Title",
          fontSize: 18,
          fontWeight: "bold",
          color: "#333",
        },
        data: data || [],
        series: [
          {
            type: "line",
            xKey: xKeyName || "defaultXKey",
            yKey: yKeyName || "defaultYKey",
            yName: YName || "defaultYName",
          },
        ],
      });
    }
  }, [title, data, xKeyName, yKeyName, YName]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        overflow: "hidden", // Clips the overflowing chart to match border radius
        backgroundColor: "white",
      }}
    >
      <AgCharts options={options as AgChartOptions} />
    </div>
  );
};
