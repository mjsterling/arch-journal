import { ArtefactStates } from '@/data/constants';
import { Icon } from '@/components';
import { type Artefact, useArtefacts, useContextMenu } from '@/data/providers';
import { wiki } from '@/data/utils';

export const ArtefactMiscButton: ArtefactMiscButton = ({ artefact, type, typeKey, image, status }) => {
  const { createContextMenu } = useContextMenu();
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
                label: '[WIKI]' + typeKey,
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
        'relative flex flex-col gap-1 items-center justify-center',
        'rounded-md h-full',
        'min-h-9 min-w-9 max-h-9 max-w-9 md:min-h-13 md:min-w-13 md:max-h-13 md:max-w-13',
        'transition-all duration-200 gap-1',
        'border-2 z-0 hover:z-10',
        status === 'Not Found'
          ? 'bg-gray-200/30 border-gray-300/60 hover:bg-orange-600/85 cursor-pointer'
          : status === 'Damaged'
          ? 'bg-orange-700/70 border-orange-700 hover:bg-yellow-500/85 cursor-pointer'
          : status === 'Restored'
          ? 'bg-yellow-600/70 border-yellow-600 hover:bg-green-700/85 cursor-pointer'
          : status === 'Completed'
          ? 'bg-green-800/60 border-green-800 cursor-help'
          : '',
      ].join(' ')}
      title={typeKey}
    >
      <Icon
        src={image}
        alt={typeKey}
        className="min-h-6 min-w-6 max-h-6 max-w-6 md:min-h-9 md:min-w-9 md:max-h-9 md:max-w-9 object-contain transition-all"
      />
    </button>
  );
};

type ArtefactMiscButton = React.FC<{
  artefact: Artefact;
  type: 'mysteries' | 'researchers' | 'quests' | 'misc';
  typeKey: string;
  image: string;
  status: ArtefactStates;
}>;
