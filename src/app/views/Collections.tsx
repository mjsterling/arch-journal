import { useMemo, useState } from 'react';
import { useArtefacts } from '../data/ArtefactProvider';
import { Collection, Collections as CollectionData } from '../data/Collections';
import CollectionCard from '../components/ArtefactCollectionCard/CollectionCard';
import { useGlobalState } from '../data/GlobalStateProvider';
import { CheckIcon } from '@heroicons/react/16/solid';
import { ArtefactStates } from '../data/Artefact';
import { RadioGroup } from '../components/RadioGroup';

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
      <div className="flex flex-col items-center md:flex-row gap-4 gap-y-8 justify-between px-6 py-6 md:px-12 md:py-6">
        <RadioGroup
          label="Sort by:"
          options={[
            { key: 'levelToComplete', label: 'Level' },
            { key: 'collector' },
            { key: 'digsite' },
            { key: 'name', label: 'Alphabetical' },
          ]}
          value={sort}
          setValue={setSort}
        />
        <div className="flex gap-2 items-center text-orange-100">
          <button
            value={showCompleted ? 'checked' : 'unchecked'}
            className={[
              'cursor-pointer',
              'bg-transparent border border-orange-100 rounded-sm text-orange-100',
              'transition-colors ease-in-out min-h-6 min-w-6 flex justify-center items-center',
            ].join(' ')}
            onClick={() => setShowCompleted(!showCompleted)}
          >
            {showCompleted ? (
              <CheckIcon className="w-5 h-5 text-orange-100" />
            ) : null}
          </button>
          <span className="text-center">
            Show completed {screen.toLowerCase()}?
          </span>
        </div>
      </div>
      <div className="w-full h-full flex flex-col gap-4 sm:px-6 py-2 md:px-12 md:py-6">
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
