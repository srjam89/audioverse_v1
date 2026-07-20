import { createContext, useContext } from "react";

const ThemeContext = createContext(undefined);

function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}

export { ThemeContext, useTheme };
