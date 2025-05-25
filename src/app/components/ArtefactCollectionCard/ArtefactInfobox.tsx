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
  const { colorblindMode } = useGlobalState();
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
              {colorblindMode ? (
                <div
                  className={[
                    'w-6 h-6 rounded-full flex items-center justify-center  font-bold mr-2 text-orange-100',
                    art.collections[collection] === 'Not Found'
                      ? 'bg-gray-500 rounded-md'
                      : art.collections[collection] === 'Damaged'
                      ? 'bg-orange-700 rounded-r-3xl rounded-l-md'
                      : art.collections[collection] === 'Restored'
                      ? 'bg-purple-600 rounded-l-3xl rounded-r-md'
                      : art.collections[collection] === 'Completed'
                      ? 'bg-green-700 rounded-3xl'
                      : '',
                  ].join(' ')}
                >
                  {art.collections[collection] === 'Not Found'
                    ? 'N'
                    : art.collections[collection] === 'Damaged'
                    ? 'D'
                    : art.collections[collection] === 'Restored'
                    ? 'R'
                    : art.collections[collection] === 'Completed'
                    ? 'C'
                    : ''}
                </div>
              ) : (
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
              )}

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
