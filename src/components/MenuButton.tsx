import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  return (
    <Link
      className={[
        "rounded-md border-b text-lg border-b-transparent px-3 xl:px-5 py-3 md:py-1 cursor-pointer text-orange-100",
        pathname === href ? "font-bold border-b-orange-100" : "font-normal",
        "transition-colors ease-in-out active:bg-[#fff1]",
        "flex justify-end",
      ].join(" ")}
      href={href}
    >
      {label}
    </Link>
  );
}
