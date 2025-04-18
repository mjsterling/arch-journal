import { useMemo } from 'react';
import { DigsiteNames, Digsites } from '../../data/Digsites';
import { Collections } from '../../data/Collections';
import { Artefact, useArtefacts } from '../../data/ArtefactProvider';
import CollectorButton from './ArtefactButton';
import { useGlobalState } from '@/app/data/GlobalStateProvider';
import { ArtefactStates } from '@/app/data/Artefact';
import LevelSiteDisplay from './LevelSiteDisplay';

export default function ArtefactCard(props: {
  artefact: Artefact;
  combined?: boolean;
  alwaysShow?: boolean;
}) {
  const { artefact, combined, alwaysShow } = props;
  const { setArtefact, isComplete: artefactIsComplete } = useArtefacts();
  const { createContextMenu, wiki, showCompleted } = useGlobalState();
  const digsiteInfo = useMemo(() => {
    const digsite = Digsites[artefact.digsite as DigsiteNames];
    if (!digsite) return null;
    return { ...digsite, name: artefact.digsite };
  }, [artefact.digsite]);

  const isComplete = useMemo(
    () => artefactIsComplete(artefact),
    [artefact, artefactIsComplete]
  );

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

  const isHidden = useMemo(
    () => !alwaysShow && isComplete && !showCompleted,
    [isComplete, showCompleted, alwaysShow]
  );

  if (isHidden) return null;

  return (
    <div
      className={[
        'w-full md:w-auto bg-gray-800 border-2 px-8 py-8 md:py-4 flex flex-wrap md:flex-nowrap content-center justify-around md:justify-between gap-4 cursor-help transition-opacity duration-500',
        isComplete ? 'border-green-700' : 'border-orange-100',
        combined
          ? 'rounded-none border-t-1 first-of-type:border-t-2 border-b-1 last-of-type:border-b-2 last-of-type:rounded-b-lg first-of-type:rounded-t-lg'
          : 'rounded-lg',
      ].join(' ')}
      style={{
        backgroundColor: digsiteInfo?.backgroundColor ?? '#333',
        opacity: isComplete ? 0.5 : 1,
      }}
      id={artefact.name.replace(/\W/g, '')}
      onContextMenu={(e) =>
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
        ])
      }
    >
      <div className="grid grid-cols-[2fr_3fr_2fr] mb-4 md:mb-0 md:flex gap-4 justify-center md:justify-start w-full md:w-88 items-center font-bold text-orange-100">
        <img
          src={artefact.image}
          alt={artefact.name}
          className="h-10 w-10 object-contain transition-all"
        />
        <p className="text-center text-wrap md:text-nowrap">{artefact.name}</p>
        <p className="text-center text-lg sm:hidden">{artefact.level}</p>
        <LevelSiteDisplay
          level={artefact.level}
          site={digsiteInfo}
          className="hidden sm:flex md:hidden"
        />
      </div>
      <div className="flex flex-row flex-wrap md:flex-nowrap gap-2 justify-center lg:justify-start">
        {artefact.collections &&
          Object.entries(artefact.collections).map(([name, status]) => {
            const { collector, image } = Collections.find(
              (collection) => collection.name === name
            ) ?? { collector: '', image: '', shortName: '' };
            return (
              <CollectorButton
                key={`collectorbutton_${artefact.name}__${name}`}
                artefact={artefact}
                collection={name}
                collector={collector}
                image={image}
                status={status}
              />
            );
          })}
        {/* {artefact.otherUses &&
          Object.entries(artefact.collections).map(([name, status]) => {
            const { collector, image } = Collections.find(
              (collection) => collection.name === name
            ) ?? { collector: '', image: '', shortName: '' };
            return (
              <CollectorButton
                key={`collectorbutton_${artefact.name}__${name}`}
                artefact={artefact}
                collection={name}
                collector={collector}
                image={image}
                status={status}
              />
            );
          })} */}
      </div>
      <LevelSiteDisplay
        className="hidden md:flex"
        level={artefact.level}
        site={digsiteInfo}
      />
    </div>
  );
}
