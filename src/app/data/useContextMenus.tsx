import React, { useCallback } from 'react';
import { useGlobalState } from './GlobalStateProvider';

export const useContextMenu = () => {
  const { createContextMenu, wiki } = useGlobalState();

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
                  label: 'Reset hotspot',
                  callback: resetCallback,
                }
              : {
                  label: 'Mark hotspot as completed',
                  callback: completedCallback,
                },
          ],
          [
            {
              label: '[WIKI]' + hotspot,
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
            label: '[WIKI]' + material,
            callback: () => wiki(material.replace(/ /g, '_')),
          },
          {
            label: '[WIKI]Material cache locations',
            callback: () =>
              wiki(
                `Material_cache_(${material
                  .toLowerCase()
                  .replace(/ /g, '_')})#Locations`
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
            label: '[WIKI]' + text,
            callback: () => wiki(text),
          },
        ],
      ]),
    [createContextMenu, wiki]
  );

  return {
    createHotspotContextMenu,
    createMaterialContextMenu,
    createWikiContextMenu,
  };
};
