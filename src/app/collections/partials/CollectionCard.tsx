'use client';
import { useMemo } from 'react';
import { Digsites, ArtefactStates } from '@/data/constants';
import { type Artefact, useArtefacts, useContextMenu, useSettings } from '@/data/providers';
import { ArtefactCollectionButton, LevelSiteDisplay, CardContainer, Icon } from '@/components';
import { useHideCard } from '@/data/hooks';
import { useCollectionsPageData } from '../data';
import { useRouter } from 'next/navigation';
import { wiki } from '@/data/utils';
import { CollectionRewards } from './CollectionRewards';

export const CollectionCard: CollectionCard = ({ collection, combined = false }) => {
  const { highlightedCollection } = useCollectionsPageData();
  const { showCompletedCollections } = useSettings();

  const digsiteNames = useMemo(() => {
    return Array.from(new Set(collection.artefacts?.map((a) => a.digsite)));
  }, [collection]);

  const digsiteInfo = useMemo(() => {
    return digsiteNames.length === 1
      ? { ...Digsites[digsiteNames[0]], name: digsiteNames[0] }
      : digsiteNames.map((digsiteName) => {
          return { ...Digsites[digsiteName], name: digsiteName };
        });
  }, [digsiteNames]);

  const isHighlighted = useMemo(() => collection.name === highlightedCollection, [collection, highlightedCollection]);
  const { hidden, opacity } = useHideCard(collection.isComplete, showCompletedCollections);
  const { onContextMenu } = useHandlers(collection);

  if (hidden) return null;

  return (
    <>
      {/* MOBILE */}
      <CardContainer
        opacity={opacity}
        name={collection.name}
        isComplete={collection.isComplete}
        isHighlighted={isHighlighted}
        digsiteInfo={digsiteInfo}
        combined={combined}
        onContextMenu={onContextMenu}
        className="[&]:md:hidden"
      >
        <div className="flex flex-col items-start gap-1 w-full font-semibold text-orange-100">
          <div className="flex flex-row justify-between w-full items-center gap-4 pt-1 pb-2">
            <div className="flex flex-row gap-2">
              <Icon
                src={collection.image}
                alt={collection.name}
                className="flex md:hidden min-h-5 min-w-5 max-h-5 max-w-5 object-contain transition-all"
              />
              <p
                className={[
                  'text-xs sm:text-sm text-left text-wrap lg:text-nowrap md:text-base lg:text-lg',
                  isHighlighted ? 'text-yellow-500' : 'text-orange-100',
                ].join(' ')}
              >
                {collection.name}
              </p>
            </div>
            <LevelSiteDisplay level={collection.levelToComplete} sites={digsiteInfo} />
          </div>
          <div className="flex w-full flex-row flex-wrap items-center gap-2 justify-start">
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
        </div>
      </CardContainer>
      {/* DESKTOP */}
      <CardContainer
        className="[&]:hidden [&]:md:flex"
        name={collection.name}
        isComplete={collection.isComplete}
        isHighlighted={isHighlighted}
        digsiteInfo={digsiteInfo}
        combined={combined}
        onContextMenu={onContextMenu}
        opacity={opacity}
      >
        <div className="flex w-full px-3 lg:px-0 justify-between md:justify-start items-center mb-4 md:mb-0 gap-4 lg:w-[440px] font-semibold text-orange-100">
          <Icon
            src={collection.image}
            alt={collection.name}
            className="h-8 w-8 lg:h-10 lg:w-10 object-contain sm:block"
          />
          <div className="flex flex-col items-center md:items-start gap-1">
            <p
              className={[
                'text-center md:text-left text-wrap text-lg',
                isHighlighted ? 'text-yellow-500' : 'text-orange-100',
              ].join(' ')}
            >
              {collection.name.replace('Museum -', 'M.')}
            </p>
            <CollectionRewards collection={collection} />
          </div>
          <div className="flex justify-end md:hidden">
            <LevelSiteDisplay level={collection.levelToComplete!} sites={digsiteInfo} />
          </div>
        </div>
        <div className="flex w-full h-fit flex-row flex-wrap items-center gap-2 justify-center lg:justify-start">
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

        <LevelSiteDisplay level={collection.levelToComplete!} sites={digsiteInfo} />
      </CardContainer>
    </>
  );
};

type CollectionCard = React.FC<{
  collection: CollectionWithInfo;
  combined?: boolean;
}>;

const useHandlers = (collection: CollectionWithInfo) => {
  const router = useRouter();
  const { setArtefact } = useArtefacts();
  const { createContextMenu } = useContextMenu();
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
  const onContextMenu = (e: React.MouseEvent) =>
    createContextMenu(e, [
      [
        collection.isComplete
          ? { label: 'Reset Collection', callback: markAllAsNotFound }
          : {
              label: 'Mark all as Completed',
              callback: markAllAsCompleted,
            },
        {
          label: 'Open in Planner',
          callback: () => {
            router.push(`/planner?collection=${encodeURIComponent(collection.name)}`);
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

  return { onContextMenu };
};
