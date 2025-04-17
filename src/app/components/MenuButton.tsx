'use client';
import { useRouter } from 'next/navigation';
import { Screens, useGlobalState } from '../data/GlobalStateProvider';

export default function MenuButton({ label }: { label: Screens }) {
  const { screen, setScreen } = useGlobalState();
  return (
    <button
      className={[
        'rounded-md border-2 border-white px-5 py-1 cursor-pointer w-32',
        label === screen
          ? 'bg-white text-gray-950 font-bold'
          : 'bg-transparent text-white',
        'transition-colors ease-in-out',
        'hover:bg-white hover:text-gray-950',
      ].join(' ')}
      onClick={() => setScreen(label)}
    >
      {label}
    </button>
  );
}
