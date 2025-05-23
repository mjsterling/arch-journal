import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import { Screens } from '../data/GlobalStateProvider';
import Icon from './Icon';
import MenuButton from './MenuButton';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <>
      <div className="sticky top-0 z-50 w-full lg:h-20 flex flex-col pt-4 pb-0 lg:py-0 lg:grid lg:grid-cols-[1fr_1fr] justify-between gap-y-4 gap-x-8 px-6 md:px-12 items-center bg-[#0009] backdrop-blur-[10px]">
        <div className="flex w-full justify-between items-center">
          <a href="https://scape.tools/">
            <Icon
              src="/assets/logo/ScapeTools_logo_orange.png"
              alt="ScapeTools"
              className="h-10 sm:h-12 w-auto"
            />
          </a>
          <button onClick={toggleMenu} className="lg:hidden cursor-pointer">
            {isMenuOpen ? (
              <XMarkIcon className="h-8 w-8 text-orange-100" />
            ) : (
              <Bars3Icon className="h-8 w-8 text-orange-100" />
            )}
          </button>
          <h1 className="text-center text-2xl hidden xl:flex justify-center items-center text-orange-100">
            RS3 Archaeology Planner
          </h1>
        </div>
        <div className="hidden lg:flex w-full gap-x-3 gap-y-5 justify-end items-center content-center overflow-hidden transition-all duration-300">
          {Object.values(Screens).map((label) => (
            <MenuButton key={label} label={label} />
          ))}
          <button
            className="h-5 w-5 cursor-pointer"
            onClick={() => {
              window.open('https://discord.gg/NwzYjZadaS');
            }}
          >
            <img className="h-5 w-5" src="assets/discord.svg" />
          </button>
        </div>
        <div
          className="lg:hidden flex flex-col w-full items-stretch md:flex-row justify-center md:items-center content-center gap-y-1 sm:gap-3 overflow-hidden transition-all duration-300"
          onClick={closeMenu}
          style={{
            height: 'fit-content',
            maxHeight: isMenuOpen ? '280px' : '0',
            paddingTop: isMenuOpen ? '1rem' : '0',
            paddingBottom: isMenuOpen ? '2rem' : '0',
          }}
        >
          {Object.values(Screens).map((label) => (
            <MenuButton key={label} label={label} />
          ))}
          <button
            className="h-5 w-5 cursor-pointer"
            onClick={() => {
              window.open('https://discord.gg/NwzYjZadaS');
            }}
          >
            <img className="h-5 w-5" src="assets/discord.svg" />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div
          className="z-40 fixed top-0 left-0 h-screen w-screen lg:hidden"
          onClick={closeMenu}
        />
      )}
    </>
  );
}
