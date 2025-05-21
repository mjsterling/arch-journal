import { Screens } from '../data/GlobalStateProvider';
import Icon from './Icon';
import MenuButton from './MenuButton';

export default function Header() {
  return (
    <div className="sticky top-0 z-50 w-full lg:h-24 flex flex-col py-4 lg:py-0 lg:flex-row justify-between gap-8 px-6 md:px-12 items-center bg-[#0009] backdrop-blur-[10px]">
      <h1 className="text-center lg:text-left text-xl md:text-2xl flex items-center text-orange-100">
        <Icon
          src="/assets/Archaeology.png"
          alt="Archaeology"
          className="h-7 w-7 md:h-9 md:w-9 inline-block mr-2"
        />
        Archaeology Journal
      </h1>
      <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:flex justify-center items-center content-center sm:gap-4">
        {Object.values(Screens).map((label) => (
          <MenuButton key={label} label={label} />
        ))}
      </div>
    </div>
  );
}
