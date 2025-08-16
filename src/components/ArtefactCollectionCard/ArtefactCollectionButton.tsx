'use client';
import { useMemo, useState } from 'react';
import { ArtefactStates } from '@/data/constants';
import { Artefact, useArtefacts, useContextMenu, useSettings } from '@/data/providers';
import { ArtefactInfobox, Icon } from '@/components';
import { useRouter } from 'next/navigation';
import { wiki } from '@/data/utils';

export function ArtefactCollectionButton({
  artefact,
  collection,
  collector,
  image,
  status,
  mode,
}: {
  artefact: Artefact;
  collection: string;
  collector: string;
  image: string;
  status: ArtefactStates;
  mode: 'artefactPage' | 'collectionPage';
}) {
  const [infoboxOpen, setInfoboxOpen] = useState(false);
  const { colorblindMode } = useSettings();

  const { handleClick, handleDoubleClick, handleContextMenu } = useHandlers(artefact, collection, collector, mode);

  const buttonClasses = useMemo(
    () => ({
      base: 'relative flex flex-col gap-1 items-center justify-center',
      rounded: 'rounded-md h-full',
      size: 'min-h-13 min-w-13 max-h-13 max-w-13',
      transition: 'transition-all duration-200 gap-1',
      border: 'border-2 z-0 hover:z-10',

      status: {
        'Not Found': 'bg-gray-200/30 border-gray-300/60 hover:bg-orange-600/80 cursor-pointer ',
        Damaged:
          'bg-orange-700/60 border-orange-700 hover:bg-yellow-500/80 cursor-pointer ' +
          (colorblindMode && 'rounded-r-4xl pr-1 [&]:hover:bg-purple-600/80'),
        Restored:
          'bg-yellow-600/60 border-yellow-600 hover:bg-green-700/80 cursor-pointer ' +
          (colorblindMode && 'rounded-l-4xl pl-1 [&]:bg-purple-600/60 [&]:border-purple-600 [&]:hover:bg-green-700/80'),
        Completed:
          'bg-green-800/60 border-green-800 cursor-help ' +
          (colorblindMode && 'rounded-l-4xl rounded-r-4xl [&]:bg-green-700/60 [&]:border-green-700'),
      },
    }),
    [colorblindMode]
  );

  return (
    <button
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      onMouseOver={() => setInfoboxOpen(true)}
      onMouseLeave={() => setInfoboxOpen(false)}
      className={[
        buttonClasses.base,
        buttonClasses.rounded,
        buttonClasses.size,
        buttonClasses.transition,
        buttonClasses.border,
        buttonClasses.status[status],
      ].join(' ')}
    >
      <ArtefactInfobox
        artefact={artefact}
        collection={collection}
        collector={collector}
        open={infoboxOpen}
        status={status}
        mode={mode}
      />
      <Icon
        src={image}
        alt={mode === 'artefactPage' ? collection : artefact.name}
        className="min-h-9 min-w-9 max-h-9 max-w-9 object-contain transition-all"
      />
    </button>
  );
}

const useHandlers = (
  artefact: Artefact,
  collection: string,
  collector: string,
  mode: 'artefactPage' | 'collectionPage'
) => {
  const router = useRouter();
  const { setArtefact } = useArtefacts();
  const { createContextMenu } = useContextMenu();

  const handleClick = () => {
    const newArtefact = { ...artefact };
    switch (artefact.collections[collection]) {
      case ArtefactStates.NotFound:
        newArtefact.collections[collection] = ArtefactStates.Damaged;
        break;
      case ArtefactStates.Damaged:
        newArtefact.collections[collection] = ArtefactStates.Restored;
        break;
      case ArtefactStates.Restored:
        newArtefact.collections[collection] = ArtefactStates.Completed;
        break;
      default:
        break;
    }
    setArtefact(newArtefact);
  };
  const handleDoubleClick = () => {
    const newArtefact = { ...artefact };
    newArtefact.collections[collection] = ArtefactStates.Completed;
    setArtefact(newArtefact);
  };

  const handleContextMenu = (e: React.MouseEvent) =>
    createContextMenu(e, [
      [
        {
          label: 'Set to Not Found',
          disabled: artefact.collections[collection] === ArtefactStates.NotFound,
          callback: () => {
            const newArtefact = { ...artefact };
            newArtefact.collections[collection] = ArtefactStates.NotFound;
            setArtefact(newArtefact);
          },
        },
        {
          label: 'Set to Damaged',
          disabled: artefact.collections[collection] === ArtefactStates.Damaged,
          callback: () => {
            const newArtefact = { ...artefact };
            newArtefact.collections[collection] = ArtefactStates.Damaged;
            setArtefact(newArtefact);
          },
        },
        {
          label: 'Set to Restored',
          disabled: artefact.collections[collection] === ArtefactStates.Restored,
          callback: () => {
            const newArtefact = { ...artefact };
            newArtefact.collections[collection] = ArtefactStates.Restored;
            setArtefact(newArtefact);
          },
        },
        {
          label: 'Set to Completed',
          disabled: artefact.collections[collection] === ArtefactStates.Completed,
          callback: () => {
            const newArtefact = { ...artefact };
            newArtefact.collections[collection] = ArtefactStates.Completed;
            setArtefact(newArtefact);
          },
        },
      ],
      mode === 'artefactPage'
        ? [
            {
              label: 'View in Collections',
              callback: () => router.push(`/collections?highlight=${encodeURIComponent(collection)}`),
            },
          ]
        : [
            {
              label: 'View in Artefacts',
              callback: () => router.push(`/artefacts?highlight=${encodeURIComponent(artefact.name)}`),
            },
          ],
      mode === 'artefactPage'
        ? [
            {
              label: '[WIKI]' + artefact.name,
              callback: () => wiki(artefact.name),
            },
            {
              label: '[WIKI]' + 'Collector: ' + collector,
              callback: () => wiki(collector),
            },
            {
              label: '[WIKI]' + 'Hotspot: ' + artefact.hotspot,
              callback: () => wiki(artefact.hotspot),
            },
          ]
        : [
            {
              label: '[WIKI]' + collection,
              callback: () => wiki(collection),
            },
            {
              label: '[WIKI]' + 'Collector: ' + collector,
              callback: () => wiki(collector),
            },
            {
              label: '[WIKI]' + 'Hotspot: ' + artefact.hotspot,
              callback: () => wiki(artefact.hotspot),
            },
          ],
    ]);
  return {
    handleClick,
    handleDoubleClick,
    handleContextMenu,
  };
};
