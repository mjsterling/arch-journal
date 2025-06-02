export const ModeSelect = ({
  mode,
  setMode,
  selectedCollectionIsComplete,
}: {
  mode: 'first' | 'recurring';
  setMode: (mode: 'first' | 'recurring') => void;
  selectedCollectionIsComplete: boolean;
}) => {
  return (
    <div className="flex flex-row gap-4 justify-center items-center w-full">
      <button
        className={[
          'px-5 py-1 rounded-md cursor-pointer border border-orange-100 disabled:cursor-not-allowed disabled:opacity-50',
          mode === 'first' ? 'bg-orange-100 text-gray-800 font-semibold' : '',
        ].join(' ')}
        disabled={selectedCollectionIsComplete}
        onClick={() => setMode('first')}
      >
        First Completion
      </button>
      <button
        className={[
          'px-5 py-1 rounded-md cursor-pointer border border-orange-100',
          mode === 'recurring'
            ? 'bg-orange-100 text-gray-800 font-semibold'
            : '',
        ].join(' ')}
        onClick={() => setMode('recurring')}
      >
        Recurring Completions
      </button>
    </div>
  );
};
