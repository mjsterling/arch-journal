export default function LevelSiteDisplay({
  className = '',
  level,
  site,
}: {
  className?: string;
  icon?: string;
  level: number;
  site: {
    name: string;
    icon: string;
    backgroundColor: string;
    url: string;
  } | null;
}) {
  return (
    <div
      className={[
        'flex flex-row justify-center items-center md:gap-1',
        className,
      ].join(' ')}
    >
      <p className="text-lg md:text-2xl text-orange-100 font-bold text-center px-2">
        {level}
      </p>

      <img
        src={site?.icon}
        alt={site?.name}
        className="transition-all h-9 w-9 object-cover rounded-full cursor-help"
      />
    </div>
  );
}
