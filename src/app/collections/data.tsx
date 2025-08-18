import { ArtefactStates, Collection, Collections as CollectionData, CollectionSortOptions } from '@/data/constants';
import { useArtefacts } from '@/data/providers';
import { createContext, useState, useEffect, useMemo, useContext } from 'react';

export const CollectionsPage = createContext<CollectionsPageContext>({
  sort: CollectionSortOptions.LevelToComplete,
  setSort: () => {},
  highlightedCollection: '',
  setHighlightedCollection: () => {},
  collections: [],
  groupedCollections: {},
});

export const useCollectionsPageData = () => useContext(CollectionsPage);

export const useCollectionsPageBuilder = () => {
  const [sort, setSort] = useState<CollectionSortOptions>(CollectionSortOptions.LevelToComplete);
  const { highlightedCollection, setHighlightedCollection } = useHighlightedCollection();
  const collections = useSortedCollections(sort);
  const groupedCollections = useGroupedCollections(collections, sort);

  return {
    sort,
    setSort,
    groupedCollections,
    collections,
    highlightedCollection,
    setHighlightedCollection,
  };
};

const useHighlightedCollection = () => {
  const [highlightedCollection, setHighlightedCollection] = useState<string | null>(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const collection = params.get('highlight');
    if (collection) {
      setHighlightedCollection(collection);
      const collectionElement = document.getElementById(collection.replace(/\W/g, ''));
      if (collectionElement) {
        collectionElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        });
      }
    }
  }, []);
  return {
    highlightedCollection,
    setHighlightedCollection,
  };
};

const useSortedCollections: (sort: CollectionSortOptions) => CollectionWithInfo[] = (sort) => {
  const { artefacts, isComplete } = useArtefacts();
  return useMemo(
    () =>
      CollectionData.map((collection) => {
        const artefactsInCollection = artefacts.filter((artefact) =>
          Object.keys(artefact.collections).includes(collection.name)
        );
        console.log(artefactsInCollection);

        return {
          ...collection,
          artefacts: artefactsInCollection,
          digsite: artefactsInCollection[0]?.digsite ?? 'Unknown',
          levelToComplete: Math.max(...artefactsInCollection.map((artefact) => artefact.level)),
          isComplete: artefactsInCollection.every(
            (artefact) => artefact.collections[collection.name] === ArtefactStates.Completed
          ),
        };
      }).sort((a, b) => {
        switch (sort) {
          case CollectionSortOptions.LevelToComplete:
            return a.levelToComplete - b.levelToComplete;
          case CollectionSortOptions.Collector:
            return a.collector.localeCompare(b.collector) || a.name.localeCompare(b.name);
          case CollectionSortOptions.Digsite:
            return a.digsite.localeCompare(b.digsite) || a.name.localeCompare(b.name);
          case CollectionSortOptions.Name:
            return a.name.localeCompare(b.name) || a.levelToComplete - b.levelToComplete;
          default:
            return 0;
        }
      }),
    [artefacts, sort]
  );
};

const useGroupedCollections = (collections: CollectionWithInfo[], sort: CollectionSortOptions) => {
  type Collector = string;
  return useMemo(() => {
    const _groupedCollections: {
      [key: Collector]: { isComplete: boolean; collections: Collection[] };
    } = {};
    collections.forEach((collection) => {
      const key =
        sort === CollectionSortOptions.Collector
          ? collection.collector
          : sort === CollectionSortOptions.Digsite
          ? collection.digsite
          : collection.name[0].toUpperCase();
      _groupedCollections[key] = _groupedCollections[key] || {
        isComplete: false,
        collections: [],
      };
      _groupedCollections[key].collections.push(collection);
    });
    for (const key in _groupedCollections) {
      _groupedCollections[key].isComplete = _groupedCollections[key].collections.every((collection) =>
        collection.artefacts?.every((artefact) => artefact.collections[collection.name] === ArtefactStates.Completed)
      );
    }
    return _groupedCollections;
  }, [collections, sort]);
};
