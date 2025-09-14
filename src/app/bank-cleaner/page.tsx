'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BankCleanerArtefactCard, Checkbox, RadioGroup } from '@/components';
import { Artefact, useArtefacts } from '@/data/providers';
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useLazySearch } from '@/data/hooks';
import { Collapsible } from '@/components/Collapsible';
import { useBankCleaner } from './useBankCleaner';
import { DamagedMatsNeeded } from '@/components/DamagedMatsNeeded';

export default function BankCleaner() {
  const { artefacts } = useArtefacts();
  const [sort, setSort] = useState<'name' | 'digsite' | 'level'>('level');
  const {
    filteredData: filteredArtefacts,
    searchQuery,
    handleSearch,
    clearSearch,
  } = useLazySearch<Artefact>(artefacts);
  const [hideZeroCountArtefacts, setHideZeroCountArtefacts] = useState(false);

  const doubleFilteredArtefacts = useMemo(
    () =>
      hideZeroCountArtefacts
        ? filteredArtefacts.filter((artefact) => artefact.count.damaged || artefact.count.restored)
        : filteredArtefacts,
    [filteredArtefacts, hideZeroCountArtefacts]
  );
  const sortedArtefacts = useSortedArtefacts(doubleFilteredArtefacts, sort);
  const [alt1Active, setAlt1Active] = useState(false);
  useEffect(() => {
    if (window.alt1) setAlt1Active(true);
  }, []);

  const { scanning, prefetching, clearAll, importArtefacts } = useBankCleaner();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div className="flex gap-2 items-center">
          {alt1Active ? (
            <button
              className="text-orange-100 font-semibold cursor-pointer hover:scale-102 transition-transform text-base border-orange-100 border-2 rounded-md px-3 py-1"
              onClick={importArtefacts}
              disabled={scanning || prefetching}
            >
              {scanning
                ? 'Scan in progress, please wait'
                : prefetching
                ? 'Loading scanner, please wait'
                : 'Scan for Artefacts'}
            </button>
          ) : (
            <span className="text-sm text-orange-100">Alt1 not available.</span>
          )}
          {artefacts.some((artefact) => artefact.count.damaged || artefact.count.restored) ? (
            <button
              className="text-orange-100 font-semibold cursor-pointer hover:scale-102 transition-transform text-base border-orange-100 border-2 rounded-md px-3 py-1"
              onClick={clearAll}
            >
              Clear All
            </button>
          ) : null}
        </div>
      </div>
      <Collapsible
        label={
          <span className="flex gap-2">
            <AdjustmentsHorizontalIcon className="w-5 h-5 text-orange-100" /> Sort/Filter
          </span>
        }
      >
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
            { key: 'name', label: 'A-Z' },
            { key: 'digsite', label: 'Digsite' },
            { key: 'level', label: 'Level' },
          ]}
          value={sort}
          setValue={setSort}
        />
        <Checkbox
          label="Hide zero-count artefacts?"
          checked={hideZeroCountArtefacts}
          toggle={() => setHideZeroCountArtefacts((prev) => !prev)}
        />
      </Collapsible>
      <Collapsible label="Mats needed for damaged artefacts">
        <DamagedMatsNeeded mode="bank-cleaner" />
      </Collapsible>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4 px-6 py-6 md:px-12 md:py-6">
        {sortedArtefacts.map((artefact) => (
          <BankCleanerArtefactCard key={`bank_cleaner__${artefact.name}`} artefact={artefact} />
        ))}
      </div>
    </div>
  );
}

const useSortedArtefacts = (artefacts: Artefact[], sort: 'name' | 'digsite' | 'level') => {
  const digsiteReducer = useCallback(
    (a: Artefact, b: Artefact) =>
      a.digsite.localeCompare(b.digsite) || a.name.replace(/\W/g, '').localeCompare(b.name.replace(/\W/g, '')),
    []
  );
  const nameReducer = useCallback(
    (a: Artefact, b: Artefact) => a.name.replace(/\W/g, '').localeCompare(b.name.replace(/\W/g, '')),
    []
  );
  const levelReducer = useCallback((a: Artefact, b: Artefact) => a.level - b.level, []);
  const sortedArtefacts = useMemo(
    () => artefacts.sort(sort === 'name' ? nameReducer : sort === 'digsite' ? digsiteReducer : levelReducer),
    [artefacts, sort, nameReducer, digsiteReducer, levelReducer]
  );

  return sortedArtefacts;
};
