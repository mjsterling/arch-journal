import { Collection } from "@/data/constants/Collections";
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@/components/Combobox";

export const CollectionSearch = ({
  activeCollection,
  setActiveCollection,
  collections,
}: {
  activeCollection: string;
  setActiveCollection: (collection: string) => void;
  collections: Collection[];
}) => (
  <div className="flex flex-col gap-4 w-full">
    {activeCollection ? (
      <div className="flex flex-row gap-4 justify-center items-center">
        <button className="invisible pointer-events-none" aria-hidden="true">
          <ArrowUturnLeftIcon className="h-8 w-8 text-orange-100" />
        </button>
        <h2 className="text-2xl mx-auto">{activeCollection} </h2>
        <button
          className="cursor-pointer"
          onClick={() => setActiveCollection("")}
        >
          <ArrowUturnLeftIcon className="h-8 w-8 text-orange-100" />
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
