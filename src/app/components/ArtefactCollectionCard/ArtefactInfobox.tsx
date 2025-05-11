import { ArtefactStates } from '@/app/data/Artefact';
import { Artefact, useArtefacts } from '@/app/data/ArtefactProvider';
import { useGlobalState } from '@/app/data/GlobalStateProvider';
import React, { useEffect, useMemo, useState } from 'react';

export const ArtefactInfobox = ({
  artefact,
  collection,
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
      className="absolute left-1/2 top-3/4 bg-gray-900 border-2 border-white rounded-md flex flex-col justify-center items-center gap-3 transition-all p-3 min-w-fit cursor-default"
      style={{ opacity }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="flex flex-row gap-2 items-center">
        <span className="text-base font-bold text-white uppercase text-nowrap px-4">
          {mode === 'artefactPage' ? collection : artefact.name}
        </span>
      </div>
      {mode === 'artefactPage' ? (
        <div className="flex flex-col gap-1">
          {artefactsInCollection.map((art) => (
            <div
              key={`infobox_${collection}_${art.name}`}
              className="grid grid-cols-[12px_1fr] items-center gap-2 px-4"
            >
              <div
                className={[
                  'w-3 h-3 rounded-full flex items-center justify-center',
                  art.collections[collection] === 'Not Found'
                    ? 'bg-gray-500'
                    : art.collections[collection] === 'Damaged'
                    ? 'bg-orange-700'
                    : art.collections[collection] === 'Restored'
                    ? 'bg-yellow-600'
                    : art.collections[collection] === 'Completed'
                    ? 'bg-green-700'
                    : '',
                ].join(' ')}
              ></div>
              <span
                className="text-sm text-left text-white text-nowrap font-semibold hover:underline cursor-pointer"
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
              className="grid grid-cols-[12px_1fr] items-center gap-2 px-4"
            >
              <div
                className={[
                  'w-3 h-3 rounded-full flex items-center justify-center',
                  artefact.collections[collection] === 'Not Found'
                    ? 'bg-gray-500'
                    : artefact.collections[collection] === 'Damaged'
                    ? 'bg-orange-700'
                    : artefact.collections[collection] === 'Restored'
                    ? 'bg-yellow-600'
                    : artefact.collections[collection] === 'Completed'
                    ? 'bg-green-700'
                    : '',
                ].join(' ')}
              ></div>
              <span
                className="text-sm text-left text-white text-nowrap font-semibold hover:underline cursor-pointer"
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
