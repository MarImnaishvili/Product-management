import Box from "@mui/material/Box";
import { Footer } from "./Footer";
import Header from "./Header";
import SideMenu from "./SideMenu";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
          <Header />
          <Outlet />
          <Footer />
        </Box>
      </Box>
    </>
  );
}
