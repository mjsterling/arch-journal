'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Settings = {
  colorblindMode: boolean;
  showCompletedArtefacts: boolean;
  showCompletedCollections: boolean;
  importData(): void;
  exportData(): void;
  toggleColorblindMode: () => void;
  toggleShowCompletedArtefacts: () => void;
  toggleShowCompletedCollections: () => void;
};

const SettingsContext = createContext<Settings>({
  colorblindMode: false,
  showCompletedArtefacts: false,
  showCompletedCollections: false,
  importData: () => {},
  exportData: () => {},
  toggleColorblindMode: () => {},
  toggleShowCompletedArtefacts: () => {},
  toggleShowCompletedCollections: () => {},
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState({
    colorblindMode: false,
    showCompletedArtefacts: false,
    showCompletedCollections: false,
  });
  useEffect(() => {
    const storedMode = window.localStorage.getItem('arch-journal-settings-colorblindMode');
    setSettings((prev) => ({ ...prev, colorblindMode: storedMode === 'true' }));
  }, []);
  const toggleColorblindMode = () => {
    setSettings((prev) => ({ ...prev, colorblindMode: !prev.colorblindMode }));
  };

  useEffect(() => {
    window.localStorage.setItem('arch-journal-settings', JSON.stringify(settings));
  }, [settings]);

  const importData = async () => {
    if (confirm('Are you sure you want to import data from the clipboard?')) {
      try {
        const decodedData = await navigator.clipboard.readText().then((data) => {
          return atob(data);
        });
        const parsedData = JSON.parse(decodedData);

        window.localStorage.setItem('arch-journal-artefacts', JSON.stringify(parsedData.artefacts));
        window.localStorage.setItem('arch-journal-materialStorage', JSON.stringify(parsedData.materialStorage));
        window.localStorage.setItem('arch-journal-settings', JSON.stringify(parsedData.settings));
        window.location.reload();
      } catch (error) {
        console.error('Failed to read clipboard contents:', error);
      }
    }
  };

  const exportData = () => {
    const artefacts = window.localStorage.getItem('arch-journal-artefacts');
    const materialStorage = window.localStorage.getItem('arch-journal-materialStorage');
    const settings = window.localStorage.getItem('arch-journal-settings');

    const data = {
      artefacts: artefacts ? JSON.parse(artefacts) : {},
      materialStorage: materialStorage ? JSON.parse(materialStorage) : {},
      settings: settings ? JSON.parse(settings) : {},
    };

    try {
      navigator.clipboard.writeText(btoa(JSON.stringify(data)));
      alert('Data copied to clipboard.');
    } catch (err) {
      console.error('Failed to copy data to clipboard', err);
    }
  };

  const toggleShowCompletedArtefacts = () => {
    setSettings((prev) => ({
      ...prev,
      showCompletedArtefacts: !prev.showCompletedArtefacts,
    }));
  };
  const toggleShowCompletedCollections = () => {
    setSettings((prev) => ({
      ...prev,
      showCompletedCollections: !prev.showCompletedCollections,
    }));
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        importData,
        exportData,
        toggleShowCompletedArtefacts,
        toggleShowCompletedCollections,
        toggleColorblindMode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
