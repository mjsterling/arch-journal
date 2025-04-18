import { useMemo } from 'react';
import { Digsites } from '../../data/Digsites';
import { Artefact, useArtefacts } from '../../data/ArtefactProvider';
import { Collection } from '../../data/Collections';
import { ArtefactStates } from '../../data/Artefact';
import CollectionButton from './CollectionButton';
import LevelSiteDisplay from './LevelSiteDisplay';
import useHideCard from './useHideCard';
import { useGlobalState } from '@/app/data/GlobalStateProvider';

export default function CollectionCard(collection: Collection) {
  const { setArtefact } = useArtefacts();
  const { createContextMenu, wiki, goToPlanner } = useGlobalState();
  const digsiteName = useMemo(() => {
    if (!collection.artefacts?.[0]?.digsite) return null;
    return collection.artefacts[0].digsite;
  }, [collection]);

  const digsiteInfo = useMemo(() => {
    if (!digsiteName) return null;
    const digsite = Digsites[digsiteName];
    return { ...digsite, name: digsiteName };
  }, [collection]);

  const isComplete = useMemo(() => {
    return collection.artefacts
      ? collection.artefacts.every(
          (artefact) =>
            artefact.collections[collection.name] === ArtefactStates.Completed
        )
      : false;
  }, [collection]);

  const markAllAsCompleted = () => {
    collection.artefacts?.forEach((artefact: Artefact) => {
      const newArtefact = { ...artefact };
      newArtefact.collections[collection.name] = ArtefactStates.Completed;
      setArtefact(newArtefact);
    });
  };
  const markAllAsNotFound = () => {
    collection.artefacts?.forEach((artefact: Artefact) => {
      const newArtefact = { ...artefact };
      newArtefact.collections[collection.name] = ArtefactStates.NotFound;
      setArtefact(newArtefact);
    });
  };

  const { hidden, opacity } = useHideCard(isComplete);

  if (hidden) return null;

  return (
    <div
      className={[
        'w-full bg-gray-800 border-2 rounded-lg px-4 sm:px-8 py-12 lg:py-4 lg:grid lg:grid-cols-[2.8fr_6fr_1fr] justify-between gap-8 cursor-help transition-opacity duration-500',
        isComplete ? 'border-green-700' : 'border-orange-100',
      ].join(' ')}
      style={{
        backgroundColor: digsiteInfo?.backgroundColor ?? '#333',
        opacity,
      }}
      id={collection.name.replace(/\W/g, '')}
      onContextMenu={(e) =>
        createContextMenu(e, [
          [
            isComplete
              ? { label: 'Reset Collection', callback: markAllAsNotFound }
              : {
                  label: 'Mark all as Completed',
                  callback: markAllAsCompleted,
                },
            {
              label: 'Open in Planner',
              callback: () => {
                goToPlanner(collection.name);
              },
            },
          ],
          [
            {
              label: 'Wiki: ' + collection.name,
              callback: () => wiki(collection.name),
            },
            {
              label: 'Wiki: ' + collection.collector,
              callback: () => wiki(collection.collector),
            },
          ],
        ])
      }
    >
      <div className="grid grid-cols-[50px_1fr_50px] sm:grid-cols-[84px_1fr_84px] lg:flex lg:flex-row flex-wrap lg:flex-nowrap content-center gap-4 justify-around md:justify-between items-center font-bold text-orange-100 pb-4 lg:pb-0">
        <img
          src={collection.image}
          alt={collection.name}
          className="h-10 w-10 object-contain"
        />
        <p className="text-center lg:text-right text-lg text-wrap">
          {collection.name}
        </p>
        <p className="text-center text-lg sm:hidden">
          {collection.levelToComplete}
        </p>
        <LevelSiteDisplay
          className="hidden sm:flex lg:hidden"
          level={collection.levelToComplete!}
          site={digsiteInfo}
        />
      </div>
      <div className="flex flex-row flex-wrap md:flex-nowrap gap-2 justify-center lg:justify-start">
        {collection.artefacts &&
          collection.artefacts.map((artefact: Artefact) => {
            return (
              <CollectionButton
                artefact={artefact}
                key={artefact.name}
                collection={collection.name}
                collector={collection.collector}
                image={artefact.image}
                status={artefact.collections[collection.name]}
              />
            );
          })}
      </div>
      <LevelSiteDisplay
        className="hidden lg:flex"
        level={collection.levelToComplete!}
        site={digsiteInfo}
      />
    </div>
  );
}
