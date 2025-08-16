import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";

import HeaderDiscordButton from "./HeaderDiscordButton";
import HeaderSettingsButton from "./HeaderSettingsButton";

export default function HeaderButtons({
  toggleMenu,
  toggleSettingsMenu,
  menuOpen,
}: {
  toggleMenu: () => void;
  toggleSettingsMenu: () => void;
  menuOpen: boolean;
}) {
  return (
    <div className="flex gap-x-3 gap-y-5 justify-end items-center content-center overflow-hidden transition-all duration-300">
      <div className="flex items-center justify-end gap-4">
        <HeaderDiscordButton />
        <HeaderSettingsButton toggleSettingsMenu={toggleSettingsMenu} />
        <button onClick={toggleMenu} className="lg:hidden cursor-pointer">
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6 text-orange-100" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-orange-100" />
          )}
        </button>
      </div>
    </div>
  );
}
