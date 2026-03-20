import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("tez-theme") || "sunrise");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("tez-theme", theme);
  }, [theme]);

  const value = {
    theme,
    toggleTheme: () => setTheme((current) => (current === "sunrise" ? "midnight" : "sunrise")),
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
