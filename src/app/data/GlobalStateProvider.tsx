import { createContext, useState } from 'react';

export enum Screens {
  Artefacts = 'Artefacts',
  Collections = 'Collections',
  Materials = 'Materials',
}

type GlobalStateContext = {
  screen: Screens;
  setScreen: SetState<Screens>;
};

const globalStateContext = createContext<GlobalStateContext>({
  screen: Screens.Artefacts,
  setScreen: () => {},
});

export default function GlobalStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [screen, setScreen] = useState(Screens.Artefacts);
  return (
    <globalStateContext.Provider value={{ screen, setScreen }}>
      {children}
    </globalStateContext.Provider>
  );
}

import { useContext } from 'react';

export const useGlobalState = () => {
  const context = useContext(globalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
