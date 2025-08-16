import HeaderNav from "./HeaderNav";

export default function HeaderNavMobile({
  closeMenu,
  menuOpen,
}: {
  closeMenu: () => void;
  menuOpen: boolean;
}) {
  return (
    <div
      className="lg:hidden flex flex-col w-full items-stretch md:flex-row justify-center md:items-center content-center gap-y-1 sm:gap-3 overflow-hidden transition-all duration-300"
      onClick={closeMenu}
      style={{
        height: "fit-content",
        maxHeight: menuOpen ? "280px" : "0",
        paddingTop: menuOpen ? "1rem" : "0",
        paddingBottom: menuOpen ? "2rem" : "0",
      }}
    >
      <HeaderNav />
    </div>
  );
}
