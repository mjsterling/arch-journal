import { DigsiteNames } from '@/app/data/Digsites';
import { useEffect, useState } from 'react';

export const CardContainer = ({
  name,
  children,
  isComplete,
  isHighlighted,
  combined,
  digsiteInfo,
  onContextMenu,
  opacity,
}: {
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
}) => {
  const [backgroundColor, setBackgroundColor] = useState('#333');
  const [borderColor, setBorderColor] = useState('#333');
  useEffect(() => {
    if (Array.isArray(digsiteInfo)) {
      setBackgroundColor(digsiteInfo[0].backgroundColor);
      setBorderColor(digsiteInfo[0].borderColor);
    } else if (digsiteInfo) {
      setBackgroundColor(digsiteInfo.backgroundColor);
      setBorderColor(digsiteInfo.borderColor);
    }
  }, [digsiteInfo]);
  useEffect(() => {
    if (!Array.isArray(digsiteInfo)) return;
    const lastIndex = digsiteInfo.findIndex(
      (site) => site.backgroundColor === backgroundColor
    );
    setTimeout(() => {
      if (lastIndex === digsiteInfo.length - 1) {
        setBackgroundColor(digsiteInfo[0].backgroundColor);
        setBorderColor(digsiteInfo[0].borderColor);
      } else {
        setBackgroundColor(digsiteInfo[lastIndex + 1].backgroundColor);
        setBorderColor(digsiteInfo[lastIndex + 1].borderColor);
      }
    }, 5000);
  }, [digsiteInfo, backgroundColor]);
  return (
    <div
      className={[
        'w-full md:w-auto border-2 p-4 pb-6 md:pb-4 flex flex-wrap md:flex-nowrap content-center justify-around md:justify-between gap-4 cursor-help hover:z-10 transition-all duration-1000',
        isComplete ? 'border-green-700' : 'border-orange-100',
        isHighlighted
          ? 'outline-2 -outline-offset-2 outline-yellow-500 z-10'
          : 'z-0',
        combined
          ? 'rounded-none border-t-1 first-of-type:border-t-2 border-b-1 last-of-type:border-b-2 last-of-type:rounded-b-lg first-of-type:rounded-t-lg'
          : 'rounded-md',
      ].join(' ')}
      style={{
        backgroundColor,
        borderColor,
        opacity,
      }}
      id={name.replace(/\W/g, '')}
      onContextMenu={onContextMenu}
    >
      {children}
    </div>
  );
};
