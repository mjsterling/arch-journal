declare type CollectionsPageContext = {
  sort: CollectionSortOptions;
  setSort: (sort: CollectionSortOptions) => void;
  highlightedCollection: string | null;
  setHighlightedCollection: (collection: string | null) => void;
  collections: CollectionWithInfo[];
  groupedCollections: Record<string, { isComplete: boolean; collections: Collection[] }>;
};

type CollectionWithInfo = import('@/data/constants').Collection & {
  artefacts: Artefact[];
  digsite: string;
  levelToComplete: number;
  isComplete: boolean;
};
