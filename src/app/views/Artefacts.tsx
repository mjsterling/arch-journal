import { Artefact, useArtefacts } from '../data/ArtefactProvider';
import ArtefactCard from '../components/ArtefactCollectionCard/ArtefactCard';
import { useGlobalState } from '../data/GlobalStateProvider';
import { useMemo } from 'react';
import { ArtefactStates } from '../data/Artefact';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid';
import useLazySearch from '../components/ArtefactCollectionCard/useLazySearch';

export default function Artefacts() {
  const { artefacts, isComplete } = useArtefacts();
  const { screen, showCompleted, setShowCompleted, createContextMenu, wiki } =
    useGlobalState();
  const { setArtefact } = useArtefacts();

  const {
    filteredData: filteredArtefacts,
    searchQuery,
    handleSearch,
    clearSearch,
  } = useLazySearch<Artefact>(artefacts);

  const artefactsWithHotspots = useMemo<{ [key: string]: Artefact[] }>(() => {
    const _artefactsWithHotspots: { [key: string]: Artefact[] } = {};
    filteredArtefacts.forEach((artefact: Artefact) => {
      _artefactsWithHotspots[artefact.hotspot] =
        _artefactsWithHotspots[artefact.hotspot] || [];
      _artefactsWithHotspots[artefact.hotspot].push(artefact);
    });
    return _artefactsWithHotspots;
  }, [filteredArtefacts]);

  const hotspotsCompleted = useMemo(() => {
    const _hotspotsCompleted: { [key: string]: boolean } = {};
    for (const hotspot in artefactsWithHotspots) {
      _hotspotsCompleted[hotspot] =
        artefactsWithHotspots[hotspot]
          .map(isComplete)
          .reduce((a, b) => Number(a) + Number(b), 0) ===
        artefactsWithHotspots[hotspot].length;
    }
    return _hotspotsCompleted;
  }, [artefactsWithHotspots, isComplete]);

  const markAllAsNotFound = (hotspot: string) => {
    const newArtefacts = [...artefactsWithHotspots[hotspot]];
    newArtefacts.forEach((artefact) => {
      const newArtefact = { ...artefact };
      Object.keys(newArtefact.collections).forEach((collection) => {
        newArtefact.collections[collection] = ArtefactStates.NotFound;
      });
      setArtefact(newArtefact);
    });
  };
  const markAllAsCompleted = (hotspot: string) => {
    const newArtefacts = [...artefactsWithHotspots[hotspot]];
    console.log(newArtefacts);
    newArtefacts.forEach((artefact) => {
      const newArtefact = { ...artefact };
      Object.keys(newArtefact.collections).forEach((collection) => {
        newArtefact.collections[collection] = ArtefactStates.Completed;
      });
      setArtefact(newArtefact);
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4 justify-center">
        <button
          className={[
            'rounded-md border border-orange-100 px-5 py-1 cursor-pointer',
            'bg-transparent text-orange-100',
            'transition-colors ease-in-out',
            'hover:bg-orange-100 hover:text-gray-950',
          ].join(' ')}
          onClick={() => setShowCompleted(!showCompleted)}
        >
          {showCompleted
            ? `Showing Completed ${screen}`
            : `Hiding Completed ${screen}`}
        </button>
      </div>
      <div className="w-full h-full flex flex-col gap-4 px-6 py-6 md:px-12 md:py-12">
        <div className="flex flex-row gap-2 border-2 border-orange-100 rounded-lg p-2">
          <MagnifyingGlassIcon className="w-6 h-6 text-orange-100" />
          <input
            type="text"
            className="w-full text-orange-100 !outline-none"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchQuery.length ? (
            <button onClick={clearSearch} className="cursor-pointer">
              <XMarkIcon className="w-6 h-6 text-orange-100" />
            </button>
          ) : null}
        </div>

        {searchQuery && (
          <div className="flex flex-row gap-2 items-center text-orange-100 italic">
            Showing {filteredArtefacts.length} of {artefacts.length} artefacts
          </div>
        )}

        {Object.entries(artefactsWithHotspots).map(([hotspot, artefacts]) =>
          hotspotsCompleted[hotspot] &&
          !showCompleted &&
          !searchQuery ? null : (
            <div key={`${hotspot}_container`}>
              <span className="cursor-help">
                <h2
                  className={[
                    'text-xl text-orange-100 font-bold mx-auto pt-8 pb-4',
                    hotspotsCompleted[hotspot] ? 'opacity-50' : '',
                  ].join(' ')}
                  key={`${hotspot}_title`}
                  onContextMenu={(e) =>
                    createContextMenu(e, [
                      [
                        hotspotsCompleted[hotspot]
                          ? {
                              label: 'Reset hotspot',
                              callback: () => markAllAsNotFound(hotspot),
                            }
                          : {
                              label: 'Mark hotspot as completed',
                              callback: () => markAllAsCompleted(hotspot),
                            },
                      ],
                      [
                        {
                          label: 'Wiki: ' + hotspot,
                          callback: () => wiki(hotspot),
                        },
                      ],
                    ])
                  }
                >
                  {hotspot}
                </h2>
              </span>

              {artefacts.map((artefact) => (
                <ArtefactCard
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
            <p className="text-orange-100 text-lg">
              No artefacts found for &quot;{searchQuery}&quot;
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
