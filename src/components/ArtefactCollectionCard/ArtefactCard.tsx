import { useMemo } from 'react';
import { ArtefactStates, Collections, DigsiteNames, Digsites } from '@/data/constants';
import { Artefact, useArtefacts, useContextMenu, useGlobalState, useSettings } from '@/data/providers';
import { ArtefactCollectionButton, Icon, LevelSiteDisplay, ArtefactMiscButton, CardContainer } from '@/components';
import { useHideCard } from '@/data/hooks';
import { wiki } from '@/data/utils';

export function ArtefactCard(props: {
  artefact: Artefact;
  combined?: boolean;
  alwaysShow?: boolean;
  highlighted?: boolean;
}) {
  const { showCompletedArtefacts } = useSettings();
  const { artefact, combined = false, alwaysShow, highlighted = false } = props;
  const { isComplete: artefactIsComplete } = useArtefacts();
  const digsiteInfo = useMemo(() => {
    const digsite = Digsites[artefact.digsite as DigsiteNames];
    if (!digsite) return null;
    return { ...digsite, name: artefact.digsite };
  }, [artefact.digsite]);

  const isComplete = useMemo(() => artefactIsComplete(artefact), [artefact, artefactIsComplete]);

  const { createMaterialContextMenu } = useContextMenu();

  const { onContextMenu } = useHandlers(artefact, isComplete, digsiteInfo);
  const { hidden, opacity } = useHideCard(isComplete && !highlighted && !alwaysShow, showCompletedArtefacts);

  if (hidden) return null;

  return (
    <CardContainer
      opacity={opacity}
      name={artefact.name}
      isComplete={isComplete}
      isHighlighted={highlighted}
      digsiteInfo={digsiteInfo}
      combined={combined}
      onContextMenu={onContextMenu}
    >
      <div className="flex justify-between md:justify-start items-center mb-4 md:mb-0 gap-4 w-full font-semibold text-orange-100">
        <Icon
          src={artefact.image}
          alt={artefact.name}
          className="h-8 w-8 md:h-10 md:w-10 object-contain transition-all"
        />
        <div className="flex flex-col items-center md:items-start gap-1">
          <p
            className={[
              'text-center md:text-left lg:text-nowrap sm:text-lg',
              highlighted ? 'text-yellow-500' : 'text-orange-100',
            ].join(' ')}
          >
            {artefact.name}
          </p>
          <div className="flex gap-3">
            {Object.entries(artefact.materials).map(([name, amount]) => (
              <div className="flex gap-1 items-center" key={`ArtefactMaterial_${artefact.name}__${name}`}>
                <Icon
                  src={`/assets/materials/${name.replace(/ /g, '_')}.png`}
                  alt={name}
                  title={name}
                  contextMenu
                  className="h-5 w-5 object-contain cursor-help"
                  onContextMenu={createMaterialContextMenu(name)}
                />
                <span className="text-sm text-orange-100">{amount}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end md:hidden">
          <LevelSiteDisplay level={artefact.level} sites={digsiteInfo} />
        </div>
      </div>
      <div className="flex flex-row flex-wrap md:flex-nowrap gap-2 justify-center lg:justify-start">
        {Object.entries(artefact.collections).map(([name, status]) => {
          const { collector, image } = Collections.find((collection) => collection.name === name) ?? {
            collector: '',
            image: '',
            shortName: '',
          };
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
              type="quests"
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
      <LevelSiteDisplay className="hidden md:flex" level={artefact.level} sites={digsiteInfo} />
    </CardContainer>
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
  const { createContextMenu } = useContextMenu();
  const { setArtefact } = useArtefacts();
  const markAllAsCompleted = () => {
    const newArtefact = { ...artefact };
    (['collections', 'mysteries', 'researchers', 'quests', 'misc'] as const).forEach((type) => {
      if (!newArtefact[type]) return;
      Object.keys(newArtefact[type] ?? {}).forEach((key) => {
        newArtefact[type][key as keyof Artefact[keyof Artefact]] = ArtefactStates.Completed;
      });
    });

    setArtefact(newArtefact);
  };

  const resetArtefact = () => {
    const newArtefact = { ...artefact };
    (['collections', 'mysteries', 'researchers', 'quests', 'misc'] as const).forEach((type) => {
      if (!newArtefact[type]) return;
      Object.keys(newArtefact[type] ?? {}).forEach((key) => {
        newArtefact[type][key as keyof Artefact[keyof Artefact]] = ArtefactStates.NotFound;
      });
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
            label: '[WIKI]' + artefact.name,
            callback: () => wiki(artefact.name),
          },
          {
            label: '[WIKI]' + digsiteInfo?.name + ' Dig Site',
            callback: () => wiki(digsiteInfo?.name ?? ''),
          },
        ],
      ]),
  };
};
