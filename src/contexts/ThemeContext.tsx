import React, { createContext, useContext, useEffect, useState } from 'react';
import { logger } from 'utils/SecureLogger';
import { colors } from '../theme/colors';
import { ThemeContextType, ThemeOptions } from '../types/types';
import StorageService from '../utils/StorageService';

const initialContext: ThemeContextType = {
  theme: ThemeOptions.dark,
  setTheme: () => {},
  themeColors: colors[ThemeOptions.dark],
};

const ThemeContext = createContext<ThemeContextType>(initialContext);

const useTheme = () => {
  return useContext(ThemeContext);
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeOptions>(ThemeOptions.dark);
  const themeColors = colors[theme];

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await StorageService.getItem<ThemeOptions>(StorageService.storageKeys.theme, false);
      if (storedTheme === ThemeOptions.dark || storedTheme === ThemeOptions.light) {
        setThemeState(storedTheme);
      }
    };

    loadTheme();
  }, []);

  const setTheme = (value: ThemeOptions) => {
    setThemeState(value);
    StorageService.storeItem<ThemeOptions>(StorageService.storageKeys.theme, value, false).catch((error) => {
      // Handle storage error if needed
      logger.error('Failed to save theme preference:', { error });
    });
  };
  return (
    <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme, themeColors: themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeOptions, useTheme };
