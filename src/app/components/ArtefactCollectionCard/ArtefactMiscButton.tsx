import { ArtefactStates } from '../../data/Artefact';
import { Artefact, useArtefacts } from '../../data/ArtefactProvider';
import { useGlobalState } from '../../data/GlobalStateProvider';
import Icon from '../Icon';

export default function ArtefactButton({
  artefact,
  type,
  typeKey,
  image,
  status,
}: {
  artefact: Artefact;
  type: 'mysteries' | 'researchers' | 'misc';
  typeKey: string;
  image: string;
  status: ArtefactStates;
}) {
  const { createContextMenu, wiki } = useGlobalState();
  const { setArtefact } = useArtefacts();
  const handleClick = () => {
    const newArtefact = { ...artefact };
    switch (artefact[type][typeKey]) {
      case ArtefactStates.NotFound:
        newArtefact[type][typeKey] = ArtefactStates.Damaged;
        break;
      case ArtefactStates.Damaged:
        newArtefact[type][typeKey] = ArtefactStates.Restored;
        break;
      case ArtefactStates.Restored:
        newArtefact[type][typeKey] = ArtefactStates.Completed;
        break;
      default:
        break;
    }
    setArtefact(newArtefact);
  };
  const handleDoubleClick = () => {
    const newArtefact = { ...artefact };
    newArtefact[type][typeKey] = ArtefactStates.Completed;
    setArtefact(newArtefact);
  };
  const handleContextMenu = (e: React.MouseEvent) =>
    createContextMenu(e, [
      [
        {
          label: 'Set to Not Found',
          callback: () => {
            const newArtefact = { ...artefact };
            newArtefact[type][typeKey] = ArtefactStates.NotFound;
            setArtefact(newArtefact);
          },
        },
        {
          label: 'Set to Damaged',
          callback: () => {
            const newArtefact = { ...artefact };
            newArtefact[type][typeKey] = ArtefactStates.Damaged;
            setArtefact(newArtefact);
          },
        },
        {
          label: 'Set to Restored',
          callback: () => {
            const newArtefact = { ...artefact };
            newArtefact[type][typeKey] = ArtefactStates.Restored;
            setArtefact(newArtefact);
          },
        },
        {
          label: 'Set to Completed',
          callback: () => {
            const newArtefact = { ...artefact };
            newArtefact[type][typeKey] = ArtefactStates.Completed;
            setArtefact(newArtefact);
          },
        },
      ],
      [
        ...(type !== 'misc'
          ? [
              {
                label: 'Wiki: ' + typeKey,
                callback: () => wiki(typeKey),
              },
            ]
          : []),
      ],
    ]);

  return (
    <button
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      className={[
        'flex flex-col gap-1 items-center justify-center',
        ' rounded-lg h-full p-1',
        'transition-all duration-200 gap-1',
        'border-orange-100 border-2',
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
      title={typeKey}
    >
      <Icon
        src={image}
        alt={typeKey}
        className="h-8 w-8 lg:h-10 lg:w-10 object-contain transition-all"
      />
    </button>
  );
}
