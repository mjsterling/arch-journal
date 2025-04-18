import { useGlobalState } from '../data/GlobalStateProvider';
import { Materials } from '../data/Materials';

export default function MaterialStorage() {
  const { materialStorage } = useGlobalState();
  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-4 py-8">
      <div className="flex flex-col md:grid md:grid-cols-5 md:w-144 gap-4 mx-auto">
        <MaterialStorageTitle title="Agnostic Materials" />
        {Object.entries(materialStorage)
          .slice(0, 10)
          .map(([material, amount]) => (
            <MaterialStorageInput
              key={material}
              material={material as Materials}
              amount={amount}
            />
          ))}
        <MaterialStorageTitle title="Armadylean Materials" />
        {Object.entries(materialStorage)
          .slice(10, 15)
          .map(([material, amount]) => (
            <MaterialStorageInput
              key={material}
              material={material as Materials}
              amount={amount}
            />
          ))}
        <MaterialStorageTitle title="Bandosian Materials" />
        {Object.entries(materialStorage)
          .slice(15, 20)
          .map(([material, amount]) => (
            <MaterialStorageInput
              key={material}
              material={material as Materials}
              amount={amount}
            />
          ))}
        <MaterialStorageTitle title="Dragonkin Materials" />
        {Object.entries(materialStorage)
          .slice(20, 25)
          .map(([material, amount]) => (
            <MaterialStorageInput
              key={material}
              material={material as Materials}
              amount={amount}
            />
          ))}
        <MaterialStorageTitle title="Saradominist Materials" />
        {Object.entries(materialStorage)
          .slice(25, 30)
          .map(([material, amount]) => (
            <MaterialStorageInput
              key={material}
              material={material as Materials}
              amount={amount}
            />
          ))}
        <MaterialStorageTitle title="Zamorakian Materials" />
        {Object.entries(materialStorage)
          .slice(30, 35)
          .map(([material, amount]) => (
            <MaterialStorageInput
              key={material}
              material={material as Materials}
              amount={amount}
            />
          ))}
        <MaterialStorageTitle title="Zarosian Materials" />
        {Object.entries(materialStorage)
          .slice(35, 40)
          .map(([material, amount]) => (
            <MaterialStorageInput
              key={material}
              material={material as Materials}
              amount={amount}
            />
          ))}
      </div>
    </div>
  );
}

const MaterialStorageTitle = ({ title }: { title: string }) => (
  <h3 className="text-lg text-center md:text-left font-bold w-full md:col-span-5 text-orange-100">
    {title}
  </h3>
);

const MaterialStorageInput = ({
  material,
  amount,
}: {
  material: Materials;
  amount: number;
}) => {
  const { createContextMenu, updateMaterialStorage } = useGlobalState();
  return (
    <div
      key={material}
      className="flex flex-row justify-between items-center pl-4 md:pl-0 mx-auto w-[360px] max-w-full md:flex md:flex-col md:items-center md:max-w-full overflow-hidden gap-2 border-2 md:pt-2 border-orange-100 rounded-lg"
    >
      <img
        src={`/assets/materials/${material.replace(/ /g, '_')}.png`}
        alt={material}
        className="h-8 w-8 md:h-10 md:w-10 md:py-1 object-contain object-center cursor-help"
        title={material}
        onContextMenu={(e) =>
          createContextMenu(e, [
            [
              {
                label: 'Wiki: ' + material,
                callback: () =>
                  window.open(
                    `https://runescape.wiki/w/${material.replace(/ /g, '_')}`,
                    '_blank'
                  ),
              },
              {
                label: 'Wiki: Material cache locations',
                callback: () =>
                  window.open(
                    `https://runescape.wiki/w/Material_cache_(${material
                      .toLowerCase()
                      .replace(/ /g, '_')})#Locations`,
                    '_blank'
                  ),
              },
            ],
          ])
        }
      />
      <p className="text-orange-100 md:hidden font-bold text-sm">{material}</p>
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
