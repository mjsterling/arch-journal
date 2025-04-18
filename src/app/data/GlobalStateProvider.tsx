import React, { createContext, useState } from 'react';

export enum Screens {
  Artefacts = 'Artefacts',
  Collections = 'Collections',
  Materials = 'Materials',
}

type ContextMenuItems = Array<
  Array<{
    label: string;
    callback?: Function;
  }>
>;

type GlobalStateContext = {
  screen: Screens;
  setScreen: SetState<Screens>;
  contextMenu: {
    x: number;
    y: number;
    items: ContextMenuItems;
  };
  createContextMenu: (e: React.MouseEvent, items: ContextMenuItems) => void;
  clearContextMenu: () => void;
  goToCollection: (collection: string) => void;
  goToArtefact: (artefact: string) => void;
  goToMaterial: (material: string) => void;
  showCompleted: boolean;
  setShowCompleted: SetState<boolean>;
  wiki: (query: string) => void;
};

const globalStateContext = createContext<GlobalStateContext>({
  screen: Screens.Artefacts,
  setScreen: () => {},
  contextMenu: {
    x: -1,
    y: -1,
    items: [],
  },
  createContextMenu: () => {},
  clearContextMenu: () => {},
  goToCollection: () => {},
  goToArtefact: () => {},
  goToMaterial: () => {},
  showCompleted: false,
  setShowCompleted: () => {},
  wiki: () => {},
});

export default function GlobalStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [screen, setScreen] = useState(Screens.Artefacts);
  const [showCompleted, setShowCompleted] = useState(false);

  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    items: ContextMenuItems;
  }>({
    x: -1,
    y: -1,
    items: [],
  });
  const clearContextMenu = () => {
    setContextMenu({
      x: -1,
      y: -1,
      items: [],
    });
  };
  const createContextMenu = (e: React.MouseEvent, items: ContextMenuItems) => {
    e.stopPropagation();
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      items,
    });
  };
  const goToCollection = (collection: string) => {
    setScreen(Screens.Collections);
    setTimeout(() => {
      const highlightedCollection = document.getElementById(
        collection.replace(/\W/g, '')
      );
      if (highlightedCollection) {
        highlightedCollection.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        });
        highlightedCollection.style.border = '2px solid #FFA500';
      }
    }, 500);
  };
  const goToArtefact = (artefact: string) => {
    setScreen(Screens.Artefacts);
    setTimeout(() => {
      const highlightedArtefact = document.getElementById(
        artefact.replace(/\W/g, '')
      );
      if (highlightedArtefact) {
        highlightedArtefact.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        });
        highlightedArtefact.style.border = '2px solid #FFA500';
      }
    }, 500);
  };
  const goToMaterial = (material: string) => {
    setScreen(Screens.Materials);
  };
  const wiki = (query: string) => {
    window.open(
      `https://runescape.wiki/w/${query.replace(/ /g, '_')}`,
      '_blank'
    );
  };
  return (
    <globalStateContext.Provider
      value={{
        screen,
        setScreen,
        showCompleted,
        setShowCompleted,
        contextMenu,
        createContextMenu,
        clearContextMenu,
        goToArtefact,
        goToCollection,
        goToMaterial,
        wiki,
      }}
    >
      <ContextMenu />
      {children}
    </globalStateContext.Provider>
  );
}

import { useContext } from 'react';
import ContextMenu from '../components/ContextMenu';

export const useGlobalState = () => {
  const context = useContext(globalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
