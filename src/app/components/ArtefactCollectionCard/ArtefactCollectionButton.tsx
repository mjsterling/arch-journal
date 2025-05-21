import { useState } from 'react';
import { ArtefactStates } from '../../data/Artefact';
import { Artefact, useArtefacts } from '../../data/ArtefactProvider';
import { useGlobalState } from '../../data/GlobalStateProvider';
import Icon from '../Icon';
import { ArtefactInfobox } from './ArtefactInfobox';

export default function ArtefactCollectionButton({
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

  const { handleClick, handleDoubleClick, handleContextMenu } = useHandlers(
    artefact,
    collection,
    collector,
    mode
  );

  return (
    <button
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      onMouseOver={() => setInfoboxOpen(true)}
      onMouseLeave={() => setInfoboxOpen(false)}
      className={[
        'relative flex flex-col gap-1 items-center justify-center',
        'rounded-md h-full',
        'min-h-13 min-w-13 max-h-13 max-w-13',
        'transition-all duration-200 gap-1',
        'border-2 z-0 hover:z-10',
        status === 'Not Found'
          ? 'bg-gray-200/30 border-gray-300/60 hover:bg-orange-600/80 cursor-pointer'
          : status === 'Damaged'
          ? 'bg-orange-700/60 border-orange-700 hover:bg-yellow-500/80 cursor-pointer'
          : status === 'Restored'
          ? 'bg-yellow-600/60 border-yellow-600 hover:bg-green-500/80 cursor-pointer'
          : status === 'Completed'
          ? 'bg-green-800/60 border-green-800 cursor-help'
          : '',
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
  const { setArtefact } = useArtefacts();
  const { createContextMenu, goToCollection, goToArtefact, wiki } =
    useGlobalState();

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
          disabled:
            artefact.collections[collection] === ArtefactStates.NotFound,
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
          disabled:
            artefact.collections[collection] === ArtefactStates.Restored,
          callback: () => {
            const newArtefact = { ...artefact };
            newArtefact.collections[collection] = ArtefactStates.Restored;
            setArtefact(newArtefact);
          },
        },
        {
          label: 'Set to Completed',
          disabled:
            artefact.collections[collection] === ArtefactStates.Completed,
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
              callback: () => goToCollection(collection),
            },
          ]
        : [
            {
              label: 'View in Artefacts',
              callback: () => goToArtefact(artefact.name),
            },
          ],
      mode === 'artefactPage'
        ? [
            {
              label: 'Wiki: ' + artefact.name,
              callback: () => wiki(artefact.name),
            },
            {
              label: 'Wiki: ' + artefact.hotspot,
              callback: () => wiki(artefact.hotspot),
            },
          ]
        : [
            {
              label: 'Wiki: ' + collection,
              callback: () => wiki(collection),
            },
            {
              label: 'Wiki: ' + collector,
              callback: () => wiki(collector),
            },
          ],
    ]);
  return {
    handleClick,
    handleDoubleClick,
    handleContextMenu,
  };
};
