import { CheckIcon } from '@heroicons/react/16/solid';
import { useSettings } from '@/data/providers';

export const CollectionToggleShowCompleted: React.FC = () => {
  const { showCompletedCollections, toggleShowCompletedCollections } = useSettings();
  return (
    <div className="flex flex-col items-center md:flex-row gap-4 gap-y-8 justify-between px-6 py-6 md:px-12 md:py-6">
      <div className="flex gap-2 items-center text-orange-100">
        <button
          value={showCompletedCollections ? 'checked' : 'unchecked'}
          className={[
            'cursor-pointer',
            'bg-transparent border border-orange-100 rounded-sm text-orange-100',
            'transition-colors ease-in-out min-h-6 min-w-6 flex justify-center items-center',
          ].join(' ')}
          onClick={toggleShowCompletedCollections}
        >
          {showCompletedCollections ? <CheckIcon className="w-5 h-5 text-orange-100" /> : null}
        </button>
        <span className="text-center">Show completed collections?</span>
      </div>
    </div>
  );
};
