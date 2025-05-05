// found this cool way to share state between components!
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

// make a provider component
export function ThemeProvider({ children }) {
  // keep track of dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // function to toggle dark mode
  const toggleDarkMode = () => {
    console.log('toggling dark mode');
    setIsDarkMode(!isDarkMode);
  };

  // share these values with other components
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// helper to use the theme
export function useTheme() {
  return useContext(ThemeContext);
} 