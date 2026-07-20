import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { ThemeContext } from "@/context/theme-context";

const themes = new Set(["light", "dark", "system"]);

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getInitialTheme(storageKey, defaultTheme) {
  const savedTheme = localStorage.getItem(storageKey);
  return themes.has(savedTheme) ? savedTheme : defaultTheme;
}

export default function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
}) {
  const [theme, setTheme] = useState(() =>
    getInitialTheme(storageKey, defaultTheme),
  );
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);
  const resolvedTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event) =>
      setSystemTheme(event.matches ? "dark" : "light");

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      resolvedTheme === "dark",
    );
    document.documentElement.style.colorScheme = resolvedTheme;
    localStorage.setItem(storageKey, theme);
  }, [resolvedTheme, storageKey, theme]);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme]);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [resolvedTheme, theme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
