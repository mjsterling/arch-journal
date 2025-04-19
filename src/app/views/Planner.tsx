import { useEffect, useMemo, useState } from 'react';
import { Collections as CollectionData } from '../data/Collections';
import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid';
import { useArtefacts } from '../data/ArtefactProvider';
import { ArtefactStates } from '../data/Artefact';
import CollectionButton from '../components/ArtefactCollectionCard/CollectionButton';
import { useGlobalState } from '../data/GlobalStateProvider';
import { Materials } from '../data/Materials';
import Icon from '../components/Icon';

export default function Planner() {
  const { artefacts } = useArtefacts();
  const {
    materialStorage,
    wiki,
    createContextMenu,
    activeCollection,
    setActiveCollection,
  } = useGlobalState();

  const [mode, setMode] = useState<'first' | 'recurring'>('first');
  const [numberOfRecurringCompletions, setNumberOfRecurringCompletions] =
    useState<number>(1);
  const collections = useMemo(
    () =>
      CollectionData.map((collection) => {
        const artefactsInCollection = artefacts.filter((artefact) =>
          Object.keys(artefact.collections).includes(collection.name)
        );

        return {
          ...collection,
          artefacts: artefactsInCollection,
          levelToComplete: Math.max(
            ...artefactsInCollection.map((artefact) => artefact.level)
          ),
        };
      }).sort((a, b) => a.levelToComplete - b.levelToComplete),
    [artefacts]
  );
  const selectedCollectionData = useMemo(
    () =>
      activeCollection
        ? collections.find((collection) => collection.name === activeCollection)
        : null,
    [activeCollection, collections]
  );
  const selectedCollectionIsComplete = useMemo(() => {
    if (!selectedCollectionData) return false;

    return selectedCollectionData.artefacts.every(
      (artefact) =>
        artefact.collections[selectedCollectionData.name] ===
        ArtefactStates.Completed
    );
  }, [selectedCollectionData]);

  useEffect(() => {
    if (activeCollection && selectedCollectionIsComplete) {
      setMode('recurring');
    } else if (activeCollection && !selectedCollectionIsComplete) {
      setMode('first');
    }
  }, [activeCollection, selectedCollectionIsComplete]);

  const selectedCollectionMaterials = useMemo(() => {
    if (!selectedCollectionData) return null;
    const materials = Object.entries(selectedCollectionData.artefacts).reduce(
      (acc, [, artefact]) => {
        Object.entries(artefact.materials).forEach(([material, amount]) => {
          if (
            (mode === 'first' &&
              artefact.collections[selectedCollectionData.name] ===
                ArtefactStates.Completed) ||
            artefact.collections[selectedCollectionData.name] ===
              ArtefactStates.Restored
          ) {
            return acc;
          } else {
            if (acc[material]) {
              acc[material] +=
                amount * (mode === 'first' ? 1 : numberOfRecurringCompletions);
            } else {
              acc[material] =
                amount * (mode === 'first' ? 1 : numberOfRecurringCompletions);
            }
          }
        });
        return acc;
      },
      {} as Record<string, number>
    );
    return Object.entries(materials)
      .sort(([name1], [name2]) => (name1 > name2 ? 1 : -1))
      .map(([material, amount]) => ({
        name: material,
        amount,
      }));
  }, [selectedCollectionData, mode, numberOfRecurringCompletions]);

  return (
    <div className="flex flex-col gap-8 text-orange-100 w-full max-w-[1000px] mx-auto">
      <div className="flex flex-col gap-4 w-full">
        {activeCollection ? (
          <div className="flex flex-row gap-4 justify-center items-center">
            <button
              className="invisible pointer-events-none"
              aria-hidden="true"
            >
              <ArrowUturnLeftIcon className="h-8 w-8 text-orange-100" />
            </button>
            <h2 className="text-2xl mx-auto">{activeCollection} </h2>
            <button
              className="cursor-pointer"
              onClick={() => setActiveCollection('')}
            >
              <ArrowUturnLeftIcon className="h-8 w-8 text-orange-100" />
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl mx-auto">Load a collection:</h2>
            <select
              className="text-xl bg-gray-800 text-orange-100 p-2 rounded-md cursor-pointer"
              onChange={(e) => {
                setActiveCollection(e.target.value);
              }}
              value=""
            >
              <option value="" disabled>
                Select a collection
              </option>
              {collections.map((collection) => (
                <option key={collection.name} value={collection.name}>
                  ({collection.levelToComplete}) {collection.name}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
      <div className="flex flex-row gap-4 justify-center items-center w-full">
        <button
          className={[
            'px-5 py-1 rounded-md cursor-pointer border border-orange-100 disabled:cursor-not-allowed disabled:opacity-50',
            mode === 'first' ? 'bg-orange-100 text-gray-800 font-bold' : '',
          ].join(' ')}
          disabled={selectedCollectionIsComplete}
          onClick={() => setMode('first')}
        >
          First Completion
        </button>
        <button
          className={[
            'px-5 py-1 rounded-md cursor-pointer border border-orange-100',
            mode === 'recurring' ? 'bg-orange-100 text-gray-800 font-bold' : '',
          ].join(' ')}
          onClick={() => setMode('recurring')}
        >
          Recurring Completions
        </button>
      </div>
      {mode === 'first' && selectedCollectionData && (
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-row gap-8 w-full justify-center items-center">
            {Object.entries(
              selectedCollectionData.reward ??
                selectedCollectionData.recurringReward
            ).map(([reward, amount]) => {
              return (
                <div
                  key={`${selectedCollectionData.name}_${reward}`}
                  onContextMenu={(e) =>
                    createContextMenu(e, [
                      [
                        {
                          label: 'Wiki: ' + reward,
                          callback: () => wiki(reward),
                        },
                      ],
                    ])
                  }
                  className="flex flex-col items-center text-orange-100 px-2 cursor-help"
                >
                  <Icon
                    src={`/assets/collections/${reward.replace(/ /g, '_')}.${
                      reward === 'Tetracompass piece' ||
                      reward === 'Elder Trove'
                        ? 'gif'
                        : 'png'
                    }`}
                    alt={reward}
                    className="h-8 w-8 object-contain"
                  />
                  <p className="text-base font-bold">
                    {reward} x {Intl.NumberFormat('en-AU').format(amount)}
                  </p>
                </div>
              );
            })}
          </div>
          <ul className="flex flex-col gap-6 items-stretch">
            {selectedCollectionData.artefacts.map((artefact) => (
              <li
                key={artefact.name}
                className="grid grid-cols-[64px_1.2fr_2fr] grid-rows-1 gap-4 justify-start items-center bg-[#FFF1] rounded-lg p-4"
              >
                <CollectionButton
                  artefact={artefact}
                  collection={selectedCollectionData.name}
                  collector={selectedCollectionData.collector}
                  image={artefact.image}
                  status={artefact.collections[selectedCollectionData.name]}
                />
                <span className="text-lg font-bold">{artefact.name}</span>
                <div className="flex flex-row gap-8 justify-end items-center">
                  {Object.entries(artefact.materials)
                    .sort(([name1], [name2]) => (name1 > name2 ? 1 : -1))
                    .map(([material, amount]) => (
                      <div
                        className={[
                          'flex flex-col gap-1',
                          artefact.collections[selectedCollectionData.name] ===
                            ArtefactStates.Restored ||
                          artefact.collections[selectedCollectionData.name] ===
                            ArtefactStates.Completed
                            ? 'opacity-20'
                            : '',
                        ].join(' ')}
                        key={`${artefact.name}_${material}`}
                      >
                        <div className="flex justify-center items-center">
                          <Icon
                            src={`/assets/materials/${material.replace(
                              / /g,
                              '_'
                            )}.png`}
                            alt={material}
                            className="h-8 w-8 object-contain object-center cursor-help"
                            contextMenu
                          />
                        </div>
                        <span className="w-full text-center font-bold">
                          {amount}
                        </span>
                      </div>
                    ))}
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-col justify-center items-center w-full max-w-[1000px] mx-auto grid-rows-1 gap-6 py-8 bg-[#FFF1] rounded-lg p-4">
            <span className="col-span-2 text-lg font-bold">
              Remaining Materials
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-12 gap-y-6 justify-center items-center">
              {selectedCollectionMaterials?.map((material) => (
                <div
                  key={material.name}
                  className="flex flex-row gap-3 justify-center items-center"
                >
                  <Icon
                    src={`/assets/materials/${material.name.replace(
                      / /g,
                      '_'
                    )}.png`}
                    alt={material.name}
                    className="h-8 w-8 object-contain object-center cursor-help"
                    contextMenu
                  />
                  <span
                    className={[
                      'w-full text-right font-bold',
                      !materialStorage.hasOwnProperty(material.name)
                        ? 'text-yellow-500'
                        : materialStorage[material.name as Materials] <
                          material.amount
                        ? 'text-red-500'
                        : 'text-green-500',
                    ].join(' ')}
                  >
                    {materialStorage[material.name as Materials]}
                    {materialStorage.hasOwnProperty(material.name) ? ' / ' : ''}
                    {material.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {mode === 'recurring' && selectedCollectionData && (
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-row gap-4 justify-center items-center">
            <span className="text-lg font-bold">Number of Completions:</span>
            <input
              min={0}
              max={100}
              value={numberOfRecurringCompletions}
              onChange={(e) =>
                setNumberOfRecurringCompletions(
                  Math.max(0, Math.min(100, Number(e.target.value)))
                )
              }
              className="w-16 text-center bg-gray-800 text-orange-100 p-2 rounded-md cursor-pointer"
            />
          </div>
          <div className="flex flex-row gap-8 w-full justify-center items-center">
            {Object.entries(selectedCollectionData.recurringReward).map(
              ([reward, amount]) => {
                return (
                  <div
                    key={`${selectedCollectionData.name}_${reward}`}
                    onContextMenu={(e) =>
                      createContextMenu(e, [
                        [
                          {
                            label: 'Wiki: ' + reward,
                            callback: () => wiki(reward),
                          },
                        ],
                      ])
                    }
                    className="flex flex-col items-center text-orange-100 px-2 cursor-help"
                  >
                    <Icon
                      src={`/assets/collections/${reward.replace(/ /g, '_')}.${
                        reward === 'Tetracompass piece' ||
                        reward === 'Elder Trove'
                          ? 'gif'
                          : 'png'
                      }`}
                      alt={reward}
                      className="h-8 w-8 object-contain"
                    />
                    <p className="text-base font-bold">
                      {reward} x{' '}
                      {Intl.NumberFormat('en-AU').format(
                        amount * numberOfRecurringCompletions
                      )}
                    </p>
                  </div>
                );
              }
            )}
          </div>
          <ul className="flex flex-col gap-6 items-stretch">
            {selectedCollectionData.artefacts.map((artefact) => (
              <li
                key={artefact.name}
                className="grid grid-cols-[64px_1.2fr_2fr] grid-rows-1 gap-4 justify-start items-center bg-[#FFF1] rounded-lg p-4"
              >
                <Icon
                  src={artefact.image}
                  alt={artefact.name}
                  className="h-8 w-8 cursor-help ml-3"
                  contextMenu
                />
                <span className="text-lg font-bold">
                  {artefact.name} x {numberOfRecurringCompletions}
                </span>
                <div className="flex flex-row gap-8 justify-end items-center">
                  {Object.entries(artefact.materials)
                    .sort(([name1], [name2]) => (name1 > name2 ? 1 : -1))
                    .map(([material, amount]) => (
                      <div
                        className={'flex flex-col gap-1'}
                        key={`${artefact.name}_${material}`}
                      >
                        <div className="flex justify-center items-center">
                          <Icon
                            src={`/assets/materials/${material.replace(
                              / /g,
                              '_'
                            )}.png`}
                            alt={material}
                            className="h-8 w-8 object-contain object-center cursor-help"
                            contextMenu
                          />
                        </div>
                        <span className="w-full text-center font-bold">
                          {Intl.NumberFormat('en-AU').format(
                            amount * numberOfRecurringCompletions
                          )}
                        </span>
                      </div>
                    ))}
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-col justify-center items-center w-full max-w-[1000px] mx-auto grid-rows-1 gap-6 py-8 bg-[#FFF1] rounded-lg p-4">
            <span className="col-span-2 text-lg font-bold">
              Total Materials
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-12 gap-y-6 justify-center items-center">
              {selectedCollectionMaterials?.map((material) => (
                <div
                  key={material.name}
                  className="flex flex-row gap-3 justify-center items-center"
                >
                  <Icon
                    src={`/assets/materials/${material.name.replace(
                      / /g,
                      '_'
                    )}.png`}
                    alt={material.name}
                    className="h-8 w-8 object-contain object-center cursor-help"
                    contextMenu
                  />
                  <span
                    className={[
                      'w-full text-right font-bold',
                      !materialStorage.hasOwnProperty(material.name)
                        ? 'text-yellow-500'
                        : materialStorage[material.name as Materials] <
                          material.amount
                        ? 'text-red-500'
                        : 'text-green-500',
                    ].join(' ')}
                  >
                    {materialStorage[material.name as Materials]}
                    {materialStorage.hasOwnProperty(material.name) ? ' / ' : ''}
                    {Intl.NumberFormat('en-AU').format(material.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
