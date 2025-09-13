import { Collection } from '@/data/constants';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Combobox } from '@/components';

export const CollectionSearch: CollectionSearch = ({ activeCollection, setActiveCollection, collections }) => (
  <div className="flex flex-col gap-4 w-full">
    {activeCollection ? (
      <div className="flex flex-row gap-4 w-full justify-between md:justify-center items-center">
        <button className="hidden md:flex invisible pointer-events-none" aria-hidden="true">
          <MagnifyingGlassIcon className="h-7 w-7 text-orange-100" />
        </button>
        <h2 className="text-lg md:text-2xl font-semibold">{activeCollection} </h2>
        <button className="cursor-pointer" onClick={() => setActiveCollection('')}>
          <MagnifyingGlassIcon className="h-7 w-7 text-orange-100" />
        </button>
      </div>
    ) : (
      <Combobox
        className="w-full max-w-[500px] mx-auto"
        placeholder="Search for a collection..."
        options={collections.map((coll) => ({
          value: coll.name,
          displayValue: `${coll.name} (${coll.levelToComplete})`,
        }))}
        onSelect={(coll) => setActiveCollection(coll.value)}
      />
    )}
  </div>
);

type CollectionSearch = React.FC<{
  activeCollection: string;
  setActiveCollection: (collection: string) => void;
  collections: Collection[];
}>;
