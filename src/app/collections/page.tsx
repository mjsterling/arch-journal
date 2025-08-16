'use client';
import { CollectionSort, CollectionToggleShowCompleted, CollectionDisplay } from './partials';
import { CollectionsPage, useCollectionsPageBuilder } from './data';

export default function Collections() {
  return (
    <CollectionsPage.Provider value={useCollectionsPageBuilder()}>
      <div className="flex flex-col gap-4">
        <CollectionSort />
        <CollectionToggleShowCompleted />
        <CollectionDisplay />
      </div>
    </CollectionsPage.Provider>
  );
}
