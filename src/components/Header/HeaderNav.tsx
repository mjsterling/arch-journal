import { MenuButton } from '@/components';

export function HeaderNav() {
  return (
    <>
      <MenuButton href="/artefacts" label="Artefacts" />
      <MenuButton href="/collections" label="Collections" />
      <MenuButton href="/material-storage" label="Material Storage" />
      <MenuButton href="/planner" label="Planner" />
      <MenuButton href="/bank-cleaner" label="Bank Cleaner" />
    </>
  );
}
