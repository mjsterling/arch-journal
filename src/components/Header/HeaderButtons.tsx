import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import { HeaderDiscordButton, HeaderSettingsButton } from '.';

export function HeaderButtons({
  settingsMenuOpen,
  toggleMenu,
  toggleSettingsMenu,
  menuOpen,
}: {
  settingsMenuOpen: boolean;
  toggleMenu: () => void;
  toggleSettingsMenu: () => void;
  menuOpen: boolean;
}) {
  return (
    <div className="flex gap-x-3 gap-y-5 justify-end items-center content-center overflow-hidden transition-all duration-300">
      <div className="flex items-center justify-end gap-4">
        <HeaderDiscordButton />
        <HeaderSettingsButton settingsMenuOpen={settingsMenuOpen} toggleSettingsMenu={toggleSettingsMenu} />
        <button onClick={toggleMenu} className="lg:hidden cursor-pointer">
          <Bars3Icon className={['h-6 w-6', menuOpen ? 'text-blue-500' : 'text-orange-100'].join(' ')} />
        </button>
      </div>
    </div>
  );
}
