import { ArtefactStates } from '../../data/Artefact';
import { Artefact } from '../../data/ArtefactProvider';
import { useGlobalState } from '../../data/GlobalStateProvider';

export default function ArtefactButton({
  artefact,
  setArtefact,
  collection,
  collector,
  image,
  status,
}: {
  artefact: Artefact;
  setArtefact: (artefact: Artefact) => void;
  collection: string;
  collector: string;
  image: string;
  status: ArtefactStates;
}) {
  const { createContextMenu, goToArtefact } = useGlobalState();
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
          label: 'Go to Artefact',
          callback: () => goToArtefact(artefact.name),
        },
        {
          label: 'View on Wiki',
          callback: () => {
            window.open(
              `https://runescape.wiki/w/${collection.replace(/ /g, '_')}`,
              '_blank'
            );
          },
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
        'border-2 border-white rounded-lg h-full p-2',
        'cursor-pointer transition-all duration-200 gap-1',
        status === 'Not Found'
          ? 'bg-gray-500 hover:bg-orange-500'
          : status === 'Damaged'
          ? 'bg-orange-500 hover:bg-yellow-500'
          : status === 'Restored'
          ? 'bg-yellow-500 hover:bg-green-500'
          : status === 'Completed'
          ? 'bg-green-500'
          : '',
      ].join(' ')}
      title={`${collection} - ${collector} - ${status}`}
    >
      <img
        src={image}
        alt={collection}
        className="h-8 w-8 object-contain transition-all"
      />
    </button>
  );
}
