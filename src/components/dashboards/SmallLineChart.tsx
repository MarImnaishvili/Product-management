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
      }}
    >
      <AgCharts options={options as AgChartOptions} />
    </div>
  );
};
