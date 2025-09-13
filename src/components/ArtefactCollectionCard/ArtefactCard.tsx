import { useMemo } from 'react';
import { ArtefactStates, DigsiteNames, Digsites } from '@/data/constants';
import { Artefact, useArtefacts, useContextMenu, useSettings } from '@/data/providers';
import { Icon, LevelSiteDisplay, CardContainer } from '@/components';
import { useHideCard } from '@/data/hooks';
import { wiki } from '@/data/utils';
import { ArtefactButtons } from './ArtefactButtons';

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
      {/* DESKTOP */}
      <div className="hidden md:flex justify-start items-center mb-0 gap-4 w-full font-semibold text-orange-100">
        <Icon src={artefact.image} alt={artefact.name} className="h-10 w-10 object-contain transition-all" />
        <div className="flex flex-col items-start gap-1">
          <p
            className={['text-lg text-left lg:text-nowrap', highlighted ? 'text-yellow-500' : 'text-orange-100'].join(
              ' '
            )}
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
      </div>
      <ArtefactButtons className="hidden md:flex" artefact={artefact} />
      <LevelSiteDisplay className="hidden md:flex" level={artefact.level} sites={digsiteInfo} />
      {/* MOBILE */}
      <div className="flex md:hidden flex-col items-start gap-1 w-full font-semibold text-orange-100">
        <div className="flex flex-row justify-between w-full items-center gap-4">
          <div className="flex flex-row gap-2">
            <Icon
              src={artefact.image}
              alt={artefact.name}
              className="flex md:hidden min-h-5 min-w-5 max-h-5 max-w-5 object-contain transition-all"
            />
            <p
              className={[
                'text-sm sm:text-base text-left text-wrap lg:text-nowrap md:text-lg',
                highlighted ? 'text-yellow-500' : 'text-orange-100',
              ].join(' ')}
            >
              {artefact.name}
            </p>
          </div>
          <LevelSiteDisplay level={artefact.level} sites={digsiteInfo} />
        </div>
        <div className="flex flex-row justify-between w-full items-center gap-4">
          <ArtefactButtons className="[&]:flex [&]:md:hidden [&]:flex-nowrap" artefact={artefact} />
        </div>
      </div>
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
