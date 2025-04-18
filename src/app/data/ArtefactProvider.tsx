import React, { createContext, useEffect, useState } from 'react';
import artefactData from './artefacts.json';
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
  collections: { [P in CollectionNames]: ArtefactStates };
  level: number;
  xp: number;
  chronotes: number;
  digsite: DigsiteNames;
  materials: { [P in Materials]?: number };
};

const artefactContext = createContext<{
  artefacts: Artefact[];
  setArtefact: (artefact: Artefact) => void;
}>({ artefacts: [], setArtefact: () => {} });

export default function ArtefactProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [artefacts, setArtefacts] = useState<Artefact[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const importArtefacts = () => {
    setLoading(true);
    setArtefacts(
      artefactData.map((artefact) => {
        const collections: { [P in CollectionNames]: ArtefactStates } = {};
        for (const collection of artefact.collections as string[]) {
          collections[collection] = ArtefactStates.NotFound;
        }
        return {
          ...artefact,
          digsite: artefact.digsite as DigsiteNames,
          collections,
          image:
            '/assets/artefacts/' + artefact.name.replace(/ /g, '_') + '.png',
        };
      })
    );
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

  return (
    <artefactContext.Provider value={{ artefacts, setArtefact }}>
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

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
