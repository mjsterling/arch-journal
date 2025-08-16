import { type Artefact, useContextMenu, useGlobalState } from '@/data/providers';
import { Icon } from '@/components';

export const MaterialCard: MaterialCard = ({ artefact, material, amount, numberOfRecurringCompletions = 1 }) => {
  const { materialStorage } = useGlobalState();
  const { createMaterialContextMenu, createWikiContextMenu } = useContextMenu();
  return (
    <div className={'flex flex-col gap-1'} key={`${artefact.name}_${material}`}>
      <div className="flex justify-center items-center">
        <Icon
          src={`/assets/materials/${material.replace(/ /g, '_')}.png`}
          alt={material}
          className="h-8 w-8 object-contain object-center cursor-help"
          onContextMenu={
            materialStorage.hasOwnProperty(material)
              ? createMaterialContextMenu(material)
              : createWikiContextMenu(material)
          }
        />
      </div>
      <span className="w-full text-center font-semibold">
        {Intl.NumberFormat('en-AU').format(amount * numberOfRecurringCompletions)}
      </span>
    </div>
  );
};

type MaterialCard = React.FC<{
  artefact: Artefact;
  material: string;
  amount: number;
  numberOfRecurringCompletions?: number;
}>;
