import Box from "@mui/material/Box";
import { Footer } from "./Footer";
import Header from "./Header";
import SideMenu from "./SideMenu";
import { Outlet } from "react-router-dom";
import Stack from "@mui/material/Stack";
import AppTheme from "../theme/AppTheme";
// import IconButton from "@mui/material/IconButton";
// import { Brightness4, Brightness7 } from "@mui/icons-material";

export default function Layout() {
  // const { toggleTheme, themeMode } = useThemeMode();

  return (
    <AppTheme>
      <Box sx={{ display: "flex" }}>
        <SideMenu />

        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              //mx: 3, // Sets horizontal margin (margin-left & margin-right) to 3 (MUI spacing unit)
              p: 5, // Sets bottom padding to 5 (MUI spacing unit)
              mt: { xs: 8, md: 0 }, // Sets top margin dynamically for different screen sizes
              backgroundColor: "#ebf3f3",
            }}
          >
            <Header />

            {/* Button to toggle theme */}
            {/* <IconButton onClick={toggleTheme} color="inherit">
              {themeMode === "light" ? <Brightness4 /> : <Brightness7 />}
            </IconButton> */}

            <Outlet />

            <Footer />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
