import { createContext, useEffect, useState } from 'react';

export enum Screens {
  Artefacts = 'Artefacts',
  Collections = 'Collections',
  Materials = 'Materials',
}

const artefactContext = createContext<Artefact[]>([]);

export default function ArtefactProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [artefacts, setArtefacts] = useState<Artefact[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getArtefacts = async () => {
    setLoading(true);
    const res = await axios.get('/assets/artefacts.csv');
    const data = res.data;
    const rows = data.split('\n');
    const headers = rows[0].split(',');
    const artefactsData = rows.slice(1).map((row) => {
      const values = row.split(',');
      const artefact: { [key: string]: string | number } = {};
      headers.forEach((header: string, index: number) => {
        artefact[header.trim()] = values[index].trim();
      });
      return new Artefact(
        artefact.Name as string,
        `/assets/artefacts/${(artefact.Name as string).replace(/ /g, '_')}.png`,
        artefact.Level as number,
        artefact.Digsite as string
      );
    });

    setArtefacts(artefactsData);
    setLoading(false);
    console.log(artefacts);
  };
  useEffect(() => {
    getArtefacts();
  }, []);
  return (
    <artefactContext.Provider value={artefacts}>
      {loading ? null : children}
    </artefactContext.Provider>
  );
}

import { useContext } from 'react';
import { Artefact } from './Artefact';
import axios from 'axios';

export const useArtefacts = () => {
  const context = useContext(artefactContext);
  if (!context) {
    throw new Error('useartefact must be used within a artefactProvider');
  }
  return context;
};

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
