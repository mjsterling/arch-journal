import { useContextMenu } from '../../data/useContextMenus';
import Icon from '../Icon';

export const MaterialDisplay = (material: {
  name: string;
  isArchMaterial: boolean;
  storage: number;
  diff: number;
  amount: number;
}) => {
  const { createMaterialContextMenu, createWikiContextMenu } = useContextMenu();
  return (
    <div
      key={material.name}
      className="flex flex-col gap-2 justify-center items-center"
    >
      <Icon
        src={`/assets/materials/${material.name.replace(/ /g, '_')}.png`}
        alt={material.name}
        className="h-8 w-8 mb-1 object-contain object-center cursor-help"
        onContextMenu={
          material.isArchMaterial
            ? createMaterialContextMenu(material.name)
            : createWikiContextMenu(material.name)
        }
      />
      <span className="font-medium text-orange-100">{material.name}</span>

      <span
        className={[
          'w-full text-center font-semibold',
          !material.isArchMaterial
            ? 'text-yellow-500'
            : material.diff < 0
            ? 'text-red-500'
            : 'text-green-700',
        ].join(' ')}
      >
        {material.isArchMaterial
          ? Intl.NumberFormat('en-AU').format(material.storage)
          : ''}
        {material.isArchMaterial ? ' / ' : ''}
        {Intl.NumberFormat('en-AU').format(material.amount)}
        {material.diff < 0
          ? ` (${Intl.NumberFormat('en-AU').format(material.diff)})`
          : ''}
      </span>
    </div>
  );
};
