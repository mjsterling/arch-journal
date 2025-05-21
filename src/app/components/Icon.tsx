import { useGlobalState } from '../data/GlobalStateProvider';

export default function Icon({
  src,
  alt,
  className,
  title,
  contextMenu = false,
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
  title?: string;
  contextMenu?: boolean;
}) {
  const { createContextMenu, wiki } = useGlobalState();
  return (
    <img
      {...props}
      src={src}
      alt={alt}
      title={title}
      className={`w-4 h-4 ${className}`}
      onContextMenu={
        contextMenu
          ? (e) =>
              createContextMenu(e, [
                [
                  {
                    label: '[WIKI]' + alt,
                    callback: () => contextMenu && wiki(alt),
                  },
                ],
              ])
          : undefined
      }
    />
  );
}
