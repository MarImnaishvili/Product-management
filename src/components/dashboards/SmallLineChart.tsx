import { useEffect, useState } from "react";
import { AgCharts } from "ag-charts-react";
import { LineChartProps, TLineChart } from "../../types";
import { AgChartOptions } from "ag-charts-community";

export const SmallLineChart: React.FC<
  LineChartProps & { color?: string; markerColor?: string }
> = ({
  title,
  data,
  xKeyName,
  yKeyName,
  YName,
  color = "#AEC6CF",
  markerColor = "#AEC6CF",
}) => {
  const [options, setOptions] = useState<TLineChart | null>(null);

  useEffect(() => {
    if (title && data) {
      setOptions({
        title: {
          text: title || "Default Title",
          fontSize: 14, // Adjust size if needed
          fontWeight: "bold", // 🔥 Bold title
          color: "#333", // Optional: Darker text for better visibility
        },
        data: data || [],
        series: [
          {
            type: "line",
            xKey: xKeyName || "defaultXKey",
            yKey: yKeyName || "defaultYKey",
            yName: YName || "defaultYName",
            stroke: color,
            strokeWidth: 2,
            marker: {
              size: 3, // Adjust the spot size
              fill: markerColor, // Spot (marker) color
              stroke: color, // Outline of the spot
              strokeWidth: 2,
            },
          },
        ],
      });
    }
  }, [title, data, xKeyName, yKeyName, YName, color, markerColor]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        overflow: "hidden", // Clips the overflowing chart to match border radius
        backgroundColor: "white", // Helps visualize the rounded corners
      }}
    >
      <AgCharts options={options as AgChartOptions} />
    </div>
  );
};
