import { ReactNode, startTransition, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";

export type ThemeType = "light" | "dark";
export interface ThemeProviderProps {
  children: ReactNode;
}

export interface ThemeContext {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

export const themeContext = createContext<ThemeContext>({} as ThemeContext);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeType>("dark");

  const handleToggleTheme = useCallback(() => {
    startTransition(() => {
      setTheme((theme) => {
        const isDarkTheme = theme === "dark";
        const currentTheme = isDarkTheme ? "light" : "dark";
        localStorage.setItem("theme", currentTheme);

        return currentTheme;
      });
    });
  }, [setTheme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);

      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme]);

  const isDarkTheme = theme === "dark";

  return (
    <themeContext.Provider
      value={{
        isDarkTheme,
        toggleTheme: handleToggleTheme,
      }}
    >
      {children}
    </themeContext.Provider>
  );
}
