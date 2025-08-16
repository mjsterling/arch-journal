"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Settings = {
  settings: { colorblindMode: boolean };
  importData(): void;
  exportData(): void;
  toggleColorblindMode: () => void;
};

const SettingsContext = createContext<Settings>({
  settings: { colorblindMode: false },
  importData: () => {},
  exportData: () => {},
  toggleColorblindMode: () => {},
});

export default function SettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useState<{ colorblindMode: boolean }>({
    colorblindMode: false,
  });
  useEffect(() => {
    const storedMode = window.localStorage.getItem(
      "arch-journal-settings-colorblindMode"
    );
    setSettings((prev) => ({ ...prev, colorblindMode: storedMode === "true" }));
  }, []);
  const toggleColorblindMode = () => {
    setSettings((prev) => ({ ...prev, colorblindMode: !prev.colorblindMode }));
  };

  useEffect(() => {
    window.localStorage.setItem(
      "arch-journal-settings",
      JSON.stringify(settings)
    );
  }, [settings]);

  const importData = async () => {
    try {
      const decodedData = await navigator.clipboard.readText().then((data) => {
        return atob(data);
      });
      const parsedData = JSON.parse(decodedData);

      window.localStorage.setItem(
        "arch-journal-artefacts",
        JSON.stringify(parsedData.artefacts)
      );
      window.localStorage.setItem(
        "arch-journal-materialStorage",
        JSON.stringify(parsedData.materialStorage)
      );
      window.localStorage.setItem(
        "arch-journal-settings",
        JSON.stringify(parsedData.settings)
      );
    } catch (error) {
      console.error("Failed to read clipboard contents:", error);
    }
  };

  const exportData = () => {
    const artefacts = window.localStorage.getItem("arch-journal-artefacts");
    const materialStorage = window.localStorage.getItem(
      "arch-journal-materialStorage"
    );
    const settings = window.localStorage.getItem("arch-journal-settings");

    const data = {
      artefacts: artefacts ? JSON.parse(artefacts) : {},
      materialStorage: materialStorage ? JSON.parse(materialStorage) : {},
      settings: settings ? JSON.parse(settings) : {},
    };

    try {
      navigator.clipboard.writeText(btoa(JSON.stringify(data)));
      alert("Data copied to clipboard.");
    } catch (err) {
      console.error("Failed to copy data to clipboard", err);
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        importData,
        exportData,
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
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
