import { useSettings } from '@/data/providers';
import { CollectionCard } from '.';
import { useCollectionsPageData } from '../page';
import { CollectionSortOptions } from '@/data/constants';

export const CollectionDisplay: React.FC = () => {
  const { showCompletedCollections } = useSettings();
  const { sort, groupedCollections, collections } = useCollectionsPageData();
  return (
    <div className="w-full h-full flex flex-col gap-4 sm:px-6 py-2 md:px-12 md:py-6">
      {sort === CollectionSortOptions.LevelToComplete
        ? collections.map((collection) => <CollectionCard key={collection.name} collection={collection} />)
        : Object.entries(groupedCollections).map(([key, { isComplete, collections }]) => (
            <div key={`${key}_collection_container`} className="relative">
              <h2
                className={[
                  'text-xl text-orange-100 font-semibold mx-auto pt-4 mt-4 pb-4',
                  isComplete ? 'opacity-50' : '',
                  isComplete && !showCompletedCollections ? 'hidden' : '',
                ].join(' ')}
                key={`${key}_title`}
              >
                {key}
              </h2>

              {collections.map((collection) => (
                <CollectionCard key={collection.name} collection={collection} combined />
              ))}
            </div>
          ))}
    </div>
  );
};
