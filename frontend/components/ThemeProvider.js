import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

/**
 * Theme provider component
 * Manages dark/light mode and theme preferences
 * Persists user theme choice in local storage
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Child components to be wrapped
 * @returns {JSX.Element} Theme context provider with children
 */
export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      applyTheme(savedTheme === 'dark');
    } else {
      setIsDarkMode(prefersDark);
      applyTheme(prefersDark);
    }
  }, []);

  const applyTheme = (isDark) => {
    // Apply both the Tailwind dark class and data-theme attribute
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newValue = !prev;
      localStorage.setItem('theme', newValue ? 'dark' : 'light');
      applyTheme(newValue);
      return newValue;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook for accessing theme context
 * @returns {Object} Theme context with current theme and setter function
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 