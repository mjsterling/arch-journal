'use client';
import { useEffect, useMemo, useState } from 'react';
import { BankCleanerArtefactCard, Checkbox, RadioGroup } from '@/components';
import { Artefact, useArtefacts } from '@/data/providers';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useLazySearch } from '@/data/hooks';
import { hexToArgbInt, imageToBase64BGRA, pixelsToText } from '@/data/utils';

export default function BankCleaner() {
  const { artefacts, setArtefacts } = useArtefacts();
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
        ? artefacts.filter((artefact) => artefact.count.damaged || artefact.count.restored)
        : artefacts,
    [artefacts, hideZeroCountArtefacts]
  );
  const sortedArtefacts = useSortedArtefacts(doubleFilteredArtefacts, sort);
  const [alt1Active, setAlt1Active] = useState(false);
  useEffect(() => {
    if (window.alt1) setAlt1Active(true);
  }, []);

  const readArtefact = async (imageUrl: string) => {
    try {
      const { base64, width, height } = await imageToBase64BGRA(imageUrl);
      if (!base64) {
        console.log('cannot load image');
        return null;
      }
      const subImages: Array<{ x: number; y: number }> = JSON.parse(
        alt1.bindFindSubImg(1, base64, width, 0, 0, alt1.rsWidth, alt1.rsHeight)
      );

      if (!subImages.length) {
        return null;
      }

      const boxWidth = 40;
      const boxHeight = 15;

      let count = 0;
      subImages.forEach((subImage: { x: number; y: number }) => {
        const yellowPixels: Array<{ x: number; y: number }> = [];
        const boxLocation = {
          x: Math.round(subImage.x - (boxWidth - width) / 2),
          y: Math.round(subImage.y - (boxWidth - height) / 2),
        };
        alt1.overLayRect(hexToArgbInt('#FFFFFF'), boxLocation.x, boxLocation.y, 40, 40, 5000, 1);
        for (let x = boxLocation.x; x < boxLocation.x + 15; x++) {
          for (let y = boxLocation.y; y < boxLocation.y + boxHeight; y++) {
            const pixelData = alt1.bindGetPixel(1, x, y);
            if (pixelData === hexToArgbInt('#FFFF00')) {
              yellowPixels.push({ x, y });
              alt1.overLayRect(hexToArgbInt('#0F0'), x, y, 1, 1, 5000, 1);
            }
          }
        }
        if (yellowPixels.length) {
          const number = pixelsToText(yellowPixels);
          if (/^\d+$/.test(number)) {
            count += Number(number);
          }
        } else {
          count += 1;
        }
      });
      return count;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const importArtefacts = async () => {
    if (window.alt1) {
      const alt1 = window.alt1;
      const region = alt1.bindRegion(0, 0, alt1.rsWidth, alt1.rsHeight);
      const newArtefacts = [...artefacts];
      for (const artefact of newArtefacts) {
        const damaged = await readArtefact(`/assets/artefacts/damaged/${artefact.name.replace(/[ \/]/g, '_')}.png`);
        const restored = await readArtefact(`/assets/artefacts/${artefact.name.replace(/[ \/]/g, '_')}.png`);
        console.log(artefact.name, 'Damaged:', damaged, 'Restored:', restored);
        artefact.count.damaged = damaged ?? artefact.count.damaged;
        artefact.count.restored = restored ?? artefact.count.restored;
        console.log(artefact);
      }
      setArtefacts([...newArtefacts]);
    } else {
      alert('Alt1 is not available. Please ensure you are using the Alt1 client.');
    }
  };

  const clearAll = () => {
    const newArtefacts = [...artefacts];
    for (const artefact of newArtefacts) {
      artefact.count = { damaged: 0, restored: 0 };
    }
    setArtefacts([...newArtefacts]);
  };

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

        <div className="flex gap-2 items-center">
          {alt1Active ? (
            <button
              className="text-orange-100 font-semibold cursor-pointer hover:scale-102 transition-transform text-base border-orange-100 border-2 rounded-md px-3 py-1"
              onClick={importArtefacts}
            >
              Scan for Artefacts
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
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-between px-6 py-6 md:px-12 md:py-6">
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
        <Checkbox
          label="Hide zero-count artefacts?"
          checked={hideZeroCountArtefacts}
          toggle={() => setHideZeroCountArtefacts((prev) => !prev)}
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
