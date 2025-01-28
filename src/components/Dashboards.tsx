/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import { LineChart } from "./LineChart";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ChartService } from "../services/ChartService";
import { TProductChart } from "../types";

export const Dashboards = () => {
  const [fetchedArray, setFetchedArray] = useState<TProductChart[] | null>(
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
        const fetchedProductChartData: TProductChart[] =
          await ChartService.getProductQuantityChart();
        setFetchedArray(fetchedProductChartData);
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
  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      <Typography variant="h1" sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        Dashboard
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          gap: "20px",
          flexDirection: "row",
        }}
      >
        {fetchedArray?.map((fetchedObject, index) => (
          <LineChart
            key={index} // If no unique ID is available, use the index as a fallback (not ideal for reordering)
            title={fetchedObject.title}
            data={fetchedObject.data}
            xKeyName={fetchedObject.xKeyName}
            yKeyName={fetchedObject.yKeyName}
            YName={capitalizeFirstLetter(fetchedObject.yKeyName)}
          />
        ))}
      </Box>
    </>
  );
};
