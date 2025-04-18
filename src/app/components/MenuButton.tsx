import { Screens, useGlobalState } from '../data/GlobalStateProvider';

export default function MenuButton({ label }: { label: Screens }) {
  const { screen, setScreen } = useGlobalState();
  return (
    <button
      className={[
        'rounded-md border-2 border-orange-100 px-5 py-1 cursor-pointer',
        label === screen
          ? 'bg-orange-100 text-gray-700 font-bold'
          : 'bg-transparent text-orange-100',
        'transition-colors ease-in-out',
        'hover:bg-orange-100 hover:text-gray-700',
      ].join(' ')}
      onClick={() => setScreen(label)}
    >
      {label}
    </button>
  );
}
