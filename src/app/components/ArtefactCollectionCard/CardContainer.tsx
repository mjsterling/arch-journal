import { DigsiteNames } from '@/app/data/Digsites';

export const CardContainer = ({
  name,
  children,
  isComplete,
  isHighlighted,
  combined,
  digsiteInfo,
  onContextMenu,
}: {
  name: string;
  children: React.ReactNode;
  isComplete: boolean;
  isHighlighted: boolean;
  combined: boolean;
  digsiteInfo: {
    name: DigsiteNames;
    icon: string;
    backgroundColor: string;
    borderColor: string;
    url: string;
  } | null;
  onContextMenu: (e: React.MouseEvent) => void;
}) => (
  <div
    className={[
      'w-full md:w-auto bg-gray-800 border-2 p-4 pb-6 md:px-8 md:pb-4 flex flex-wrap md:flex-nowrap content-center justify-around md:justify-between gap-4 transition-opacity duration-500 cursor-help',
      isComplete ? 'border-green-700' : 'border-orange-100',
      isHighlighted
        ? 'outline-2 -outline-offset-2 outline-yellow-500 z-10'
        : 'z-0',
      combined
        ? 'rounded-none border-t-1 first-of-type:border-t-2 border-b-1 last-of-type:border-b-2 last-of-type:rounded-b-lg first-of-type:rounded-t-lg'
        : 'rounded-md',
    ].join(' ')}
    style={{
      backgroundColor: digsiteInfo?.backgroundColor ?? '#333',
      borderColor: digsiteInfo?.borderColor ?? '#333',
      opacity: isComplete ? 0.5 : 1,
    }}
    id={name.replace(/\W/g, '')}
    onContextMenu={onContextMenu}
  >
    {children}
  </div>
);
