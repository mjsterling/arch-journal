import { useMemo } from 'react';
import { Digsites } from '../../data/Digsites';
import { Artefact, useArtefacts } from '../../data/ArtefactProvider';
import { Collection } from '../../data/Collections';
import { ArtefactStates } from '../../data/Artefact';
import ArtefactCollectionButton from './ArtefactCollectionButton';
import LevelSiteDisplay from './LevelSiteDisplay';
import useHideCard from './useHideCard';
import { useGlobalState } from '@/app/data/GlobalStateProvider';
import Icon from '../Icon';

export default function CollectionCard(collection: Collection) {
  const { setArtefact } = useArtefacts();
  const { createContextMenu, wiki, goToPlanner, highlightedCollection } =
    useGlobalState();
  const digsiteName = useMemo(() => {
    if (!collection.artefacts?.[0]?.digsite) return null;
    return collection.artefacts[0].digsite;
  }, [collection]);

  const digsiteInfo = useMemo(() => {
    if (!digsiteName) return null;
    const digsite = Digsites[digsiteName];
    return { ...digsite, name: digsiteName };
  }, [digsiteName]);

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

  const isHighlighted = useMemo(
    () => collection.name === highlightedCollection,
    [collection, highlightedCollection]
  );

  const { hidden, opacity } = useHideCard(isComplete);

  const shortNumber = (num: number) => {
    if (num >= 10000) {
      return Math.round(num / 1000).toFixed(0) + 'k';
    }
    if (num >= 1000) {
      return (Math.round(num / 100) / 10).toFixed(1) + 'k';
    }
    return num.toString();
  };

  if (hidden) return null;

  return (
    <div
      className={[
        'w-full bg-gray-800 border-2 rounded-lg px-4 sm:px-8 py-12 lg:py-4 lg:grid lg:grid-cols-[2fr_6fr_0.7fr] justify-between gap-8 cursor-help transition-opacity duration-500',
        isComplete ? 'border-green-700' : 'border-orange-100',
        isHighlighted
          ? 'outline-2 -outline-offset-2 outline-yellow-500 z-10'
          : 'z-0',
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
      <div className="flex flex-row sm:grid sm:grid-cols-[84px_1fr_84px] lg:flex lg:flex-row flex-wrap lg:flex-nowrap content-center gap-4 justify-around md:justify-between items-center font-bold text-orange-100 pb-4 lg:pb-0">
        <Icon
          src={collection.image}
          alt={collection.name}
          className="h-10 w-10 object-contain hidden sm:block"
        />
        <p
          className={[
            'text-center text-wrap md:text-nowrap',
            isHighlighted ? 'text-yellow-500' : 'text-white',
          ].join(' ')}
        >
          {collection.name}
        </p>
        <LevelSiteDisplay
          className="hidden sm:flex lg:hidden"
          level={collection.levelToComplete!}
          site={digsiteInfo}
        />
      </div>
      <div className="flex flex-row flex-wrap gap-2 justify-center lg:justify-start items-center">
        {collection.artefacts &&
          collection.artefacts.map((artefact: Artefact) => {
            return (
              <ArtefactCollectionButton
                mode="collectionPage"
                artefact={artefact}
                key={artefact.name}
                collection={collection.name}
                collector={collection.collector}
                image={artefact.image}
                status={artefact.collections[collection.name]}
              />
            );
          })}
        <span className="text-2xl px-4 font-bold text-orange-100 w-12 text-center">
          =
        </span>

        {Object.entries(
          collection.reward && !isComplete
            ? collection.reward
            : collection.recurringReward
        ).map(([reward, amount]) => {
          return (
            <div
              key={`${collection.name}_${reward}`}
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
              className="flex flex-col items-center text-orange-100 px-2 w-12"
            >
              <img
                src={`/assets/collections/${reward.replace(/ /g, '_')}.${
                  reward === 'Tetracompass piece' || reward === 'Elder Trove'
                    ? 'gif'
                    : 'png'
                }`}
                alt={reward}
                className="h-8 w-8 object-contain"
              />
              <p className="text-sm font-bold">
                {amount ? shortNumber(amount) : ''}
              </p>
            </div>
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
