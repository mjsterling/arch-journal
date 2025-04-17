import { Screens } from '../data/GlobalStateProvider';
import MenuButton from './MenuButton';

export default function Header() {
  return (
    <div className="w-full h-32 flex flex-col gap-8 pt-8 justify-center items-center">
      <h1 className="text-3xl">Archaeology Journal</h1>
      <div className="flex gap-4">
        {Object.values(Screens).map((label) => (
          <MenuButton key={label} label={label} />
        ))}
      </div>
    </div>
  );
}
