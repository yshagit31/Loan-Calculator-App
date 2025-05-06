import React, { createContext, useContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

// 1. Create the context
const GlobalContext = createContext();

// 2. Custom hook for easy access
export const useGlobalContext = () => useContext(GlobalContext);

// 3. Context provider component
export const GlobalProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [mode, setMode] = useState('light');

  // Toggle between light and dark modes
  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Theme configuration using Material UI's createTheme
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <GlobalContext.Provider value={{ currency, setCurrency, mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </GlobalContext.Provider>
  );
};
