import { Artefact, useContextMenu } from '@/data/providers';
import { Icon } from '../Icon';

export function ArtefactMaterialDisplay({ artefact }: { artefact: Artefact }) {
  const { createMaterialContextMenu } = useContextMenu();

  return (
    <div className="hidden md:flex gap-3">
      {Object.entries(artefact.materials).map(([name, amount]) => (
        <div className="flex gap-1 items-center" key={`ArtefactMaterial_${artefact.name}__${name}`}>
          <Icon
            src={`/assets/materials/${name.replace(/ /g, '_')}.png`}
            alt={name}
            title={name}
            contextMenu
            className="h-5 w-5 object-contain cursor-help"
            onContextMenu={createMaterialContextMenu(name)}
          />
          <span className="text-sm text-orange-100">{amount}</span>
        </div>
      ))}
    </div>
  );
}
