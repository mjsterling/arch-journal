import React, { createContext, useEffect, useState } from 'react';
import artefactDataRaw from './artefacts.json';
import { useContext } from 'react';
import { ArtefactStates } from './Artefact';
import { CollectionNames } from './Collections';
import { Materials } from './Materials';
import { DigsiteNames } from './Digsites';

export enum Screens {
  Artefacts = 'Artefacts',
  Collections = 'Collections',
  Materials = 'Materials',
}

export type Artefact = {
  name: string;
  image: string;
  hotspot: string;
  collections: { [P in CollectionNames]: ArtefactStates };
  otherUses: { [key: string]: ArtefactStates };
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
    const artefactData = artefactDataRaw as unknown as Artefact[];
    const artefactState = window.localStorage.getItem('arch-journal-artefacts');
    let artefactStateParsed: Array<{
      name: string;
      collections: { [key: string]: ArtefactStates };
    }> | null = null;
    if (artefactState) {
      artefactStateParsed = JSON.parse(artefactState);
    }
    for (const artefact of artefactData) {
      const foundArtefact = artefactStateParsed?.find(
        (_artefact) => _artefact.name === artefact.name
      );
      if (foundArtefact) {
        artefact.collections = foundArtefact.collections;
      } else {
        const collections: { [P in CollectionNames]: ArtefactStates } = {};
        for (const collection of artefact.collections as unknown as string[]) {
          collections[collection] = ArtefactStates.NotFound;
        }
        artefact.collections = collections;
      }
      artefact.image =
        '/assets/artefacts/' + artefact.name.replace(/[ \/]/g, '_') + '.png';
    }
    setArtefacts(artefactData);

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
      collections: artefact.collections,
      otherUses: artefact.otherUses,
    }));
    window.localStorage.setItem(
      'arch-journal-artefacts',
      JSON.stringify(artefactState)
    );
  };
  useEffect(saveArtefactState, [artefacts]);

  const isComplete = (artefact: Artefact) =>
    Object.values(artefact.collections).every(
      (status) => status === 'Completed'
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
    throw new Error('useArtefact must be used within a artefactProvider');
  }
  return context;
};
