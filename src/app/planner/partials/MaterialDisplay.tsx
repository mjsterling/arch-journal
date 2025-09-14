import { Icon } from '@/components';
import { useContextMenu } from '@/data/providers';

export const MaterialDisplay: MaterialDisplay = (material) => {
  const { createMaterialContextMenu, createWikiContextMenu } = useContextMenu();
  return (
    <div
      key={material.name}
      className="grid grid-cols-[36px_3fr_2fr] md:flex md:flex-col gap-x-2 gap-2 w-full justify-between md:justify-center items-center text-sm md:text-base"
    >
      <Icon
        src={`/assets/materials/${material.name.replace(/ /g, '_')}.png`}
        alt={material.name}
        className="min-h-6 md:min-h-8 min-w-6 md:min-w-8 max-h-6 md:max-h-8 max-w-6 md:max-w-8 mb-1 object-contain object-center cursor-help"
        onContextMenu={
          material.isArchMaterial ? createMaterialContextMenu(material.name) : createWikiContextMenu(material.name)
        }
      />
      <div
        className={[
          'font-medium w-full text-left md:text-center text-nowrap',
          !material.isArchMaterial ? 'text-white' : material.diff < 0 ? 'text-orange-500' : 'text-green-600',
        ].join(' ')}
      >
        {material.name}
      </div>

      <span
        className={[
          'w-full text-right md:text-center font-semibold',
          !material.isArchMaterial ? 'text-white' : material.diff < 0 ? 'text-orange-500' : 'text-green-600',
        ].join(' ')}
      >
        {material.isArchMaterial ? Intl.NumberFormat('en-AU').format(material.storage) : ''}
        {material.isArchMaterial ? ' / ' : ''}
        {Intl.NumberFormat('en-AU').format(material.amount)}
        {material.diff < 0 ? ` (${Intl.NumberFormat('en-AU').format(material.diff)})` : ''}
      </span>
    </div>
  );
};

type MaterialDisplay = React.FC<{
  name: string;
  isArchMaterial: boolean;
  storage: number;
  diff: number;
  amount: number;
}>;
