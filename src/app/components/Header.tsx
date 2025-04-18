import { Screens, useGlobalState } from '../data/GlobalStateProvider';
import MenuButton from './MenuButton';

export default function Header() {
  const { screen, showCompleted, setShowCompleted } = useGlobalState();

  return (
    <div className="w-full h-48 flex flex-col gap-8 pt-8 justify-center items-center">
      <h1 className="text-3xl text-orange-100">Archaeology Journal</h1>
      <div className="grid grid-cols-2 gap-2 sm:flex justify-center items-center content-center sm:gap-4 pb-8">
        {Object.values(Screens).map((label) => (
          <MenuButton key={label} label={label} />
        ))}
      </div>
    </div>
  );
}
