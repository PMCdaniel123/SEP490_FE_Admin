// src/components/ThemeToggle.tsx
import React, { useContext } from 'react';

import { Button } from 'antd';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { ThemeContext } from '@/contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <Button 
      onClick={toggleTheme}
      className="flex items-center justify-center"
      type="text"
      icon={isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
    >
      {isDarkMode ? 'Chế độ sáng' : 'Chế độ tối'}
    </Button>
  );
};

export default ThemeToggle;
