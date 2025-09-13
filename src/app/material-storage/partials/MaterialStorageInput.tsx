import { Materials } from '@/data/constants';
import { useContextMenu, useGlobalState } from '@/data/providers';

export const MaterialStorageInput: MaterialStorageInput = ({ material, amount, backgroundColor, borderColor }) => {
  const { updateMaterialStorage } = useGlobalState();
  const { createMaterialContextMenu } = useContextMenu();
  return (
    <div
      className="flex flex-row justify-between items-center pl-4 md:pl-0 mx-auto w-full sm:max-w-[400px] md:flex md:flex-col md:items-center md:max-w-full overflow-hidden gap-2 border md:pt-2 border-orange-100"
      style={{ backgroundColor, borderColor }}
    >
      <div className="flex gap-4 items-center">
        <img
          src={`/assets/materials/${material.replace(/ /g, '_')}.png`}
          alt={material}
          className="h-8 w-8 md:h-10 md:w-10 md:py-1 object-contain object-center cursor-help"
          title={material}
          onContextMenu={createMaterialContextMenu(material)}
        />
        <p className="text-orange-100 md:hidden font-semibold text-sm">{material}</p>
      </div>
      <input
        value={amount}
        onChange={(e) => updateMaterialStorage(material, Number(e.target.value))}
        className="text-xl py-2 text-center bg-gray-800 text-orange-100 w-25 sm:w-30 md:w-full"
      />
    </div>
  );
};

type MaterialStorageInput = React.FC<{
  material: Materials;
  amount: number;
  backgroundColor?: string;
  borderColor?: string;
}>;
