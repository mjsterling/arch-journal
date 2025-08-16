'use client';
import { DigsiteNames } from '@/data/constants/Digsites';
import { useEffect, useState } from 'react';

export function CardContainer({
  name,
  children,
  isComplete,
  isHighlighted,
  combined,
  digsiteInfo,
  onContextMenu,
  opacity,
}: CardContainerProps) {
  const [backgroundColor, setBackgroundColor] = useState<string | string[]>('#3343');
  const [borderColor, setBorderColor] = useState<string | string[]>('#334');
  useEffect(() => {
    if (Array.isArray(digsiteInfo)) {
      setBackgroundColor(digsiteInfo.map((site) => site.backgroundColor));
      setBorderColor(digsiteInfo.map((site) => site.borderColor));
    } else if (digsiteInfo) {
      setBackgroundColor(digsiteInfo.backgroundColor);
      setBorderColor(digsiteInfo.borderColor);
    }
  }, [digsiteInfo]);

  return (
    <div
      className={[
        'w-full md:w-auto border-2 p-4 pb-6 md:pb-4 flex flex-wrap md:flex-nowrap content-center justify-around md:justify-between gap-4 cursor-help hover:z-10 transition-all duration-1000',
        isComplete ? 'border-green-700' : 'border-orange-100',
        isHighlighted ? 'outline-2 -outline-offset-2 outline-yellow-500 z-10' : 'z-0',
        combined
          ? 'rounded-none border-t-1 first-of-type:border-t-2 border-b-1 last-of-type:border-b-2'
          : 'rounded-none',
      ].join(' ')}
      style={{
        backgroundColor: typeof backgroundColor === 'string' ? backgroundColor : undefined,
        borderColor: typeof borderColor === 'string' ? borderColor : undefined,
        opacity,

        ...(Array.isArray(backgroundColor) && Array.isArray(borderColor) && Array.isArray(digsiteInfo)
          ? {
              backgroundImage: `linear-gradient(to right, ${backgroundColor.join(', ')})`,
              borderImageSource: `linear-gradient(to right, ${borderColor.join(', ')})`,
              borderImageSlice: 1,
            }
          : {}),
      }}
      id={name.replace(/\W/g, '')}
      onContextMenu={onContextMenu}
    >
      {children}
    </div>
  );
}

type CardContainerProps = {
  name: string;
  children: React.ReactNode;
  isComplete: boolean;
  isHighlighted: boolean;
  combined: boolean;
  digsiteInfo:
    | {
        name: DigsiteNames;
        icon: string;
        backgroundColor: string;
        borderColor: string;
        url: string;
      }
    | {
        name: DigsiteNames;
        icon: string;
        backgroundColor: string;
        borderColor: string;
        url: string;
      }[]
    | null;
  opacity: number;
  onContextMenu: (e: React.MouseEvent) => void;
};
