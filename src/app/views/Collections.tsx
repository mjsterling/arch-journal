import { useMemo } from 'react';
import { useArtefacts } from '../data/ArtefactProvider';
import { Collections as CollectionData } from '../data/Collections';
import CollectionCard from '../components/ArtefactCollectionCard/CollectionCard';
import { useGlobalState } from '../data/GlobalStateProvider';

export default function Collections() {
  const { artefacts } = useArtefacts();
  const { screen, showCompleted, setShowCompleted } = useGlobalState();
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
      }).sort((a, b) => a.levelToComplete - b.levelToComplete),
    [artefacts]
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
            ? `Hide Completed ${screen}`
            : `Show Completed ${screen}`}
        </button>
      </div>
      {collections.map((collection) => (
        <CollectionCard key={collection.name} {...collection} />
      ))}
    </div>
  );
}
