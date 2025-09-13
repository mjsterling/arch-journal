'use client';
import { CollectionSort, CollectionToggleShowCompleted, CollectionDisplay } from './partials';
import { CollectionsPage, useCollectionsPageBuilder } from './data';
import { Collapsible } from '@/components/Collapsible';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/20/solid';

export default function Collections() {
  return (
    <CollectionsPage.Provider value={useCollectionsPageBuilder()}>
      <div className="flex flex-col gap-4">
        <Collapsible
          label={
            <span className="flex gap-2">
              <AdjustmentsHorizontalIcon className="w-5 h-5 text-orange-100" /> Sort/Filter
            </span>
          }
        >
          <CollectionSort />
          <CollectionToggleShowCompleted />
        </Collapsible>
        <CollectionDisplay />
      </div>
    </CollectionsPage.Provider>
  );
}
