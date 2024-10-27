import Box from "@mui/material/Box";
import "./App.css";
import AgGrid from "./components/AgGrid";
import { Footer } from "./components/Footer";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";

const App = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
          <Header />
          <AgGrid />
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default App;
