import { Screens, useGlobalState } from '../data/GlobalStateProvider';
import MenuButton from './MenuButton';

export default function Header() {
  const { screen, showCompleted, setShowCompleted } = useGlobalState();

  return (
    <div className="w-full h-48 flex flex-col gap-8 pt-8 justify-center items-center">
      <h1 className="text-3xl">Archaeology Journal</h1>
      <div className="flex gap-4">
        {Object.values(Screens).map((label) => (
          <MenuButton key={label} label={label} />
        ))}
      </div>
      <div className="flex gap-4">
        <button
          className={[
            'rounded-md border-2 border-white px-5 py-1 cursor-pointer',
            'bg-transparent text-white',
            'transition-colors ease-in-out',
            'hover:bg-white hover:text-gray-950',
          ].join(' ')}
          onClick={() => setShowCompleted(!showCompleted)}
        >
          {showCompleted
            ? `Hide Completed ${screen}`
            : `Show Completed ${screen}`}
        </button>
      </div>
    </div>
  );
}
