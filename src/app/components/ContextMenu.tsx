import { useEffect, useMemo, useRef, useState } from 'react';
import { ContextMenuItem, useGlobalState } from '../data/GlobalStateProvider';

export default function ContextMenu() {
  const { contextMenu: unfilteredContextMenu, clearContextMenu } =
    useGlobalState();

  const itemExists = (
    item: ContextMenuItem | null | false | undefined
  ): item is ContextMenuItem => typeof item === 'object' && item !== null;

  const contextMenu = useMemo(
    () => ({
      x: unfilteredContextMenu.x,
      y: unfilteredContextMenu.y,
      items: unfilteredContextMenu.items
        .map((section) => section.filter(itemExists))
        .filter((section) => section.length),
    }),
    [unfilteredContextMenu]
  );

  const handleBackgroundClick = (e: React.MouseEvent) => {
    e.preventDefault();
    clearContextMenu();
  };

  const menuContentsRef = useRef<HTMLDivElement>(null);

  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!menuContentsRef.current) {
      setOffset({ x: 0, y: 0 });
      return () => {
        setOffset({ x: 0, y: 0 });
      };
    }
    const rect = menuContentsRef.current.getBoundingClientRect();
    setOffset({
      x:
        contextMenu.x + rect.width > window.innerWidth
          ? -(contextMenu.x + rect.width - window.innerWidth + 20)
          : 0,
      y:
        contextMenu.y + rect.height > window.innerHeight
          ? -(contextMenu.y + rect.height - window.innerHeight + 20)
          : 0,
    });
  }, [contextMenu, menuContentsRef]);

  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (contextMenu.items.length) setOpacity(1);
    else setOpacity(0);
  }, [contextMenu.items]);
  if (!String(contextMenu.items.flat()).length) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-50 transition-all duration-150"
      style={{ opacity }}
      onClick={handleBackgroundClick}
      onContextMenu={handleBackgroundClick}
    >
      <div
        className="w-fit border border-orange-100 bg-gray-900 rounded-md rounded-tl-none absolute top-0 left-0 z-50"
        style={{
          top: contextMenu.y,
          left: contextMenu.x,
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
      >
        <div className="flex flex-col min-w-fit" ref={menuContentsRef}>
          {contextMenu.items.map((section, index) => (
            <div
              className="flex flex-col w-full border-b border-b-orange-100 last-of-type:border-b-0"
              key={`section_${index}`}
            >
              {section.map((item, index) => (
                <button
                  key={`${item.label}_${index}`}
                  disabled={item.disabled}
                  className="text-orange-100 disabled:text-gray-500 hover:bg-gray-800 disabled:hover:bg-transparent disabled:cursor-default px-4 py-2 text-left cursor-pointer"
                  onClick={() => {
                    if (item.callback) {
                      item.callback();
                    }
                  }}
                >
                  {item.label.startsWith('[WIKI]') ? (
                    <span className="flex gap-2 items-center text-nowrap min-w-fit">
                      <img
                        src="/assets/RS_Wiki.jpg"
                        alt="Wiki"
                        className="h-4 w-4 inline-block"
                      />
                      {item.label.replace('[WIKI]', '')}
                    </span>
                  ) : (
                    <span className="text-nowrap min-w-fit">{item.label}</span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
