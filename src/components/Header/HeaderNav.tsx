import MenuButton from "../MenuButton";

export default function HeaderNav() {
  return (
    <>
      <MenuButton href="/" label="Artefacts" />
      <MenuButton href="/collections" label="Collections" />
      <MenuButton href="/material-storage" label="Material Storage" />
      <MenuButton href="/planner" label="Planner" />
      <MenuButton href="/bank-cleaner" label="Bank Cleaner" />
    </>
  );
}
