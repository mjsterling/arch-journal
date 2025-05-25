'use client';
import { useEffect, useState } from 'react';

export const useSettings = () => {
  const [colorblindMode, setColorblindMode] = useState<boolean>(false);
  useEffect(() => {
    const storedMode = window.localStorage.getItem(
      'arch-journal-settings-colorblindMode'
    );

    setColorblindMode(storedMode === 'true');
  }, []);
  const toggleColorblindMode = () => {
    setColorblindMode((prev) => !prev);
  };

  useEffect(() => {
    window.localStorage.setItem(
      'arch-journal-settings-colorblindMode',
      String(colorblindMode)
    );
  }, [colorblindMode]);

  return {
    colorblindMode,
    toggleColorblindMode,
  };
};
