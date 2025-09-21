'use client';
import { useEffect, useMemo, useState } from 'react';
import { ArtefactStates, Collections as CollectionData, type Materials, MaterialsList } from '@/data/constants';
import { useArtefacts, useContextMenu, useGlobalState } from '@/data/providers';
import { CollectionSearch, MaterialDisplay, RewardDisplay } from './partials';
import { ArtefactCollectionButton, Checkbox, Icon, RadioGroup } from '@/components';

export default function Planner() {
  const { createMaterialContextMenu, createWikiContextMenu } = useContextMenu();
  const { materialStorage } = useGlobalState();
  const {
    activeCollection,
    setActiveCollection,
    toggleArtefact,
    toggledArtefacts,
    collections,
    mode,
    setMode,
    numberOfRecurringCompletions,
    setNumberOfRecurringCompletions,
    selectedCollectionIsComplete,
    selectedCollectionData,
    selectedCollectionMaterials,
  } = usePlannerData();

  return (
    <div className="flex flex-col gap-4 md:gap-8 items-center text-orange-100 w-full max-w-[1000px] mx-auto">
      <CollectionSearch
        activeCollection={activeCollection}
        setActiveCollection={setActiveCollection}
        collections={collections}
      />
      <div className="flex flex-row justify-center w-full py-2">
        <RadioGroup
          options={[
            {
              key: 'first',
              label: 'First Completion',
              labelMobile: 'First',
              disabled: selectedCollectionIsComplete,
            },
            { key: 'recurring', label: 'Recurring Completions', labelMobile: 'Recurring' },
          ]}
          value={mode}
          setValue={setMode as React.Dispatch<React.SetStateAction<string>>}
        />
      </div>
      {selectedCollectionData && (
        <>
          {mode === 'recurring' && (
            <div className="flex flex-row gap-4 justify-center items-center">
              <span className="text-base md:hidden font-semibold"># of completions:</span>
              <span className="hidden md:inline text-lg font-semibold">Number of Completions:</span>
              <input
                value={numberOfRecurringCompletions}
                onChange={(e) => setNumberOfRecurringCompletions(Number(e.target.value.replace(/[^0-9]/g, '') || 0))}
                className="w-24 text-center bg-gray-800 text-orange-100 p-2 rounded-md cursor-pointer"
              />
            </div>
          )}
          <div className="flex flex-col gap-8 w-full">
            <RewardDisplay
              selectedCollectionData={selectedCollectionData}
              mode={mode}
              numberOfRecurringCompletions={numberOfRecurringCompletions}
            />
            <ul className="flex flex-col gap-6 items-stretch">
              {selectedCollectionData.artefacts.map((artefact) => (
                <li
                  key={artefact.name}
                  className={[
                    'flex flex-col md:flex-row gap-4 justify-start items-center bg-[#FFF1] rounded-md py-2 my:py-4 p-4',
                    toggledArtefacts[artefact.name] && mode === 'recurring' ? 'opacity-50' : '',
                  ].join(' ')}
                >
                  <div className="flex flex-row justify-start w-full gap-4 items-center">
                    {mode === 'first' ? (
                      <ArtefactCollectionButton
                        mode="collectionPage"
                        artefact={artefact}
                        collection={selectedCollectionData.name}
                        collector={selectedCollectionData.collector}
                        image={artefact.image}
                        status={artefact.collections[selectedCollectionData.name]}
                      />
                    ) : (
                      <>
                        <Checkbox
                          label=""
                          checked={toggledArtefacts[artefact.name] || false}
                          toggle={() => toggleArtefact(artefact.name)}
                        />
                        <Icon
                          src={artefact.image}
                          alt={artefact.name}
                          className="min-h-6 md:min-h-8 min-w-6 md:min-w-8 max-h-6 md:max-h-8 max-w-6 md:max-w-8 cursor-help"
                          contextMenu
                        />
                      </>
                    )}
                    <span className="text-sm md:text-lg font-semibold col-span-2 md:col-span-1">
                      {artefact.name}
                      {mode === 'recurring' && (
                        <>
                          &nbsp;
                          <span>x {Intl.NumberFormat('en-AU').format(numberOfRecurringCompletions)}</span>
                        </>
                      )}
                    </span>
                  </div>

                  <div className="flex flex-row gap-3 md:gap-8 justify-start md:justify-end md:ml-auto items-center col-span-3 md:col-span-1 w-full">
                    {Object.entries(artefact.materials)
                      .sort(([name1], [name2]) => (name1 > name2 ? 1 : -1))
                      .map(([material, amount]) => (
                        <div
                          className={
                            toggledArtefacts[artefact.name] && mode === 'recurring'
                              ? 'hidden'
                              : [
                                  'flex flex-row md:flex-col gap-1',
                                  mode === 'first' &&
                                  (artefact.collections[selectedCollectionData.name] === ArtefactStates.Restored ||
                                    artefact.collections[selectedCollectionData.name] === ArtefactStates.Completed)
                                    ? 'opacity-20'
                                    : '',
                                ].join(' ')
                          }
                          key={`${artefact.name}_${material}`}
                        >
                          <div className="flex justify-center items-center">
                            <Icon
                              src={`/assets/materials/${material.replace(/ /g, '_')}.png`}
                              alt={material}
                              className="min-h-6 md:min-h-8 min-w-6 md:min-w-8 max-h-6 md:max-h-8 max-w-6 md:max-w-8 object-contain object-center cursor-help"
                              onContextMenu={
                                materialStorage.hasOwnProperty(material)
                                  ? createMaterialContextMenu(material)
                                  : createWikiContextMenu(material)
                              }
                            />
                          </div>
                          <span className="w-full text-center text-sm md:text-base font-semibold">
                            {amount * (mode === 'recurring' ? numberOfRecurringCompletions : 1)}
                          </span>
                        </div>
                      ))}
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-8 w-full">
              <div className="flex flex-col justify-center items-center w-full max-w-[1000px] mx-auto grid-rows-1 gap-6 md:py-8 bg-[#FFF1] rounded-md p-4">
                <span className="col-span-2 text-lg font-semibold">
                  {mode === 'first' ? 'Remaining Materials' : 'Total Materials'}
                </span>
                <div className="w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-x-12 gap-y-4 justify-center items-center">
                  {selectedCollectionMaterials?.map((material) => (
                    <MaterialDisplay {...material} key={material.name} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const usePlannerData = () => {
  const { artefacts, isComplete } = useArtefacts();
  const { materialStorage, activeCollection, setActiveCollection } = useGlobalState();

  const [mode, setMode] = useState<'first' | 'recurring'>('first');
  const [numberOfRecurringCompletions, setNumberOfRecurringCompletions] = useState<number>(1);
  const [toggledArtefacts, setToggledArtefacts] = useState<{ [key: string]: boolean }>({});
  const toggleArtefact = (artefactName: string) => {
    setToggledArtefacts((prev) => ({ ...prev, [artefactName]: !prev[artefactName] }));
  };
  const collections = useMemo(
    () =>
      CollectionData.map((collection) => {
        const artefactsInCollection = artefacts.filter((artefact) =>
          Object.keys(artefact.collections).includes(collection.name)
        );

        return {
          ...collection,
          artefacts: artefactsInCollection,
          levelToComplete: Math.max(...artefactsInCollection.map((artefact) => artefact.level)),
        };
      }).sort((a, b) => a.levelToComplete - b.levelToComplete),
    [artefacts]
  );
  const selectedCollectionData = useMemo(
    () => (activeCollection ? collections.find((collection) => collection.name === activeCollection) : null),
    [activeCollection, collections]
  );
  const selectedCollectionIsComplete = useMemo(
    () => !!selectedCollectionData?.artefacts.every(isComplete),
    [selectedCollectionData, isComplete]
  );

  useEffect(() => {
    if (activeCollection && selectedCollectionIsComplete) {
      setMode('recurring');
    } else if (activeCollection && !selectedCollectionIsComplete) {
      setMode('first');
    }
  }, [activeCollection, selectedCollectionIsComplete]);

  const selectedCollectionMaterials = useMemo(() => {
    if (!selectedCollectionData) return null;
    const activeArtefacts = selectedCollectionData.artefacts.filter((artefact) =>
      mode === 'first'
        ? artefact.collections[selectedCollectionData.name] === ArtefactStates.Damaged
        : !toggledArtefacts[artefact.name]
    );
    if (activeArtefacts.length === 0) return [];
    const materials = Object.entries(activeArtefacts).reduce((acc, [, artefact]) => {
      Object.entries(artefact.materials).forEach(([material, amount]) => {
        if (mode === 'first' && artefact.collections[selectedCollectionData.name] !== ArtefactStates.Damaged) {
          return acc;
        } else {
          if (acc[material]) {
            acc[material] += amount * (mode === 'first' ? 1 : numberOfRecurringCompletions);
          } else {
            acc[material] = amount * (mode === 'first' ? 1 : numberOfRecurringCompletions);
          }
        }
      });
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(materials)
      .sort(([name1], [name2]) => (name1 > name2 ? 1 : -1))
      .map(([material, amount]) => {
        const isArchMaterial = MaterialsList.includes(material as Materials);
        return {
          name: material,
          isArchMaterial,
          storage: isArchMaterial ? materialStorage[material as Materials] : 0,
          diff: isArchMaterial ? materialStorage[material as Materials] - amount : 0,
          amount,
        };
      });
  }, [selectedCollectionData, toggledArtefacts, mode, numberOfRecurringCompletions, materialStorage]);

  return {
    collections,
    activeCollection,
    setActiveCollection,
    mode,
    setMode,
    selectedCollectionData,
    selectedCollectionIsComplete,
    selectedCollectionMaterials,
    numberOfRecurringCompletions,
    setNumberOfRecurringCompletions,
    toggleArtefact,
    toggledArtefacts,
  };
};
