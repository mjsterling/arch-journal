import React, { createContext, useState } from 'react';

export enum Screens {
  Artefacts = 'Artefacts',
  Collections = 'Collections',
  MaterialStorage = 'Mat. Storage',
  Planner = 'Planner',
}

type ContextMenuItems = Array<
  Array<{
    label: string;
    callback?: () => void;
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
  showCompleted: boolean;
  setShowCompleted: SetState<boolean>;
  wiki: (query: string) => void;
  materialStorage: {
    [P in Materials]: number;
  };
  updateMaterialStorage: (material: Materials, amount: number) => void;
};

const emptyMaterialStorage = {
  // Agnostic materials
  'Third-age iron': 0,
  'Samite silk': 0,
  'White oak': 0,
  Goldrune: 0,
  Orthenglass: 0,
  Vellum: 0,
  'Leather scraps': 0,
  Soapstone: 0,
  'Animal furs': 0,
  'Fossilised bone': 0,
  // Armadylean materials
  'Stormguard steel': 0,
  'Wings of War': 0,
  'Armadylean yellow': 0,
  'Aetherium alloy': 0,
  Quintessence: 0,
  // Bandosian materials
  'Malachite green': 0,
  'Mark of the Kyzaj': 0,
  'Vulcanised rubber': 0,
  'Warforged bronze': 0,
  "Yu'biusk clay": 0,
  // Dragonkin materials
  'Dragon metal': 0,
  Orgone: 0,
  'Compass rose': 0,
  'Carbon black': 0,
  Felt: 0,
  // Saradominist materials
  Keramos: 0,
  'White marble': 0,
  'Cobalt blue': 0,
  'Everlight silvthril': 0,
  'Star of Saradomin': 0,
  // Zamorakian materials
  'Cadmium red': 0,
  'Chaotic brimstone': 0,
  Demonhide: 0,
  'Eye of Dagon': 0,
  'Hellfire metal': 0,
  // Zarosian materials
  'Ancient vis': 0,
  'Blood of Orcus': 0,
  'Imperial steel': 0,
  'Tyrian purple': 0,
  'Zarosian insignia': 0,
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
  showCompleted: false,
  setShowCompleted: () => {},
  wiki: () => {},
  materialStorage: { ...emptyMaterialStorage },
  updateMaterialStorage: () => {},
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

  const wiki = (query: string) => {
    window.open(
      `https://runescape.wiki/w/${query.replace(/ /g, '_')}`,
      '_blank'
    );
  };

  const [materialStorage, setMaterialStorage] = useState<{
    [P in Materials]: number;
  }>(() => {
    const materialStorageState = window.localStorage.getItem(
      'arch-journal-materialStorage'
    );
    if (materialStorageState) {
      return JSON.parse(materialStorageState);
    }
    return { ...emptyMaterialStorage };
  });

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
        screen,
        setScreen,
        showCompleted,
        setShowCompleted,
        contextMenu,
        createContextMenu,
        clearContextMenu,
        goToArtefact,
        goToCollection,
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

import { useContext } from 'react';
import ContextMenu from '../components/ContextMenu';
import { Materials } from './Materials';

export const useGlobalState = () => {
  const context = useContext(globalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
