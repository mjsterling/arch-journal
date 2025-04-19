import { useGlobalState } from '../data/GlobalStateProvider';
import { Materials } from '../data/Materials';

export default function MaterialStorage() {
  const { materialStorage } = useGlobalState();
  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-4 py-8">
      <div className="flex flex-col md:grid md:grid-cols-5 md:w-144 gap-4 mx-auto">
        <MaterialStorageTitle title="Agnostic Materials" />
        {[
          'Third-age iron',
          'Samite silk',
          'White oak',
          'Goldrune',
          'Orthenglass',
          'Vellum',
          'Leather scraps',
          'Soapstone',
          'Animal furs',
          'Fossilised bone',
        ].map((material) => (
          <MaterialStorageInput
            key={material}
            material={material as Materials}
            amount={materialStorage[material as Materials]}
          />
        ))}
        <MaterialStorageTitle title="Armadylean Materials" />
        {[
          'Stormguard steel',
          'Wings of War',
          'Armadylean yellow',
          'Aetherium alloy',
          'Quintessence',
        ].map((material) => (
          <MaterialStorageInput
            key={material}
            material={material as Materials}
            amount={materialStorage[material as Materials]}
          />
        ))}
        <MaterialStorageTitle title="Bandosian Materials" />
        {[
          'Malachite green',
          'Mark of the Kyzaj',
          'Vulcanised rubber',
          'Warforged bronze',
          "Yu'biusk clay",
        ].map((material) => (
          <MaterialStorageInput
            key={material}
            material={material as Materials}
            amount={materialStorage[material as Materials]}
          />
        ))}
        <MaterialStorageTitle title="Dragonkin Materials" />
        {['Dragon metal', 'Orgone', 'Compass rose', 'Carbon black', 'Felt'].map(
          (material) => (
            <MaterialStorageInput
              key={material}
              material={material as Materials}
              amount={materialStorage[material as Materials]}
            />
          )
        )}
        <MaterialStorageTitle title="Saradominist Materials" />
        {[
          'Keramos',
          'White marble',
          'Cobalt blue',
          'Everlight silvthril',
          'Star of Saradomin',
        ].map((material) => (
          <MaterialStorageInput
            key={material}
            material={material as Materials}
            amount={materialStorage[material as Materials]}
          />
        ))}
        <MaterialStorageTitle title="Zamorakian Materials" />
        {[
          'Cadmium red',
          'Chaotic brimstone',
          'Demonhide',
          'Eye of Dagon',
          'Hellfire metal',
        ].map((material) => (
          <MaterialStorageInput
            key={material}
            material={material as Materials}
            amount={materialStorage[material as Materials]}
          />
        ))}
        <MaterialStorageTitle title="Zarosian Materials" />
        {[
          'Zarosian insignia',
          'Imperial steel',
          'Ancient vis',
          'Tyrian purple',
          'Blood of Orcus',
        ].map((material) => (
          <MaterialStorageInput
            key={material}
            material={material as Materials}
            amount={materialStorage[material as Materials]}
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
  const { createContextMenu, updateMaterialStorage, wiki } = useGlobalState();
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
                callback: () => wiki(material.replace(/ /g, '_')),
              },
              {
                label: 'Wiki: Material cache locations',
                callback: () =>
                  wiki(
                    `Material_cache_(${material
                      .toLowerCase()
                      .replace(/ /g, '_')})#Locations`
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
