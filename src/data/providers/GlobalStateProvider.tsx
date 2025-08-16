'use client';
import React, { createContext, useEffect, useState } from 'react';
import { useContext } from 'react';
import { ContextMenu } from '@/components';
import { Materials, emptyMaterialStorage } from '@/data/constants';

type GlobalStateContext = {
  materialStorage: {
    [P in Materials]: number;
  };
  updateMaterialStorage: (material: Materials, amount: number) => void;
  activeCollection: string;
  setActiveCollection: (collection: string) => void;
};

const globalStateContext = createContext<GlobalStateContext>({
  materialStorage: { ...emptyMaterialStorage },
  updateMaterialStorage: () => {},
  activeCollection: '',
  setActiveCollection: () => {},
});

export function GlobalStateProvider({ children }: { children: React.ReactNode }) {
  const [activeCollection, setActiveCollection] = useState<string>('');

  const [materialStorage, setMaterialStorage] = useState<{
    [P in Materials]: number;
  }>({ ...emptyMaterialStorage });
  useEffect(() => {
    const materialStorageState = window.localStorage.getItem('arch-journal-materialStorage');
    if (materialStorageState) {
      setMaterialStorage(JSON.parse(materialStorageState));
    }
  }, []);

  const updateMaterialStorage = (material: Materials, amount: number) => {
    setMaterialStorage((prev) => ({
      ...prev,
      [material]: amount,
    }));
    window.localStorage.setItem(
      'arch-journal-materialStorage',
      JSON.stringify({
        ...materialStorage,
        [material]: amount,
      })
    );
  };

  return (
    <globalStateContext.Provider
      value={{
        activeCollection,
        setActiveCollection,
        materialStorage,
        updateMaterialStorage,
      }}
    >
      <ContextMenu />
      {children}
    </globalStateContext.Provider>
  );
}

export const useGlobalState = () => {
  const context = useContext(globalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
