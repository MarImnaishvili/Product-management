import Box from "@mui/material/Box";
import { LineChart } from "./LineChart";
import { Typography } from "@mui/material";

export const Dashboards = () => {
  return (
    <>
      <Typography variant="h1" sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        Dashboard
      </Typography>
      <Box sx={{ display: "flex" }}>
        <LineChart />
        <LineChart />
        <LineChart />
        <LineChart />
      </Box>
    </>
  );
};
