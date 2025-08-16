'use client';
import { useMemo, useEffect, useState } from 'react';
import { type Artefact, useArtefacts, useContextMenu, useSettings } from '@/data/providers';
import { ArtefactStates } from '@/data/constants';
import { CheckIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useLazySearch } from '@/data/hooks';
import { ArtefactCard, Icon } from '@/components';

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

  const { createHotspotContextMenu, createMaterialContextMenu } = useContextMenu();

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
        <div className="flex gap-2 items-center text-orange-100">
          <button
            value={showCompletedArtefacts ? 'checked' : 'unchecked'}
            className={[
              'rounded-md border border-orange-100 cursor-pointer',
              'bg-transparent text-orange-100',
              'transition-colors ease-in-out h-6 w-6 flex justify-center items-center',
            ].join(' ')}
            onClick={toggleShowCompletedArtefacts}
          >
            {showCompletedArtefacts ? <CheckIcon className="w-5 h-5 text-orange-100" /> : null}
          </button>
          Show completed artefacts?
        </div>
      </div>
      <div className="w-full h-full flex flex-col gap-4 sm:px-6 py-2 md:px-12 md:py-6">
        {searchQuery && (
          <div className="flex flex-row gap-2 items-center text-orange-100 italic">
            Showing {filteredArtefacts.length} of {artefacts.length} artefacts
          </div>
        )}

        {Object.entries(artefactsByHotspot).map(([hotspot, { artefacts, completed }]) =>
          completed && !showCompletedArtefacts && !searchQuery ? null : (
            <div key={`${hotspot}_container`} className="relative w-full mt-2">
              <span className="flex flex-col w-full md:flex-row justify-between items-center py-4 gap-y-1">
                <h2
                  className={['text-xl text-orange-100 font-semibold cursor-help', completed ? 'opacity-50' : ''].join(
                    ' '
                  )}
                  key={`${hotspot}_title`}
                  onContextMenu={createHotspotContextMenu(
                    hotspot,
                    completed,
                    () => markAllAsNotFound(hotspot),
                    () => markAllAsCompleted(hotspot)
                  )}
                >
                  {hotspot}
                </h2>
                <div className="flex gap-3 items-center text-orange-100">
                  {!completed &&
                    Object.entries(hotspotMaterials(hotspot)).map(([material, amount]) => (
                      <div
                        key={`${material}_${amount}`}
                        className="flex flex-row gap-1.5 items-center"
                        onContextMenu={createMaterialContextMenu(material)}
                      >
                        <Icon
                          src={`/assets/materials/${material.replace(/ /g, '_')}.png`}
                          alt={material}
                          className="h-6 w-6 object-contain object-center"
                        />
                        <p className="text-orange-100 font-semibold text-base">{amount}</p>
                      </div>
                    ))}
                </div>
              </span>

              {artefacts.map((artefact) => (
                <ArtefactCard
                  highlighted={artefact.name === highlightedArtefact}
                  key={artefact.name}
                  artefact={artefact}
                  alwaysShow={searchQuery.length > 0}
                  combined={true}
                />
              ))}
            </div>
          )
        )}
        {searchQuery && filteredArtefacts.length === 0 && (
          <div className="flex flex-col gap-4 items-center justify-center">
            <p className="text-orange-100 text-lg">No artefacts found for &quot;{searchQuery}&quot;</p>
          </div>
        )}
      </div>
    </div>
  );
}
