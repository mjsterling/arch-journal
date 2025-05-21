import { useMemo, useState } from 'react';
import { useArtefacts } from '../data/ArtefactProvider';
import { Collection, Collections as CollectionData } from '../data/Collections';
import CollectionCard from '../components/ArtefactCollectionCard/CollectionCard';
import { useGlobalState } from '../data/GlobalStateProvider';
import { CheckIcon } from '@heroicons/react/16/solid';
import { ArtefactStates } from '../data/Artefact';

export default function Collections() {
  const { artefacts, isComplete } = useArtefacts();
  const { screen, showCompleted, setShowCompleted } = useGlobalState();
  const [sort, setSort] = useState<
    'levelToComplete' | 'collector' | 'name' | 'digsite'
  >('levelToComplete');
  const collections = useMemo(
    () =>
      CollectionData.map((collection) => {
        const artefactsInCollection = artefacts.filter((artefact) =>
          Object.keys(artefact.collections).includes(collection.name)
        );

        return {
          ...collection,
          artefacts: artefactsInCollection,
          digsite: artefactsInCollection[0]?.digsite ?? 'Unknown',
          levelToComplete: Math.max(
            ...artefactsInCollection.map((artefact) => artefact.level)
          ),
          isComplete: artefactsInCollection.every(isComplete),
        };
      }).sort((a, b) => {
        switch (sort) {
          case 'levelToComplete':
            return a.levelToComplete - b.levelToComplete;
          case 'collector':
            return (
              a.collector.localeCompare(b.collector) ||
              a.name.localeCompare(b.name)
            );
          case 'digsite':
            return (
              a.digsite.localeCompare(b.digsite) || a.name.localeCompare(b.name)
            );
          case 'name':
            return (
              a.name.localeCompare(b.name) ||
              a.levelToComplete - b.levelToComplete
            );
          default:
            return 0;
        }
      }),
    [artefacts, sort, isComplete]
  );

  type Collector = string;
  const groupedCollections = useMemo(() => {
    const _groupedCollections: {
      [key: Collector]: { isComplete: boolean; collections: Collection[] };
    } = {};
    collections.forEach((collection) => {
      const key =
        sort === 'collector'
          ? collection.collector
          : sort === 'digsite'
          ? collection.digsite
          : collection.name[0].toUpperCase();
      _groupedCollections[key] = _groupedCollections[key] || {
        isComplete: false,
        collections: [],
      };
      _groupedCollections[key].collections.push(collection);
    });
    for (const key in _groupedCollections) {
      _groupedCollections[key].isComplete = _groupedCollections[
        key
      ].collections.every((collection) =>
        collection.artefacts?.every(
          (artefact) =>
            artefact.collections[collection.name] === ArtefactStates.Completed
        )
      );
    }
    return _groupedCollections;
  }, [collections, sort]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 justify-between px-6 py-6 md:px-12 md:py-6">
        <div className="flex gap-4 items-center text-orange-100">
          Sort by:
          <div className="flex gap-2 items-center text-orange-100">
            <button
              value={sort === 'levelToComplete' ? 'checked' : 'unchecked'}
              className={[
                'cursor-pointer',
                'bg-transparent border border-orange-100 rounded-sm text-orange-100',
                'transition-colors ease-in-out h-6 w-6 flex justify-center items-center',
              ].join(' ')}
              onClick={() => setSort('levelToComplete')}
            >
              {sort === 'levelToComplete' ? (
                <CheckIcon className="w-5 h-5 text-orange-100" />
              ) : null}
            </button>
            Level
          </div>
          <div className="flex gap-2 items-center text-orange-100">
            <button
              value={sort === 'collector' ? 'checked' : 'unchecked'}
              className={[
                'cursor-pointer',
                'bg-transparent border border-orange-100 rounded-sm text-orange-100',
                'transition-colors ease-in-out h-6 w-6 flex justify-center items-center',
              ].join(' ')}
              onClick={() => setSort('collector')}
            >
              {sort === 'collector' ? (
                <CheckIcon className="w-5 h-5 text-orange-100" />
              ) : null}
            </button>
            Collector
          </div>
          <div className="flex gap-2 items-center text-orange-100">
            <button
              value={sort === 'name' ? 'checked' : 'unchecked'}
              className={[
                'cursor-pointer',
                'bg-transparent border border-orange-100 rounded-sm text-orange-100',
                'transition-colors ease-in-out h-6 w-6 flex justify-center items-center',
              ].join(' ')}
              onClick={() => setSort('name')}
            >
              {sort === 'name' ? (
                <CheckIcon className="w-5 h-5 text-orange-100" />
              ) : null}
            </button>
            Alphabetical
          </div>
        </div>{' '}
        <div className="flex gap-2 items-center text-orange-100">
          <button
            value={showCompleted ? 'checked' : 'unchecked'}
            className={[
              'cursor-pointer',
              'bg-transparent border border-orange-100 rounded-sm text-orange-100',
              'transition-colors ease-in-out h-6 w-6 flex justify-center items-center',
            ].join(' ')}
            onClick={() => setShowCompleted(!showCompleted)}
          >
            {showCompleted ? (
              <CheckIcon className="w-5 h-5 text-orange-100" />
            ) : null}
          </button>
          Show completed {screen.toLowerCase()}?
        </div>
      </div>
      <div className="w-full h-full flex flex-col gap-4 sm:px-6 py-6 md:px-12 md:py-6">
        {sort === 'collector' || sort === 'digsite' || sort === 'name'
          ? Object.entries(groupedCollections).map(
              ([key, { isComplete, collections }]) => (
                <div key={`${key}_collection_container`} className="relative">
                  <h2
                    className={[
                      'text-xl text-orange-100 font-semibold mx-auto pt-4 mt-4 pb-4',
                      isComplete ? 'opacity-50' : '',
                      isComplete && !showCompleted ? 'hidden' : '',
                    ].join(' ')}
                    key={`${key}_title`}
                  >
                    {key}
                  </h2>

                  {collections.map((collection) => (
                    <CollectionCard
                      key={collection.name}
                      collection={collection}
                      combined
                    />
                  ))}
                </div>
              )
            )
          : collections.map((collection) => (
              <CollectionCard key={collection.name} collection={collection} />
            ))}
      </div>
    </div>
  );
}
