"use client";
import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import ContextMenu from "@/components/ContextMenu";
import { Materials } from "@/data/constants/Materials";
import { useRouter } from "next/navigation";
import { emptyMaterialStorage } from "@/data/constants/MaterialStorage";

type GlobalStateContext = {
  wiki: (query: string) => void;
  materialStorage: {
    [P in Materials]: number;
  };
  updateMaterialStorage: (material: Materials, amount: number) => void;
  activeCollection: string;
  setActiveCollection: (collection: string) => void;
};

const globalStateContext = createContext<GlobalStateContext>({
  wiki: () => {},
  materialStorage: { ...emptyMaterialStorage },
  updateMaterialStorage: () => {},
  activeCollection: "",
  setActiveCollection: () => {},
});

export default function GlobalStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [highlightedCollection, setHighlightedCollection] =
    useState<string>("");
  const goToCollection = (collection: string, immediate: boolean = false) => {};
  useEffect(() => {
    setTimeout(() => {
      if (highlightedCollection) setHighlightedCollection("");
    }, 10000);
  }, [highlightedCollection]);

  const goToArtefact = (artefact: string, immediate: boolean = false) => {
    router.push(`/?highlight=${encodeURIComponent(artefact)}`);
  };

  const [activeCollection, setActiveCollection] = useState<string>("");
  const goToPlanner = (collection: string) => {
    router.push(`/planner?collection=${encodeURIComponent(collection)}`);
    setActiveCollection(collection);
  };

  const wiki = (query: string) => {
    window.open(
      `https://runescape.wiki/w/${query.replace(/ /g, "_")}`,
      "_blank"
    );
  };

  const [materialStorage, setMaterialStorage] = useState<{
    [P in Materials]: number;
  }>({ ...emptyMaterialStorage });
  useEffect(() => {
    const materialStorageState = window.localStorage.getItem(
      "arch-journal-materialStorage"
    );
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
      "arch-journal-materialStorage",
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

        wiki,
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
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
