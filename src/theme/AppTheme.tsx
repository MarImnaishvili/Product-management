import { createContext, useContext, useState, ReactNode } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { PaletteMode } from "@mui/material";

// Define the context for theme mode
const ThemeContext = createContext({
  toggleTheme: () => {},
  themeMode: "light" as PaletteMode,
});

export const useThemeMode = () => useContext(ThemeContext);

interface AppThemeProps {
  children: ReactNode;
}

const AppTheme = ({ children }: AppThemeProps) => {
  const [themeMode, setThemeMode] = useState<PaletteMode>("light");

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  return (
    <ThemeContext.Provider value={{ toggleTheme, themeMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Ensures baseline styles are applied */}
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default AppTheme;
