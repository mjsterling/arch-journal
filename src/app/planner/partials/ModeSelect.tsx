export const ModeSelect: ModeSelect = ({ mode, setMode, selectedCollectionIsComplete }) => {
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
        <span className="md:hidden">First</span>
        <span className="hidden md:inline">First Completion</span>
      </button>
      <button
        className={[
          'px-5 py-1 rounded-md cursor-pointer border border-orange-100',
          mode === 'recurring' ? 'bg-orange-100 text-gray-800 font-semibold' : '',
        ].join(' ')}
        onClick={() => setMode('recurring')}
      >
        <span className="md:hidden">Recurring</span>
        <span className="hidden md:inline">Recurring Completions</span>
      </button>
    </div>
  );
};

type ModeSelect = React.FC<{
  mode: 'first' | 'recurring';
  setMode: (mode: 'first' | 'recurring') => void;
  selectedCollectionIsComplete: boolean;
}>;
