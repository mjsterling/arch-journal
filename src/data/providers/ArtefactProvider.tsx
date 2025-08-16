"use client";
import React, { createContext, useEffect, useState } from "react";
import artefactDataRaw from "../artefacts.json";
import { useContext } from "react";
import { ArtefactStates } from "../constants/Artefact";
import { CollectionNames } from "../constants/Collections";
import { Materials } from "../constants/Materials";
import { DigsiteNames } from "../constants/Digsites";

export enum Screens {
  Artefacts = "Artefacts",
  Collections = "Collections",
  Materials = "Materials",
}

type RawArtefact = {
  name: string;
  image: string;
  hotspot: string;
  collections: string[];
  mysteries?: string[];
  researchers?: string[];
  misc?: string[];
  quests?: string[];
  level: number;
  xp: number;
  chronotes: number;
  digsite: DigsiteNames;
  materials: { [P in Materials]?: number };
};

export type Artefact = {
  name: string;
  image: string;
  hotspot: string;
  collections: { [P in CollectionNames]: ArtefactStates };
  mysteries: { [key: string]: ArtefactStates };
  researchers: { [key: string]: ArtefactStates };
  misc: { [key: string]: ArtefactStates };
  quests: { [key: string]: ArtefactStates };
  count: {
    damaged: number;
    restored: number;
  };
  level: number;
  xp: number;
  chronotes: number;
  digsite: DigsiteNames;
  materials: { [P in Materials]?: number };
};

const artefactContext = createContext<{
  artefacts: Artefact[];
  setArtefact: (artefact: Artefact) => void;
  isComplete: (artefact: Artefact) => boolean;
}>({ artefacts: [], setArtefact: () => {}, isComplete: () => false });

export default function ArtefactProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [artefacts, setArtefacts] = useState<Artefact[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const importArtefacts = () => {
    setLoading(true);
    const artefactData = artefactDataRaw as RawArtefact[];
    const artefactState = window.localStorage.getItem("arch-journal-artefacts");
    let artefactStateParsed: Array<{
      name: string;
      collections: { [key: string]: ArtefactStates };
      mysteries: { [key: string]: ArtefactStates };
      researchers: { [key: string]: ArtefactStates };
      quests: { [key: string]: ArtefactStates };
      misc: { [key: string]: ArtefactStates };
      count?: {
        damaged: number;
        restored: number;
      };
    }> | null = null;
    if (artefactState) {
      artefactStateParsed = JSON.parse(artefactState);
    }
    const mappedArtefactData: Artefact[] = artefactData.map((artefact) => {
      const artefactState = {
        collections: {} as { [P in CollectionNames]: ArtefactStates },
        mysteries: {} as { [key: string]: ArtefactStates },
        researchers: {} as { [key: string]: ArtefactStates },
        quests: {} as { [key: string]: ArtefactStates },
        misc: {} as { [key: string]: ArtefactStates },
        count: { damaged: 0, restored: 0 },
      };
      const foundArtefact = artefactStateParsed?.find(
        (_artefact) => _artefact.name === artefact.name
      );
      for (const collection of artefact.collections as unknown as string[]) {
        artefactState.collections[collection] =
          foundArtefact?.collections?.[collection] ?? ArtefactStates.NotFound;
      }
      if (artefact.mysteries) {
        for (const mystery of artefact.mysteries as unknown as string[]) {
          artefactState.mysteries[mystery] =
            foundArtefact?.mysteries?.[mystery] ?? ArtefactStates.NotFound;
        }
      }
      if (artefact.researchers) {
        for (const researcher of artefact.researchers as unknown as string[]) {
          artefactState.researchers[researcher] =
            foundArtefact?.researchers?.[researcher] ?? ArtefactStates.NotFound;
        }
      }
      if (artefact.quests) {
        for (const quest of artefact.quests as unknown as string[]) {
          artefactState.quests[quest] =
            foundArtefact?.quests?.[quest] ?? ArtefactStates.NotFound;
        }
      }
      if (artefact.misc) {
        for (const misc of artefact.misc as unknown as string[]) {
          artefactState.misc[misc] =
            foundArtefact?.misc?.[misc] ?? ArtefactStates.NotFound;
        }
      }
      artefactState.count = {
        damaged: foundArtefact?.count?.damaged ?? 0,
        restored: foundArtefact?.count?.restored ?? 0,
      };
      return {
        ...artefact,
        image:
          "/assets/artefacts/" + artefact.name.replace(/[ \/]/g, "_") + ".png",
        collections: artefactState.collections,
        mysteries: artefactState.mysteries,
        researchers: artefactState.researchers,
        misc: artefactState.misc,
        quests: artefactState.quests,
        count: artefactState.count,
      };
    });

    setArtefacts(mappedArtefactData);

    setLoading(false);
  };

  useEffect(importArtefacts, []);
  const setArtefact = (newArtefact: Artefact) => {
    const index = artefacts.findIndex((a) => a.name === newArtefact.name);
    const newArtefacts = [
      ...artefacts.slice(0, index),
      newArtefact,
      ...artefacts.slice(index + 1),
    ];
    setArtefacts(newArtefacts);
  };

  const saveArtefactState = () => {
    const artefactState = artefacts.map((artefact) => ({
      name: artefact.name,
      collections: artefact.collections ?? {},
      mysteries: artefact.mysteries ?? {},
      researchers: artefact.researchers ?? {},
      quests: artefact.quests ?? {},
      misc: artefact.misc ?? {},
    }));
    window.localStorage.setItem(
      "arch-journal-artefacts",
      JSON.stringify(artefactState)
    );
  };
  useEffect(saveArtefactState, [artefacts]);

  const isComplete = (artefact: Artefact) =>
    Object.values(artefact.collections).every(
      (status) => status === "Completed"
    ) &&
    Object.values(artefact.mysteries ?? {}).every(
      (status) => status === "Completed"
    ) &&
    Object.values(artefact.researchers ?? {}).every(
      (status) => status === "Completed"
    ) &&
    Object.values(artefact.quests ?? {}).every(
      (status) => status === "Completed"
    ) &&
    Object.values(artefact.misc ?? {}).every(
      (status) => status === "Completed"
    );
  return (
    <artefactContext.Provider value={{ artefacts, setArtefact, isComplete }}>
      {loading ? null : children}
    </artefactContext.Provider>
  );
}

export const useArtefacts = () => {
  const context = useContext(artefactContext);
  if (!context) {
    throw new Error("useArtefact must be used within a artefactProvider");
  }
  return context;
};
