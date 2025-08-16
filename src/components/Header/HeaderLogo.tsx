import Icon from "../Icon";

export default function HeaderLogo() {
  return (
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
  );
}
