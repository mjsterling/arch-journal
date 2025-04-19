import { ArtefactStates } from '../../data/Artefact';
import { Artefact, useArtefacts } from '../../data/ArtefactProvider';
import { useGlobalState } from '../../data/GlobalStateProvider';
import Icon from '../Icon';

export default function CollectionButton({
  artefact,
  collection,
  image,
  status,
}: {
  artefact: Artefact;
  collection: string;
  collector: string;
  image: string;
  status: ArtefactStates;
}) {
  const { createContextMenu, goToArtefact, wiki } = useGlobalState();
  const { setArtefact } = useArtefacts();
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
          callback: () => {
            const newArtefact = { ...artefact };
            newArtefact.collections[collection] = ArtefactStates.NotFound;
            setArtefact(newArtefact);
          },
        },
        {
          label: 'Set to Damaged',
          callback: () => {
            const newArtefact = { ...artefact };
            newArtefact.collections[collection] = ArtefactStates.Damaged;
            setArtefact(newArtefact);
          },
        },
        {
          label: 'Set to Restored',
          callback: () => {
            const newArtefact = { ...artefact };
            newArtefact.collections[collection] = ArtefactStates.Restored;
            setArtefact(newArtefact);
          },
        },
        {
          label: 'Set to Completed',
          callback: () => {
            const newArtefact = { ...artefact };
            newArtefact.collections[collection] = ArtefactStates.Completed;
            setArtefact(newArtefact);
          },
        },
      ],
      [
        {
          label: 'View in Artefacts',
          callback: () => goToArtefact(artefact.name),
        },
      ],
      [
        {
          label: 'Wiki: ' + artefact.name,
          callback: () => wiki(artefact.name),
        },
        {
          label: 'Wiki: ' + artefact.hotspot,
          callback: () => wiki(artefact.hotspot),
        },
      ],
    ]);

  return (
    <button
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      className={[
        'flex flex-col gap-1 items-center justify-center',
        'border-2 border-orange-100 rounded-lg h-full p-2',
        'transition-all duration-200 gap-1 w-[52px] h-[52px] max-h-[52px]',
        status === 'Not Found'
          ? 'bg-gray-500 hover:bg-orange-600 cursor-pointer'
          : status === 'Damaged'
          ? 'bg-orange-700 hover:bg-yellow-500 cursor-pointer'
          : status === 'Restored'
          ? 'bg-yellow-600 hover:bg-green-500 cursor-pointer'
          : status === 'Completed'
          ? 'bg-green-800 cursor-help'
          : '',
      ].join(' ')}
      title={`${artefact.name} - ${artefact.hotspot} - ${status}`}
    >
      <Icon
        src={image}
        alt={collection}
        className="h-8 w-8 object-contain transition-all"
      />
    </button>
  );
}
