'use client';
import { useMemo, useEffect, useState } from 'react';
import { type Artefact, useArtefacts, useSettings } from '@/data/providers';
import { ArtefactStates } from '@/data/constants';
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useLazySearch } from '@/data/hooks';
import { Checkbox } from '@/components';
import { ArtefactHotspot } from '@/components/ArtefactHotspot';
import { Collapsible } from '@/components/Collapsible';
import { DamagedMatsNeeded } from '@/components/DamagedMatsNeeded';

export default function Artefacts() {
  useEffect(() => {
    if (window.alt1) window.alt1.identifyAppUrl('/appconfig.json');
  }, []);
  const { artefacts, setArtefact, isComplete } = useArtefacts();
  const { showCompletedArtefacts, toggleShowCompletedArtefacts } = useSettings();
  const [highlightedArtefact, setHighlightedArtefact] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const artefact = params.get('highlight');
    if (artefact) {
      setHighlightedArtefact(artefact);
      const artefactElement = document.getElementById(artefact.replace(/\W/g, ''));
      if (artefactElement) {
        artefactElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        });
      }
    }
  }, []);

  const {
    filteredData: filteredArtefacts,
    searchQuery,
    handleSearch,
    clearSearch,
  } = useLazySearch<Artefact>(artefacts);

  const artefactsByHotspot = useMemo(() => {
    const _artefactsByHotspot: {
      [key: string]: { artefacts: Artefact[]; completed: boolean };
    } = {};
    filteredArtefacts.forEach((artefact: Artefact) => {
      if (!_artefactsByHotspot[artefact.hotspot]) {
        _artefactsByHotspot[artefact.hotspot] = {
          artefacts: [],
          completed: false,
        };
      }
      _artefactsByHotspot[artefact.hotspot].artefacts.push(artefact);
    });
    for (const hotspot in _artefactsByHotspot) {
      _artefactsByHotspot[hotspot].completed = _artefactsByHotspot[hotspot].artefacts.every(isComplete);
    }
    return _artefactsByHotspot;
  }, [filteredArtefacts, isComplete]);

  const markAllAsNotFound = (hotspot: string) => {
    const newArtefacts = [...artefactsByHotspot[hotspot].artefacts];
    newArtefacts.forEach((artefact) => {
      const newArtefact = { ...artefact };
      (['collections', 'mysteries', 'researchers', 'quests', 'misc'] as const).forEach((type) => {
        if (!newArtefact[type]) return;
        Object.keys(newArtefact[type] ?? {}).forEach((key) => {
          newArtefact[type][key as keyof Artefact[keyof Artefact]] = ArtefactStates.NotFound;
        });
      });

      setArtefact(newArtefact);
    });
  };
  const markAllAsCompleted = (hotspot: string) => {
    const newArtefacts = [...artefactsByHotspot[hotspot].artefacts];
    newArtefacts.forEach((artefact) => {
      const newArtefact = { ...artefact };
      (['collections', 'mysteries', 'researchers', 'quests', 'misc'] as const).forEach((type) => {
        if (!newArtefact[type]) return;
        Object.keys(newArtefact[type] ?? {}).forEach((key) => {
          newArtefact[type][key as keyof Artefact[keyof Artefact]] = ArtefactStates.Completed;
        });
      });

      setArtefact(newArtefact);
    });
  };

  const hotspotMaterials = (hotspot: string) => {
    const materials: { [key: string]: number } = {};
    artefactsByHotspot[hotspot].artefacts.forEach((artefact) => {
      Object.entries(artefact.materials).forEach(([material, amount]) => {
        materials[material] =
          (materials[material] || 0) +
          amount *
            Object.values({
              ...artefact.collections,
              ...artefact.misc,
              ...artefact.quests,
              ...artefact.mysteries,
            })
              .map((state) => Number(state === ArtefactStates.NotFound || state === ArtefactStates.Damaged))
              .reduce((a, b) => a + b, 0);
      });
    });
    return materials;
  };

  return (
    <>
      <Collapsible
        label={
          <span className="flex gap-2">
            <AdjustmentsHorizontalIcon className="w-5 h-5 text-orange-100" /> Sort/Filter
          </span>
        }
      >
        <Checkbox
          label="Show completed artefacts"
          checked={showCompletedArtefacts}
          toggle={toggleShowCompletedArtefacts}
        />
        <div className="flex flex-row gap-2 border border-orange-100 rounded-md p-2 w-full">
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
      </Collapsible>
      <Collapsible label="Mats needed for damaged artefacts">
        <DamagedMatsNeeded />
      </Collapsible>

      <div className="w-full h-full flex flex-col gap-4">
        {searchQuery && (
          <div className="flex flex-row gap-2 items-center text-orange-100 italic">
            Showing {filteredArtefacts.length} of {artefacts.length} artefacts
          </div>
        )}

        {Object.entries(artefactsByHotspot).map(([hotspot, { artefacts, completed }]) =>
          completed && !showCompletedArtefacts && !searchQuery ? null : (
            <ArtefactHotspot
              key={hotspot}
              hotspot={hotspot}
              artefacts={artefacts}
              markAllAsNotFound={markAllAsNotFound}
              markAllAsCompleted={markAllAsCompleted}
              hotspotMaterials={hotspotMaterials}
              searchQuery={searchQuery}
              highlightedArtefact={highlightedArtefact}
              completed={completed}
            />
          )
        )}
        {searchQuery && filteredArtefacts.length === 0 && (
          <div className="flex flex-col gap-4 items-center justify-center">
            <p className="text-orange-100 text-lg">No artefacts found for &quot;{searchQuery}&quot;</p>
          </div>
        )}
      </div>
    </>
  );
}
