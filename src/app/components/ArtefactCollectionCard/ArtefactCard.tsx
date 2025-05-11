import { useMemo } from 'react';
import { DigsiteNames, Digsites } from '@/app/data/Digsites';
import { Collections } from '@/app/data/Collections';
import { Artefact, useArtefacts } from '@/app/data/ArtefactProvider';
import ArtefactCollectionButton from './ArtefactCollectionButton';
import { useGlobalState } from '@/app/data/GlobalStateProvider';
import { ArtefactStates } from '@/app/data/Artefact';
import LevelSiteDisplay from './LevelSiteDisplay';
import Icon from '../Icon';
import ArtefactMiscButton from './ArtefactMiscButton';

export default function ArtefactCard(props: {
  artefact: Artefact;
  combined?: boolean;
  alwaysShow?: boolean;
}) {
  const { artefact, combined = false, alwaysShow } = props;
  const { isComplete: artefactIsComplete } = useArtefacts();
  const { showCompleted, highlightedArtefact } = useGlobalState();
  const digsiteInfo = useMemo(() => {
    const digsite = Digsites[artefact.digsite as DigsiteNames];
    if (!digsite) return null;
    return { ...digsite, name: artefact.digsite };
  }, [artefact.digsite]);

  const isComplete = useMemo(
    () => artefactIsComplete(artefact),
    [artefact, artefactIsComplete]
  );

  const isHighlighted = useMemo(
    () => artefact.name === highlightedArtefact,
    [artefact, highlightedArtefact]
  );

  const isHidden = useMemo(
    () => isComplete && !alwaysShow && !showCompleted && !isHighlighted,
    [isComplete, showCompleted, alwaysShow, isHighlighted]
  );

  const { onContextMenu } = useHandlers(artefact, isComplete, digsiteInfo);

  if (isHidden) return null;

  return (
    <div
      className={[
        'w-full md:w-auto bg-gray-800 border-2 px-8 py-8 md:py-4 flex flex-wrap md:flex-nowrap content-center justify-around md:justify-between gap-4 cursor-help transition-opacity duration-500',
        isComplete ? 'border-green-700' : 'border-orange-100',
        isHighlighted
          ? 'outline-2 -outline-offset-2 outline-yellow-500 z-10'
          : 'z-0',
        combined
          ? 'rounded-none border-t-1 first-of-type:border-t-2 border-b-1 last-of-type:border-b-2 last-of-type:rounded-b-lg first-of-type:rounded-t-lg'
          : 'rounded-lg',
      ].join(' ')}
      style={{
        backgroundColor: digsiteInfo?.backgroundColor ?? '#333',
        opacity: isComplete ? 0.5 : 1,
      }}
      id={artefact.name.replace(/\W/g, '')}
      onContextMenu={onContextMenu}
    >
      <div className="grid grid-cols-[2fr_3fr_2fr] mb-4 md:mb-0 md:flex gap-4 justify-center md:justify-start w-full md:w-88 items-center font-bold text-orange-100">
        <Icon
          src={artefact.image}
          alt={artefact.name}
          className="h-10 w-10 object-contain transition-all"
        />
        <p
          className={[
            'text-center text-wrap md:text-nowrap',
            isHighlighted ? 'text-yellow-500' : 'text-white',
          ].join(' ')}
        >
          {artefact.name}
        </p>
        <p className="text-center text-lg sm:hidden">{artefact.level}</p>
        <LevelSiteDisplay
          level={artefact.level}
          site={digsiteInfo}
          className="hidden sm:flex md:hidden"
        />
      </div>
      <div className="flex flex-row flex-wrap md:flex-nowrap gap-2 justify-center lg:justify-start">
        {Object.entries(artefact.collections).map(([name, status]) => {
          const { collector, image } = Collections.find(
            (collection) => collection.name === name
          ) ?? { collector: '', image: '', shortName: '' };
          return (
            <ArtefactCollectionButton
              mode="artefactPage"
              key={`ArtefactButton_${artefact.name}__${name}`}
              artefact={artefact}
              collection={name}
              collector={collector}
              image={image}
              status={status}
            />
          );
        })}
        {Object.entries(artefact.mysteries).map(([name, status]) => {
          return (
            <ArtefactMiscButton
              key={`ArtefactButton_${artefact.name}__${name}`}
              artefact={artefact}
              type="mysteries"
              typeKey={name}
              image={'/assets/collections/mysteries.png'}
              status={status}
            />
          );
        })}
        {Object.entries(artefact.researchers).map(([name, status]) => {
          return (
            <ArtefactMiscButton
              key={`ArtefactButton_${artefact.name}__${name}`}
              artefact={artefact}
              type="researchers"
              typeKey={name}
              image={'/assets/collections/researchers.png'}
              status={status}
            />
          );
        })}
        {Object.entries(artefact.quests).map(([name, status]) => {
          return (
            <ArtefactMiscButton
              key={`ArtefactButton_${artefact.name}__${name}`}
              artefact={artefact}
              type="researchers"
              typeKey={name}
              image={'/assets/collections/quests.png'}
              status={status}
            />
          );
        })}
        {Object.entries(artefact.misc).map(([name, status]) => {
          return (
            <ArtefactMiscButton
              key={`ArtefactButton_${artefact.name}__${name}`}
              artefact={artefact}
              type="misc"
              typeKey={name}
              image={'/assets/collections/misc.png'}
              status={status}
            />
          );
        })}
      </div>
      <LevelSiteDisplay
        className="hidden md:flex"
        level={artefact.level}
        site={digsiteInfo}
      />
    </div>
  );
}

const useHandlers = (
  artefact: Artefact,
  isComplete: boolean,
  digsiteInfo: {
    name: DigsiteNames;
    icon: string;
    backgroundColor: string;
    url: string;
  } | null
) => {
  const { createContextMenu, wiki } = useGlobalState();
  const { setArtefact } = useArtefacts();
  const markAllAsCompleted = () => {
    const newArtefact = { ...artefact };
    Object.keys(newArtefact.collections).forEach((collection) => {
      newArtefact.collections[collection] = ArtefactStates.Completed;
    });
    setArtefact(newArtefact);
  };

  const resetArtefact = () => {
    const newArtefact = { ...artefact };
    Object.keys(newArtefact.collections).forEach((collection) => {
      newArtefact.collections[collection] = ArtefactStates.NotFound;
    });
    setArtefact(newArtefact);
  };

  return {
    onContextMenu: (e: React.MouseEvent) =>
      createContextMenu(e, [
        [
          isComplete
            ? { label: 'Reset Completion', callback: resetArtefact }
            : {
                label: 'Mark artefact as completed',
                callback: markAllAsCompleted,
              },
        ],
        [
          {
            label: 'Wiki: ' + artefact.name,
            callback: () => wiki(artefact.name),
          },
          {
            label: 'Wiki: ' + digsiteInfo?.name + ' Dig Site',
            callback: () => wiki(digsiteInfo?.name ?? ''),
          },
        ],
      ]),
  };
};
