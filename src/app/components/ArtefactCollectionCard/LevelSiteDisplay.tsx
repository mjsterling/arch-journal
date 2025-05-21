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
        'flex flex-col sm:flex-row justify-center items-center md:gap-1 min-h-full md:min-w-24',
        className,
      ].join(' ')}
    >
      <p className="sm:text-lg md:text-2xl text-orange-100 font-semibold text-center px-2 pb-1">
        {level}
      </p>

      <img
        src={site?.icon}
        alt={site?.name}
        title={site?.name}
        className="transition-all h-5 w-5 sm:h-6 sm:w-6 md:h-9 md:w-9 object-cover rounded-full cursor-help"
      />
    </div>
  );
}
