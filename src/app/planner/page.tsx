"use client";
import { useEffect, useMemo, useState } from "react";
import { Collections as CollectionData } from "@/data/constants/Collections";
import { useArtefacts } from "@/data/providers/ArtefactProvider";
import { ArtefactStates } from "@/data/constants/Artefact";
import ArtefactCollectionButton from "@/components/ArtefactCollectionCard/ArtefactCollectionButton";
import { useGlobalState } from "@/data/providers/GlobalStateProvider";
import { Materials, MaterialsList } from "@/data/constants/Materials";
import Icon from "@/components/Icon";
import { useContextMenu } from "@/data/providers/ContextMenuProvider";
import { MaterialDisplay } from "@/app/planner/MaterialDisplay";
import { RewardDisplay } from "@/app/planner/RewardDisplay";
import { CollectionSearch } from "@/app/planner/CollectionSearch";
import { RadioGroup } from "@/components/RadioGroup";

export default function Planner() {
  const { createMaterialContextMenu, createWikiContextMenu } = useContextMenu();
  const { materialStorage } = useGlobalState();
  const {
    activeCollection,
    setActiveCollection,
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
    <div className="flex flex-col gap-8 text-orange-100 w-full max-w-[1000px] mx-auto px-6 py-6 md:px-12 md:py-6">
      <CollectionSearch
        activeCollection={activeCollection}
        setActiveCollection={setActiveCollection}
        collections={collections}
      />
      <RadioGroup
        options={[
          {
            key: "first",
            label: "First Completion",
            disabled: selectedCollectionIsComplete,
          },
          { key: "recurring", label: "Recurring Completions" },
        ]}
        value={mode}
        setValue={setMode}
        selectedCollectionIsComplete={selectedCollectionIsComplete}
      />

      {selectedCollectionData && (
        <>
          {mode === "recurring" && (
            <div className="flex flex-row gap-4 justify-center items-center">
              <span className="text-lg font-semibold">
                Number of Completions:
              </span>
              <input
                value={numberOfRecurringCompletions}
                onChange={(e) =>
                  setNumberOfRecurringCompletions(
                    Number(e.target.value.replace(/[^0-9]/g, "") || 0)
                  )
                }
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
                  className="grid grid-cols-[64px_1.2fr_2fr] grid-rows-2 sm:grid-rows-1 gap-4 justify-start items-center bg-[#FFF1] rounded-md p-4"
                >
                  {mode === "first" ? (
                    <ArtefactCollectionButton
                      mode="collectionPage"
                      artefact={artefact}
                      collection={selectedCollectionData.name}
                      collector={selectedCollectionData.collector}
                      image={artefact.image}
                      status={artefact.collections[selectedCollectionData.name]}
                    />
                  ) : (
                    <Icon
                      src={artefact.image}
                      alt={artefact.name}
                      className="h-8 w-8 cursor-help ml-3"
                      contextMenu
                    />
                  )}
                  <span className="text-lg font-semibold col-span-2 sm:col-span-1">
                    {artefact.name}
                    {mode === "recurring" && (
                      <>
                        &nbsp;
                        <span>
                          x{" "}
                          {Intl.NumberFormat("en-AU").format(
                            numberOfRecurringCompletions
                          )}
                        </span>
                      </>
                    )}
                  </span>
                  <div className="flex flex-row gap-8 justify-center sm:justify-end items-center col-span-3 sm:col-span-1">
                    {Object.entries(artefact.materials)
                      .sort(([name1], [name2]) => (name1 > name2 ? 1 : -1))
                      .map(([material, amount]) => (
                        <div
                          className={[
                            "flex flex-col gap-1",
                            mode === "first" &&
                            (artefact.collections[
                              selectedCollectionData.name
                            ] === ArtefactStates.Restored ||
                              artefact.collections[
                                selectedCollectionData.name
                              ] === ArtefactStates.Completed)
                              ? "opacity-20"
                              : "",
                          ].join(" ")}
                          key={`${artefact.name}_${material}`}
                        >
                          <div className="flex justify-center items-center">
                            <Icon
                              src={`/assets/materials/${material.replace(
                                / /g,
                                "_"
                              )}.png`}
                              alt={material}
                              className="h-8 w-8 object-contain object-center cursor-help"
                              onContextMenu={
                                materialStorage.hasOwnProperty(material)
                                  ? createMaterialContextMenu(material)
                                  : createWikiContextMenu(material)
                              }
                            />
                          </div>
                          <span className="w-full text-center font-semibold">
                            {amount *
                              (mode === "recurring"
                                ? numberOfRecurringCompletions
                                : 1)}
                          </span>
                        </div>
                      ))}
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-8 w-full">
              <div className="flex flex-col justify-center items-center w-full max-w-[1000px] mx-auto grid-rows-1 gap-6 py-8 bg-[#FFF1] rounded-md p-4">
                <span className="col-span-2 text-lg font-semibold">
                  {mode === "first" ? "Remaining Materials" : "Total Materials"}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-12 gap-y-6 justify-center items-center">
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
  const { materialStorage, activeCollection, setActiveCollection } =
    useGlobalState();

  const [mode, setMode] = useState<"first" | "recurring">("first");
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
  const selectedCollectionIsComplete = useMemo(
    () => !!selectedCollectionData?.artefacts.every(isComplete),
    [selectedCollectionData, isComplete]
  );

  useEffect(() => {
    if (activeCollection && selectedCollectionIsComplete) {
      setMode("recurring");
    } else if (activeCollection && !selectedCollectionIsComplete) {
      setMode("first");
    }
  }, [activeCollection, selectedCollectionIsComplete]);

  const selectedCollectionMaterials = useMemo(() => {
    if (!selectedCollectionData) return null;
    const materials = Object.entries(selectedCollectionData.artefacts).reduce(
      (acc, [, artefact]) => {
        Object.entries(artefact.materials).forEach(([material, amount]) => {
          if (
            (mode === "first" &&
              artefact.collections[selectedCollectionData.name] ===
                ArtefactStates.Completed) ||
            artefact.collections[selectedCollectionData.name] ===
              ArtefactStates.Restored
          ) {
            return acc;
          } else {
            if (acc[material]) {
              acc[material] +=
                amount * (mode === "first" ? 1 : numberOfRecurringCompletions);
            } else {
              acc[material] =
                amount * (mode === "first" ? 1 : numberOfRecurringCompletions);
            }
          }
        });
        return acc;
      },
      {} as Record<string, number>
    );
    return Object.entries(materials)
      .sort(([name1], [name2]) => (name1 > name2 ? 1 : -1))
      .map(([material, amount]) => {
        const isArchMaterial = MaterialsList.includes(material as Materials);
        return {
          name: material,
          isArchMaterial,
          storage: isArchMaterial ? materialStorage[material as Materials] : 0,
          diff: isArchMaterial
            ? materialStorage[material as Materials] - amount
            : 0,
          amount,
        };
      });
  }, [
    selectedCollectionData,
    mode,
    numberOfRecurringCompletions,
    materialStorage,
  ]);

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
  };
};
