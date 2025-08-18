import { Cog8ToothIcon } from '@heroicons/react/20/solid';

export function HeaderSettingsButton({
  settingsMenuOpen,
  toggleSettingsMenu,
}: {
  settingsMenuOpen: boolean;
  toggleSettingsMenu: () => void;
}) {
  return (
    <button className="h-5 w-5 cursor-pointer" onClick={toggleSettingsMenu}>
      <Cog8ToothIcon className={['h-5 w-5', settingsMenuOpen ? 'text-blue-500' : 'text-orange-100'].join(' ')} />
    </button>
  );
}
