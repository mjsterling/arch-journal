import { useGlobalState } from '../data/GlobalStateProvider';

export default function Icon({
  src,
  alt,
  className,
  contextMenu = false,
}: {
  src: string;
  alt: string;
  className?: string;
  contextMenu?: boolean;
}) {
  const { createContextMenu, wiki } = useGlobalState();
  return (
    <img
      src={src}
      alt={alt}
      className={`w-4 h-4 ${className}`}
      onContextMenu={
        contextMenu
          ? (e) =>
              createContextMenu(e, [
                [
                  {
                    label: 'Wiki: ' + alt,
                    callback: () => contextMenu && wiki(alt),
                  },
                ],
              ])
          : undefined
      }
    />
  );
}
