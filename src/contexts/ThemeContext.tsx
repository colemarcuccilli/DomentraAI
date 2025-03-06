import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Create context with default values to prevent undefined errors
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {}
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Use a safer approach to initialize state
  const [theme, setTheme] = useState<Theme>('light');
  
  // Initialize theme in a separate useEffect to avoid SSR issues
  useEffect(() => {
    try {
      // Check if theme is stored in localStorage
      const savedTheme = localStorage.getItem('theme');
      // Check if user prefers dark mode
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // Set the theme based on saved preference or system preference
      setTheme((savedTheme as Theme) || (prefersDark ? 'dark' : 'light'));
    } catch (error) {
      console.error('Error initializing theme:', error);
      // Default to light theme if there's an error
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    try {
      // Update localStorage when theme changes
      localStorage.setItem('theme', theme);
      
      // Update document class for styling
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const contextValue = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  return context;
};

export default ThemeContext; 