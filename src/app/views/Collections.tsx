import { useMemo } from 'react';
import { useArtefacts } from '../data/ArtefactProvider';
import { Collections as CollectionData } from '../data/Collections';
import CollectionCard from '../components/CollectionCard/CollectionCard';

export default function Collections() {
  const { artefacts } = useArtefacts();
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
    <div className="w-full h-full flex flex-col gap-4 px-16 py-16">
      {collections.map((collection) => (
        <CollectionCard key={collection.name} {...collection} />
      ))}
    </div>
  );
}
