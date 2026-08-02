import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // 1. localStorage에 저장된 이전 테마 확인
    const savedTheme = (localStorage.getItem('zariyo_theme') || localStorage.getItem('theme')) as Theme | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    // 2. 기본값 light 모드
    return 'light';
  });

  const isDarkMode = theme === 'dark';

  useEffect(() => {
    const root = window.document.documentElement;
    
    // 테마 클래스 제거 후 새로 설정
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // 로컬스토리지 동기화
    localStorage.setItem('theme', theme);
    localStorage.setItem('zariyo_theme', theme);

    // 스토리지 이벤트 전파
    window.dispatchEvent(new Event('storage'));
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    // Fallback if not wrapped in Provider
    const isDark = (localStorage.getItem('zariyo_theme') || localStorage.getItem('theme')) === 'dark';
    return {
      theme: (isDark ? 'dark' : 'light') as Theme,
      isDarkMode: isDark,
      toggleTheme: () => {},
    };
  }
  return context;
}
