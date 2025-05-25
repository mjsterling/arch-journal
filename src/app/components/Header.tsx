'use client';
import {
  Bars3Icon,
  CheckIcon,
  Cog8ToothIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';
import { Screens, useGlobalState } from '../data/GlobalStateProvider';
import Icon from './Icon';
import MenuButton from './MenuButton';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setmenuOpen] = useState(false);
  const toggleMenu = () => {
    setmenuOpen((prev) => !prev);
  };
  const closeMenu = () => {
    setmenuOpen(false);
  };
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const toggleSettingsMenu = () => {
    setSettingsMenuOpen((prev) => !prev);
  };
  const { colorblindMode, toggleColorblindMode } = useGlobalState();
  return (
    <>
      <div className="sticky top-0 z-50 w-full flex flex-col pt-4 pb-0 lg:py-4 justify-start gap-y-2 gap-x-8 px-6 md:px-12 items-center bg-[#0009] backdrop-blur-[10px]">
        <div className="flex w-full justify-between gap-6 items-center">
          <a href="https://scape.tools/">
            <Icon
              src="/assets/logo/ScapeTools_logo_orange.png"
              alt="ScapeTools"
              className="min-h-10 min-w-40 hidden md:flex"
            />
            <Icon
              src="/assets/logo/ScapeTools_pickaxe_orange.png"
              alt="ScapeTools"
              className="min-h-9 min-w-9 md:hidden"
            />
          </a>

          <h1 className="text-center text-xl justify-center items-center text-orange-100 md:hidden">
            RS3 Arch Planner
          </h1>
          <h1 className="text-center text-xl justify-center items-center text-orange-100 hidden md:flex lg:text-2xl">
            RS3 Archaeology Planner
          </h1>
          <div className="flex gap-x-3 gap-y-5 justify-end items-center content-center overflow-hidden transition-all duration-300">
            <div className="hidden lg:flex gap-2 items-center">
              {Object.values(Screens).map((label) => (
                <MenuButton key={label} label={label} />
              ))}
            </div>
            <div className="flex items-center justify-end gap-4">
              <button
                className="h-5 w-5 min-h-5 min-w-5 cursor-pointer"
                onClick={() => {
                  window.open('https://discord.gg/NwzYjZadaS');
                }}
              >
                <img
                  className="h-5 w-5 min-h-5 min-w-5"
                  src="assets/discord.svg"
                  alt="Discord"
                  title="Join the ScapeTools Discord server"
                />
              </button>
              <button
                className="h-5 w-5 cursor-pointer"
                onClick={toggleSettingsMenu}
              >
                <Cog8ToothIcon className="h-5 w-5 text-orange-100" />
              </button>
              <button onClick={toggleMenu} className="lg:hidden cursor-pointer">
                {menuOpen ? (
                  <XMarkIcon className="h-6 w-6 text-orange-100" />
                ) : (
                  <Bars3Icon className="h-6 w-6 text-orange-100" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div
          className="lg:hidden flex flex-col w-full items-stretch md:flex-row justify-center md:items-center content-center gap-y-1 sm:gap-3 overflow-hidden transition-all duration-300"
          onClick={closeMenu}
          style={{
            height: 'fit-content',
            maxHeight: menuOpen ? '280px' : '0',
            paddingTop: menuOpen ? '1rem' : '0',
            paddingBottom: menuOpen ? '2rem' : '0',
          }}
        >
          {Object.values(Screens).map((label) => (
            <MenuButton key={label} label={label} />
          ))}
        </div>
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
                  {colorblindMode ? (
                    <CheckIcon className="w-5 h-5 text-orange-100" />
                  ) : null}
                </div>
                Colorblind mode
              </button>
            </div>
            <div className="flex flex-col items-end pt-4">
              <span className="text-xs text-gray-300 text-right">
                Version 1.1.0 (2025/05/25)
              </span>
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
      </div>

      {menuOpen && (
        <div
          className="z-40 fixed top-0 left-0 h-screen w-screen lg:hidden"
          onClick={closeMenu}
        />
      )}
    </>
  );
}
