import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getStoredTheme, setStoredTheme, toggleStoredTheme } from '../utils/themeSettings';

const ThemeContext = createContext({
  theme: 'dark',
  isDarkMode: true,
  setTheme: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => getStoredTheme());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const setTheme = (nextTheme) => {
    setStoredTheme(nextTheme);
    setThemeState(nextTheme);
  };

  const toggleTheme = () => {
    setThemeState((currentTheme) => toggleStoredTheme(currentTheme));
  };

  const value = useMemo(
    () => ({
      theme,
      isDarkMode: theme === 'dark',
      setTheme,
      toggleTheme,
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
