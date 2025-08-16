"use client";
import { useState } from "react";
import HeaderLogo from "./HeaderLogo";
import HeaderNavDesktop from "./HeaderNavDesktop";
import HeaderSettingsMenu from "./HeaderSettingsMenu";
import HeaderButtons from "./HeaderButtons/HeaderButtons";
import HeaderTitle from "./HeaderTitle";
import HeaderNavMobile from "./HeaderNavMobile";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };
  const toggleSettingsMenu = () => {
    setSettingsMenuOpen((prev) => !prev);
  };

  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  return (
    <>
      <div className="sticky top-0 z-50 w-full flex flex-col pt-4 pb-0 lg:pb-2 justify-start gap-y-2 gap-x-8 px-6 md:px-12 items-center bg-[#0009] backdrop-blur-[10px]">
        <div className="w-full flex justify-between lg:grid-cols-[160px_1fr_160px] gap-6 items-center">
          <HeaderLogo />
          <HeaderTitle />
          <HeaderButtons
            toggleMenu={toggleMenu}
            toggleSettingsMenu={toggleSettingsMenu}
            menuOpen={menuOpen}
          />
        </div>
        <HeaderNavMobile closeMenu={closeMenu} menuOpen={menuOpen} />
        <HeaderSettingsMenu
          settingsMenuOpen={settingsMenuOpen}
          closeMenu={closeMenu}
        />
        <HeaderNavDesktop />
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
