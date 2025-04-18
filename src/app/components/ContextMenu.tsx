import { useMemo, useRef } from 'react';
import { useGlobalState } from '../data/GlobalStateProvider';

export default function ContextMenu() {
  const { contextMenu, clearContextMenu } = useGlobalState();

  const handleBackgroundClick = (e: React.MouseEvent) => {
    e.preventDefault();
    clearContextMenu();
  };

  const menuContentsRef = useRef<HTMLDivElement>(null);
  const offset = useMemo(() => {
    if (!menuContentsRef.current) return { x: 0, y: 0 };
    const rect = menuContentsRef.current.getBoundingClientRect();
    return {
      x:
        contextMenu.x + rect.width > window.innerWidth
          ? -(contextMenu.x + rect.width - window.innerHeight)
          : 0,
      y:
        contextMenu.y + rect.height > window.innerHeight
          ? -(contextMenu.y + rect.height - window.innerHeight)
          : 0,
    };
  }, [contextMenu]);

  if (!String(contextMenu.items.flat()).length) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-50"
      onClick={handleBackgroundClick}
      onContextMenu={handleBackgroundClick}
    >
      <div
        className="border-2 border-white bg-gray-950 rounded-md rounded-tl-none absolute top-0 left-0 z-50"
        style={{
          top: contextMenu.y,
          left: contextMenu.x,
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
      >
        <div className="flex flex-col" ref={menuContentsRef}>
          {contextMenu.items.map((section, index) => (
            <div
              className="flex flex-col w-full border-b-2 border-b-white last-of-type:border-b-0"
              key={`section_${index}`}
            >
              {section.map((item, index) => (
                <button
                  key={`${item.label}_${index}`}
                  className="text-white hover:bg-gray-800 px-4 py-2 text-left cursor-pointer"
                  onClick={() => {
                    if (item.callback) {
                      item.callback();
                    }
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
