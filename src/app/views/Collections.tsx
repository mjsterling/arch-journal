import { useMemo, useState } from 'react';
import { useArtefacts } from '../data/ArtefactProvider';
import { Collections as CollectionData } from '../data/Collections';
import CollectionCard from '../components/ArtefactCollectionCard/CollectionCard';
import { useGlobalState } from '../data/GlobalStateProvider';

export default function Collections() {
  const { artefacts } = useArtefacts();
  const { screen, showCompleted, setShowCompleted } = useGlobalState();
  const [sort, setSort] = useState<'levelToComplete' | 'collector' | 'name'>(
    'levelToComplete'
  );
  const collections = useMemo(
    () =>
      CollectionData.map((collection) => {
        const artefactsInCollection = artefacts.filter((artefact) =>
          Object.keys(artefact.collections).includes(collection.name)
        );

        return {
          ...collection,
          artefacts: artefactsInCollection,
          levelToComplete: Math.max(
            ...artefactsInCollection.map((artefact) => artefact.level)
          ),
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
          case 'name':
            return (
              a.name.localeCompare(b.name) ||
              a.levelToComplete - b.levelToComplete
            );
          default:
            return 0;
        }
      }),
    [artefacts, sort]
  );

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex gap-4 justify-center my-8">
        <button
          className={[
            'rounded-md border border-orange-100 px-5 py-1 cursor-pointer',
            'bg-transparent text-orange-100',
            'transition-colors ease-in-out',
            'hover:bg-orange-100 hover:text-gray-950',
          ].join(' ')}
          onClick={() => setShowCompleted(!showCompleted)}
        >
          {showCompleted
            ? `Showing Completed ${screen}`
            : `Hiding Completed ${screen}`}
        </button>
        {sort === 'levelToComplete' ? (
          <button
            className="cursor-pointer px-5 py-1 rounded-md border border-orange-100 text-orange-100 bg-transparent hover:bg-orange-100 hover:text-gray-800"
            onClick={() => setSort('collector')}
          >
            Sorting by Level
          </button>
        ) : null}
        {sort === 'collector' ? (
          <button
            className="cursor-pointer px-5 py-1 rounded-md border border-orange-100 text-orange-100 bg-transparent hover:bg-orange-100 hover:text-gray-800"
            onClick={() => setSort('name')}
          >
            Sorting by Collector
          </button>
        ) : null}
        {sort === 'name' ? (
          <button
            className="cursor-pointer px-5 py-1 rounded-md border border-orange-100 text-orange-100 bg-transparent hover:bg-orange-100 hover:text-gray-800"
            onClick={() => setSort('levelToComplete')}
          >
            Sorting by Alphabetical
          </button>
        ) : null}
      </div>
      {collections.map((collection) => (
        <CollectionCard key={collection.name} {...collection} />
      ))}
    </div>
  );
}
