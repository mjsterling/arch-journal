import { useGlobalState } from '../data/GlobalStateProvider';
import { Materials, MaterialsByType } from '../data/Materials';
import { DigsiteNames, Digsites } from '../data/Digsites';
import { useContextMenu } from '../data/useContextMenus';

export default function MaterialStorage() {
  const { materialStorage } = useGlobalState();

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-4 py-8">
      <div className="flex flex-col md:grid md:grid-cols-5 md:w-144 mx-auto">
        <MaterialStorageTitle title="Agnostic Materials" />
        {MaterialsByType.Agnostic.map((material) => (
          <MaterialStorageInput
            key={material}
            material={material}
            amount={materialStorage[material]}
            backgroundColor={'#CCC3'}
            borderColor={'#ccc'}
          />
        ))}
        <MaterialStorageTitle title="Armadylean Materials" />
        {MaterialsByType.Armadylean.map((material) => (
          <MaterialStorageInput
            key={material}
            material={material}
            amount={materialStorage[material]}
            backgroundColor={Digsites[DigsiteNames.Stormguard].backgroundColor}
            borderColor={Digsites[DigsiteNames.Stormguard].borderColor}
          />
        ))}
        <MaterialStorageTitle title="Bandosian Materials" />
        {MaterialsByType.Bandosian.map((material) => (
          <MaterialStorageInput
            key={material}
            material={material}
            amount={materialStorage[material]}
            backgroundColor={Digsites[DigsiteNames.Warforge].backgroundColor}
            borderColor={Digsites[DigsiteNames.Warforge].borderColor}
          />
        ))}
        <MaterialStorageTitle title="Dragonkin Materials" />
        {MaterialsByType.Dragonkin.map((material) => (
          <MaterialStorageInput
            key={material}
            material={material}
            amount={materialStorage[material]}
            backgroundColor={Digsites[DigsiteNames.Daemonheim].backgroundColor}
            borderColor={Digsites[DigsiteNames.Daemonheim].borderColor}
          />
        ))}
        <MaterialStorageTitle title="Saradominist Materials" />
        {MaterialsByType.Saradominist.map((material) => (
          <MaterialStorageInput
            key={material}
            material={material}
            amount={materialStorage[material]}
            backgroundColor={Digsites[DigsiteNames.Everlight].backgroundColor}
            borderColor={Digsites[DigsiteNames.Everlight].borderColor}
          />
        ))}
        <MaterialStorageTitle title="Zamorakian Materials" />
        {MaterialsByType.Zamorakian.map((material) => (
          <MaterialStorageInput
            key={material}
            material={material}
            amount={materialStorage[material]}
            backgroundColor={
              Digsites[DigsiteNames.InfernalSource].backgroundColor
            }
            borderColor={Digsites[DigsiteNames.InfernalSource].borderColor}
          />
        ))}
        <MaterialStorageTitle title="Zarosian Materials" />
        {MaterialsByType.Zarosian.map((material) => (
          <MaterialStorageInput
            key={material}
            material={material}
            amount={materialStorage[material]}
            backgroundColor={Digsites[DigsiteNames.KharidEt].backgroundColor}
            borderColor={Digsites[DigsiteNames.KharidEt].borderColor}
          />
        ))}
      </div>
    </div>
  );
}

const MaterialStorageTitle = ({ title }: { title: string }) => (
  <h3 className="text-lg text-center md:text-left font-medium w-full md:col-span-5 text-orange-100 my-4">
    {title}
  </h3>
);

const MaterialStorageInput = ({
  material,
  amount,
  backgroundColor,
  borderColor,
}: {
  material: Materials;
  amount: number;
  backgroundColor?: string;
  borderColor?: string;
}) => {
  const { updateMaterialStorage } = useGlobalState();
  const { createMaterialContextMenu } = useContextMenu();
  return (
    <div
      className="flex flex-row justify-between items-center pl-4 md:pl-0 mx-auto w-[360px] max-w-full md:flex md:flex-col md:items-center md:max-w-full overflow-hidden gap-2 border md:pt-2 border-orange-100"
      style={{ backgroundColor, borderColor }}
    >
      <img
        src={`/assets/materials/${material.replace(/ /g, '_')}.png`}
        alt={material}
        className="h-8 w-8 md:h-10 md:w-10 md:py-1 object-contain object-center cursor-help"
        title={material}
        onContextMenu={createMaterialContextMenu(material)}
      />
      <p className="text-orange-100 md:hidden font-semibold text-sm">
        {material}
      </p>
      <input
        value={amount}
        onChange={(e) =>
          updateMaterialStorage(material, Number(e.target.value))
        }
        className="text-xl py-2 text-center bg-gray-800 text-orange-100 w-40 md:w-full"
      />
    </div>
  );
};
