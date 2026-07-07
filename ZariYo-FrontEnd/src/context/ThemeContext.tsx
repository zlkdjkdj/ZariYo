import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // 1. localStorage에 저장된 이전 테마 확인
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    // 2. 시스템 기본 테마 확인
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return systemTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // 테마 클래스 제거 후 새로 설정
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // 로컬스토리지에 동기화
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
