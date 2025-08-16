'use client';
import { useMemo, useState } from 'react';
import { BankCleanerArtefactCard, RadioGroup } from '@/components';
import { Artefact, useArtefacts } from '@/data/providers';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useLazySearch } from '@/data/hooks';

export default function BankCleaner() {
  const { artefacts } = useArtefacts();
  const [sort, setSort] = useState<'name' | 'digsite' | 'level'>('level');
  const {
    filteredData: filteredArtefacts,
    searchQuery,
    handleSearch,
    clearSearch,
  } = useLazySearch<Artefact>(artefacts);
  const sortedArtefacts = useSortedArtefacts(filteredArtefacts, sort);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-between px-6 py-6 md:px-12 md:py-6">
        <div className="flex flex-row gap-2 border border-orange-100 rounded-md p-2">
          <MagnifyingGlassIcon className="w-6 h-6 text-orange-100" />
          <input
            type="text"
            className="w-full text-orange-100 !outline-none"
            placeholder="Search artefacts..."
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchQuery.length ? (
            <button onClick={clearSearch} className="cursor-pointer">
              <XMarkIcon className="w-6 h-6 text-orange-100" />
            </button>
          ) : null}
        </div>
        <RadioGroup
          label="Sort by:"
          options={[
            { key: 'name', label: 'Alphabetical' },
            { key: 'digsite', label: 'Digsite' },
            { key: 'level', label: 'Level' },
          ]}
          value={sort}
          setValue={setSort}
        />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4 px-6 py-6 md:px-12 md:py-6">
        {sortedArtefacts.map((artefact) => (
          <BankCleanerArtefactCard key={`bank_cleaner__${artefact.name}`} artefact={artefact} />
        ))}
      </div>
    </div>
  );
}

const useSortedArtefacts = (artefacts: Artefact[], sort: 'name' | 'digsite' | 'level') => {
  const digsiteReducer = (a: Artefact, b: Artefact) =>
    a.digsite.localeCompare(b.digsite) || a.name.replace(/\W/g, '').localeCompare(b.name.replace(/\W/g, ''));
  const nameReducer = (a: Artefact, b: Artefact) => a.name.replace(/\W/g, '').localeCompare(b.name.replace(/\W/g, ''));
  const levelReducer = (a: Artefact, b: Artefact) => a.level - b.level;
  const sortedArtefacts = useMemo(
    () => artefacts.sort(sort === 'name' ? nameReducer : sort === 'digsite' ? digsiteReducer : levelReducer),
    [artefacts, sort, nameReducer, digsiteReducer, levelReducer]
  );

  return sortedArtefacts;
};
