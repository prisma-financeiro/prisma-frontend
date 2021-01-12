import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  PropsWithChildren,
} from 'react';

import { storageKey } from '../utils';

export type ThemeState = 'light' | 'dark';

export type AppThemeContextProps = {
  currentTheme: ThemeState;
  toggleTheme(): void;
};

const AppThemeContext = createContext<AppThemeContextProps | null>(null);

export const AppThemeProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeState>(() => {
    const storedTheme = localStorage.getItem(storageKey('theme')) as ThemeState;
    return storedTheme ? JSON.parse(storedTheme) : 'dark';
  });

  const toggleTheme = useCallback(() => {
    setCurrentTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem(storageKey('theme'), JSON.stringify(newTheme));

      return newTheme;
    });
  }, []);

  const value = React.useMemo(
    () => ({
      currentTheme,
      toggleTheme,
    }),
    [currentTheme, toggleTheme],
  );

  return (
    <AppThemeContext.Provider value={value}>
      {children}
    </AppThemeContext.Provider>
  );
};

const useAppTheme = (): AppThemeContextProps => {
  const context = useContext(AppThemeContext);

  if (!context) {
    throw new Error(`useAppTheme must be used within an AppThemeProvider`);
  }

  return context;
};

export default useAppTheme;
