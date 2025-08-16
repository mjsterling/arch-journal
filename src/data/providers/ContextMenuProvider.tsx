"use client";
import { createContext, useCallback, useContext, useState } from "react";
import { useGlobalState } from "./GlobalStateProvider";

export type ContextMenuItem = {
  label: string;
  callback?: () => void;
  disabled?: boolean;
};
export type ContextMenuSection = Array<
  ContextMenuItem | false | null | undefined
>;
export type ContextMenuItems = Array<ContextMenuSection>;

type ContextMenuContext = {
  contextMenu: {
    x: number;
    y: number;
    items: ContextMenuItems;
  };
  createContextMenu: (e: React.MouseEvent, items: ContextMenuItems) => void;
  clearContextMenu: () => void;
};

const contextMenuContext = createContext<ContextMenuContext>({
  contextMenu: {
    x: -1,
    y: -1,
    items: [],
  },
  createContextMenu: () => {},
  clearContextMenu: () => {},
});

export default function ContextMenuProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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
  return (
    <contextMenuContext.Provider
      value={{
        contextMenu,
        createContextMenu,
        clearContextMenu,
      }}
    >
      {children}
    </contextMenuContext.Provider>
  );
}

export const useContextMenu = () => {
  const { contextMenu, createContextMenu, clearContextMenu } =
    useContext(contextMenuContext);
  const { wiki } = useGlobalState();

  const createHotspotContextMenu = useCallback(
    (
        hotspot: string,
        completed: boolean,
        resetCallback: () => void,
        completedCallback: () => void
      ) =>
      (e: React.MouseEvent) =>
        createContextMenu(e, [
          [
            completed
              ? {
                  label: "Reset hotspot",
                  callback: resetCallback,
                }
              : {
                  label: "Mark hotspot as completed",
                  callback: completedCallback,
                },
          ],
          [
            {
              label: "[WIKI]" + hotspot,
              callback: () => wiki(hotspot),
            },
          ],
        ]),
    [createContextMenu, wiki]
  );

  const createMaterialContextMenu = useCallback(
    (material: string) => (e: React.MouseEvent) =>
      createContextMenu(e, [
        [
          {
            label: "[WIKI]" + material,
            callback: () => wiki(material.replace(/ /g, "_")),
          },
          {
            label: "[WIKI]Material cache locations",
            callback: () =>
              wiki(
                `Material_cache_(${material
                  .toLowerCase()
                  .replace(/ /g, "_")})#Locations`
              ),
          },
        ],
      ]),
    [createContextMenu, wiki]
  );

  const createWikiContextMenu = useCallback(
    (text: string) => (e: React.MouseEvent) =>
      createContextMenu(e, [
        [
          {
            label: "[WIKI]" + text,
            callback: () => wiki(text),
          },
        ],
      ]),
    [createContextMenu, wiki]
  );

  return {
    contextMenu,
    createContextMenu,
    clearContextMenu,
    createHotspotContextMenu,
    createMaterialContextMenu,
    createWikiContextMenu,
  };
};
