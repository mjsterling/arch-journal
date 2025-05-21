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
import { CardContainer } from './CardContainer';

export default function CollectionCard({
  collection,
  combined = false,
}: {
  collection: Collection;
  combined?: boolean;
}) {
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

  const onContextMenu = (e: React.MouseEvent) =>
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
          label: '[WIKI]' + collection.name,
          callback: () => wiki(collection.name),
        },
        {
          label: '[WIKI]Collector: ' + collection.collector,
          callback: () => wiki(collection.collector),
        },
      ],
    ]);

  if (hidden) return null;

  return (
    <CardContainer
      name={collection.name}
      isComplete={isComplete}
      isHighlighted={isHighlighted}
      digsiteInfo={digsiteInfo}
      combined={combined}
      onContextMenu={onContextMenu}
      opacity={opacity}
    >
      <div className="flex justify-start items-center mb-4 md:mb-0 gap-4 min-w-[270px] font-semibold text-orange-100">
        <Icon
          src={collection.image}
          alt={collection.name}
          className="h-8 w-8 lg:h-10 lg:w-10 object-contain sm:block"
        />
        <div className="flex flex-col items-start gap-1">
          <p
            className={[
              'text-left text-wrap text-lg',
              isHighlighted ? 'text-yellow-500' : 'text-orange-100',
            ].join(' ')}
          >
            {collection.name.replace('Museum -', 'M.')}
          </p>
          <div className="flex gap-3">
            {collection.reward &&
              !isComplete &&
              Object.entries(collection.reward).map(([name, amount]) => (
                <div
                  className="flex gap-1 items-center"
                  key={`${collection}_Reward_${name}`}
                >
                  <Icon
                    src={`/assets/collections/${name.replace(/ /g, '_')}.${
                      name === 'Tetracompass piece' || name === 'Elder Trove'
                        ? 'gif'
                        : 'png'
                    }`}
                    alt={name}
                    title={name}
                    contextMenu
                    className="h-5 w-5 object-contain cursor-help"
                  />
                  <span className="text-sm text-orange-100">
                    {amount ? shortNumber(amount) : ''}
                  </span>
                </div>
              ))}
            {(!collection.reward || isComplete) &&
              Object.entries(collection.recurringReward).map(
                ([name, amount]) => (
                  <div
                    className="flex gap-1 items-center text-sm"
                    key={`${collection}_Reward_${name}`}
                  >
                    <Icon
                      src={`/assets/collections/${name.replace(/ /g, '_')}.${
                        name === 'Tetracompass piece' || name === 'Elder Trove'
                          ? 'gif'
                          : 'png'
                      }`}
                      alt={name}
                      title={name}
                      contextMenu
                      className="h-5 w-5 object-contain cursor-help"
                    />
                    <span className="text-sm text-orange-100">
                      {amount ? shortNumber(amount) : ''}
                    </span>
                  </div>
                )
              )}
          </div>
        </div>
        <div className="flex justify-end md:hidden">
          <LevelSiteDisplay
            level={collection.levelToComplete!}
            site={digsiteInfo}
          />
        </div>
      </div>
      <div className="flex w-full h-fit flex-row flex-wrap items-center content-start gap-2 justify-start">
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
      </div>

      <LevelSiteDisplay
        className="hidden md:flex"
        level={collection.levelToComplete!}
        site={digsiteInfo}
      />
    </CardContainer>
  );
}
