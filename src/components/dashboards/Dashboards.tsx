/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import { SmallLineChart } from "./SmallLineChart";
import { LargeLineChart } from "./LargeLineChart";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ChartService } from "../../services/ChartService";
import { TProductChart } from "../../types";
import { PieChart } from "./PieChart";

export const Dashboards = () => {
  const [fetchedObject, setFetchedObject] = useState<TProductChart | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<{
    message: string;
    httpCode: number;
  } | null>(null);

  useEffect(() => {
    const fetchProductChartData = async () => {
      try {
        const fetchedProductChartData: TProductChart =
          await ChartService.getProductQuantityChart();
        console.log(fetchedProductChartData);
        setFetchedObject(fetchedProductChartData);
      } catch (error: any) {
        setError({
          message:
            error?.response?.data?.errorDetails || "Error fetching products",
          httpCode: error?.response?.status || 500,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProductChartData();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return (
      <Typography color="error">
        Error: {error.message} (HTTP {error.httpCode})
      </Typography>
    );
  }
  // function capitalizeFirstLetter(str: string) {
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // }

  return (
    <>
      <Typography variant="h1" sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        Dashboard
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        <SmallLineChart
          title={fetchedObject?.title ?? "Default Title"}
          data={fetchedObject?.data ?? [{ period: "N/A", quantity: 0 }]}
          xKeyName={fetchedObject?.xKeyName ?? "period"}
          yKeyName={fetchedObject?.yKeyName ?? "quantity"}
          YName={fetchedObject?.yKeyName ?? "Quantity"}
          color="#A8E6CF"
          markerColor="#A8E6CF"
        />
        <SmallLineChart
          title={fetchedObject?.title ?? "Default Title"}
          data={fetchedObject?.data ?? [{ period: "N/A", quantity: 0 }]}
          xKeyName={fetchedObject?.xKeyName ?? "period"}
          yKeyName={fetchedObject?.yKeyName ?? "quantity"}
          YName={fetchedObject?.yKeyName ?? "Quantity"}
          color="#FFD3B6"
          markerColor="#FFD3B6"
        />
        <SmallLineChart
          title={fetchedObject?.title ?? "Default Title"}
          data={fetchedObject?.data ?? [{ period: "N/A", quantity: 0 }]}
          xKeyName={fetchedObject?.xKeyName ?? "period"}
          yKeyName={fetchedObject?.yKeyName ?? "quantity"}
          YName={fetchedObject?.yKeyName ?? "Quantity"}
          color="#AEC6CF"
          markerColor="#AEC6CF"
        />
        <SmallLineChart
          title={fetchedObject?.title ?? "Default Title"}
          data={fetchedObject?.data ?? [{ period: "N/A", quantity: 0 }]}
          xKeyName={fetchedObject?.xKeyName ?? "period"}
          yKeyName={fetchedObject?.yKeyName ?? "quantity"}
          YName={fetchedObject?.yKeyName ?? "Quantity"}
          color="#BDBDBD"
          markerColor="#BDBDBD"
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <LargeLineChart
          title={fetchedObject?.title ?? "Default Title"}
          data={fetchedObject?.data ?? [{ period: "N/A", quantity: 0 }]}
          xKeyName={fetchedObject?.xKeyName ?? "period"}
          yKeyName={fetchedObject?.yKeyName ?? "quantity"}
          YName={fetchedObject?.yKeyName ?? "Quantity"}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PieChart />
      </Box>
    </>
  );
};
