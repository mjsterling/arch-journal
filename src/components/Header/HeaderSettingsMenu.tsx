import { useSettings } from '@/data/providers/SettingsProvider';
import { CheckIcon } from '@heroicons/react/20/solid';

export function HeaderSettingsMenu({
  closeMenu,
  settingsMenuOpen,
}: {
  closeMenu: () => void;
  settingsMenuOpen: boolean;
}) {
  const { colorblindMode, importData, exportData, toggleColorblindMode } = useSettings();
  return (
    <div
      className="flex flex-col w-full items-stretch md:flex-row justify-center md:items-center content-center gap-y-1 sm:gap-3 overflow-hidden transition-all duration-300 px-3"
      onClick={closeMenu}
      style={{
        height: 'fit-content',
        maxHeight: settingsMenuOpen ? '280px' : '0',
        paddingTop: settingsMenuOpen ? '8px' : '0',
        paddingBottom: settingsMenuOpen ? '1rem' : '0',
      }}
    >
      <div className="flex flex-col w-full gap-2">
        <div className="flex justify-end">
          <h2 className="text-orange-100 text-xl mb-4">Settings</h2>
        </div>
        <div className="flex gap-4 justify-end items-center text-orange-100 w-full">
          <button
            className="cursor-pointer flex gap-2"
            value={colorblindMode ? 'checked' : 'unchecked'}
            onClick={toggleColorblindMode}
          >
            <div
              className={[
                'rounded-md border border-orange-100 cursor-pointer',
                'bg-transparent text-orange-100',
                'transition-colors ease-in-out h-6 w-6 flex justify-center items-center',
              ].join(' ')}
            >
              {colorblindMode ? <CheckIcon className="w-5 h-5 text-orange-100" /> : null}
            </div>
            Colorblind mode
          </button>
        </div>
        <button
          className="cursor-pointer flex gap-2 ml-auto text-orange-100 border  px-2 py-1 rounded-sm border-orange-100"
          onClick={importData}
        >
          Import data from clipboard
        </button>
        <button
          className="cursor-pointer flex gap-2 ml-auto text-orange-100 border px-2 py-1 rounded-sm border-orange-100"
          onClick={exportData}
        >
          Export progress data to clipboard
        </button>
        <div className="flex flex-col items-end pt-4">
          <span className="text-xs text-gray-300 text-right">Version 1.2.0 (2025/08/16)</span>
          <span className="text-xs text-gray-300 text-right">
            Found a bug? Expected to see something that isn&apos;t here?
          </span>
          <span className="text-xs text-gray-300 text-right">
            Please&nbsp;
            <a className="underline" href="https://discord.gg/NwzYjZadaS">
              contact me via Discord!
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
