import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Context
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Determine initial theme from localStorage or system preference
  const getInitialTheme = () => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Apply theme class to <html> root for global CSS
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  // Cool gradient background based on theme
  const backgroundStyle = {
    background: theme === 'dark'
      ? 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)'
      : 'linear-gradient(135deg, #ff9a9e, #fad0c4)'
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, backgroundStyle }}>
      {children}
    </ThemeContext.Provider>
  );
};
