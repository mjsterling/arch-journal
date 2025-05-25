import { ArtefactStates } from '@/app/data/Artefact';
import { Artefact, useArtefacts } from '@/app/data/ArtefactProvider';
import { useGlobalState } from '@/app/data/GlobalStateProvider';
import React, { useEffect, useMemo, useState } from 'react';

export const ArtefactInfobox = ({
  artefact,
  collection,
  collector,
  open,
  mode,
}: {
  artefact: Artefact;
  collection: string;
  collector: string;
  open: boolean;
  status: ArtefactStates;
  mode: 'artefactPage' | 'collectionPage';
}) => {
  const { goToArtefact, goToCollection } = useGlobalState();
  const { artefacts } = useArtefacts();
  const artefactsInCollection = useMemo(
    () => artefacts.filter((a) => a.collections.hasOwnProperty(collection)),
    [artefacts, collection]
  );
  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    if (open) {
      setOpacity(1);
    } else {
      setOpacity(0);
    }
  }, [open]);
  if (!open) return null;
  return (
    <div
      className="absolute left-2/3 top-2/3 bg-gray-900 border border-white rounded-md flex-col justify-center items-center gap-3 transition-all p-3 min-w-fit cursor-default hidden lg:flex"
      style={{ opacity }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="flex flex-row gap-2 items-center">
        <a
          onClick={() =>
            mode === 'artefactPage'
              ? goToCollection(collection)
              : goToArtefact(artefact.name)
          }
          className="text-sm font-semibold text-orange-100 uppercase text-nowrap cursor-pointer hover:underline"
        >
          {mode === 'artefactPage' ? collection : artefact.name}
        </a>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <span className="text-xs font-medium text-orange-100 text-nowrap">
          {mode === 'artefactPage' ? collector : artefact.hotspot}
        </span>
      </div>
      {mode === 'artefactPage' ? (
        <div className="flex flex-col gap-2">
          {artefactsInCollection.map((art) => (
            <div
              key={`infobox_${collection}_${art.name}`}
              className="grid grid-cols-[18px_1fr] items-center gap-4 px-4"
            >
              <ArtefactStatusDisplay artefact={art} collection={collection} />

              <span
                className="text-sm text-left text-orange-100 text-nowrap font-medium hover:underline cursor-pointer"
                onClick={() => goToArtefact(art.name, true)}
              >
                {art.name}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {Object.keys(artefact.collections).map((collection) => (
            <div
              key={`infobox_${artefact.name}_${collection}`}
              className="grid grid-cols-[18px_1fr] items-center gap-4 px-4"
            >
              <ArtefactStatusDisplay
                artefact={artefact}
                collection={collection}
              />

              <span
                className="text-sm text-left text-orange-100 text-nowrap font-semibold hover:underline cursor-pointer"
                onClick={() => goToCollection(collection, true)}
              >
                {collection}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ArtefactStatusDisplay = ({
  artefact,
  collection,
}: {
  artefact: Artefact;
  collection: string;
}) => {
  const { colorblindMode } = useGlobalState();
  const status = useMemo(
    () => artefact.collections[collection],
    [artefact, collection]
  );

  const baseContainerClass = useMemo(
    () =>
      colorblindMode
        ? 'w-6 h-6 rounded-full flex items-center justify-center font-bold mr-2 text-orange-100'
        : 'w-3 h-3 rounded-full flex items-center justify-center',
    [colorblindMode]
  );

  const conditionalContainerClass = useMemo(() => {
    if (colorblindMode) {
      switch (status) {
        case ArtefactStates.NotFound:
          return `bg-gray-500 rounded-md`;
        case ArtefactStates.Damaged:
          return `bg-orange-700 rounded-r-3xl rounded-l-md`;
        case ArtefactStates.Restored:
          return `bg-purple-600 rounded-l-3xl rounded-r-md`;
        case ArtefactStates.Completed:
          return `bg-green-700 rounded-3xl`;
        default:
          return `bg-gray-500 rounded-md`;
      }
    } else {
      switch (status) {
        case ArtefactStates.NotFound:
          return `bg-gray-500`;
        case ArtefactStates.Damaged:
          return `bg-orange-700`;
        case ArtefactStates.Restored:
          return `bg-yellow-600`;
        case ArtefactStates.Completed:
          return `bg-green-700`;
        default:
          return `bg-gray-500`;
      }
    }
  }, [status, colorblindMode]);

  const statusText = useMemo(() => {
    if (!colorblindMode) return '';
    return status[0];
  }, [status, colorblindMode]);

  return (
    <div className={`${baseContainerClass} ${conditionalContainerClass}`}>
      {statusText}
    </div>
  );
};
