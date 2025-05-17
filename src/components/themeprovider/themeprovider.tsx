// Updated ThemeProvider with toggle functionality
// components/themeprovider/themeprovider.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

// Create a context to share theme state across components
type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ 
  theme: 'light', 
  toggleTheme: () => {} 
});

// Export hook for easy access to theme context
export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [theme, setTheme] = useState<string>('light');
  
  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
      setTheme(initialTheme);
      
      document.documentElement.classList.toggle('dark', initialTheme === 'dark');
      console.log('Theme initialized:', initialTheme); // Debug log
    }
  }, []);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Update DOM and localStorage
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
    
    console.log('Theme toggled to:', newTheme); // Debug log
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}