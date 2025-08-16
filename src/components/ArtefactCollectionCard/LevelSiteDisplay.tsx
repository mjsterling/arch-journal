'use client';
import { useEffect, useState } from 'react';

export const LevelSiteDisplay: LevelSiteDisplay = ({ className = '', level, sites }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!Array.isArray(sites)) return;
    setTimeout(() => {
      if (index === sites.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }, 5000);
  }, [sites, index, setIndex]);

  return (
    <div
      className={[
        'flex flex-col sm:flex-row justify-center items-center md:gap-1 min-h-full md:min-w-24',
        className,
      ].join(' ')}
    >
      <p className="sm:text-lg md:text-2xl text-orange-100 font-semibold text-center px-2 pb-1">{level}</p>
      <div
        className="relative flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 md:h-9 md:w-9"
        title={Array.isArray(sites) ? sites.map((site) => site.name).join(', ') : sites?.name}
      >
        {Array.isArray(sites) ? (
          sites.map((site) => (
            <img
              key={site.name + level + '_icon'}
              src={site.icon}
              alt={site.name}
              style={{ opacity: index === sites.indexOf(site) ? 1 : 0 }}
              className="absolute transition-all left-0 top-0 h-5 w-5 sm:h-6 sm:w-6 md:h-9 md:w-9 object-cover rounded-full cursor-help duration-1000"
            />
          ))
        ) : (
          <img
            src={sites?.icon}
            alt={sites?.name}
            title={sites?.name}
            className="absolute transition-all left-0 top-0 h-5 w-5 sm:h-6 sm:w-6 md:h-9 md:w-9 object-cover rounded-full cursor-help duration-1000"
          />
        )}
      </div>
    </div>
  );
};

type LevelSiteDisplay = React.FC<{
  className?: string;
  level: number;
  sites:
    | {
        name: string;
        icon: string;
        backgroundColor: string;
        url: string;
      }
    | {
        name: string;
        icon: string;
        backgroundColor: string;
        url: string;
      }[]
    | null;
}>;
