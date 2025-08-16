import { useContextMenu } from '@/data/providers/ContextMenuProvider';

export function Icon({
  src,
  alt,
  className,
  title,
  contextMenu = false,
  onContextMenu = undefined,
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
  title?: string;
  contextMenu?: boolean;
  onContextMenu?: (e: React.MouseEvent) => void;
}) {
  const { createWikiContextMenu } = useContextMenu();
  return (
    <img
      {...props}
      src={src}
      alt={alt}
      title={title}
      className={`w-4 h-4 ${className}`}
      onContextMenu={onContextMenu ?? (contextMenu ? createWikiContextMenu(alt) : undefined)}
    />
  );
}
