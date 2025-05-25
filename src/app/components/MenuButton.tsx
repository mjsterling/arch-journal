import { Screens, useGlobalState } from '../data/GlobalStateProvider';

export default function MenuButton({ label }: { label: Screens }) {
  const { screen, setScreen } = useGlobalState();
  return (
    <button
      className={[
        'rounded-md border-b text-lg border-b-transparent px-3 xl:px-5 py-3 md:py-1 cursor-pointer text-orange-100',
        label === screen ? 'font-bold border-b-orange-100' : 'font-normal',
        'transition-colors ease-in-out active:bg-[#fff1]',
        'flex justify-end',
      ].join(' ')}
      onClick={() => setScreen(label)}
    >
      {label}
    </button>
  );
}
