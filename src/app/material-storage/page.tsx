'use client';
import { useEffect } from 'react';
import axios from 'axios';
import { useGlobalState } from '@/data/providers';
import { MaterialsByType, DigsiteNames, Digsites } from '@/data/constants';
import { MaterialStorageTitle, MaterialStorageInput } from './partials';

export default function MaterialStorage() {
  const { materialStorage } = useGlobalState();

  const importMaterialCounts = async () => {
    if (window.alt1) {
      console.log(window.alt1);
      const region = window.alt1.bindRegion(
        window.alt1.rsX,
        window.alt1.rsY,
        window.alt1.rsWidth,
        window.alt1.rsHeight
      );
      //   for (const material of Object.keys(materialStorage)) {
      console.log(region);
      const tai = await axios.get('/assets/materials/Third-age_iron.png', {
        responseType: 'arraybuffer',
      });
      const buffer = Buffer.from(tai.data, 'binary').toString('base64');
      console.log(buffer);
      // stuck here
      const subImage = window.alt1.bindFindSubImg(region, buffer, 27, 0, 0, window.alt1.rsWidth, window.alt1.rsHeight);
      console.log(subImage);
      //   }
    } else {
      alert('Alt1 is not available. Please ensure you are using the Alt1 client.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-4 py-8">
      <div className="flex w-full justify-end">
        {window.alt1 ? (
          <button
            className="text-orange-100 font-semibold cursor-pointer hover:scale-102 transition-transform text-base border-orange-100 border-2 rounded-md px-3 py-1"
            onClick={importMaterialCounts}
          >
            Import Material Counts
          </button>
        ) : (
          <span className="text-sm text-orange-100">
            ! Alt1 not available. Please open in Alt1 browser to use material import feature.
          </span>
        )}
      </div>
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
            backgroundColor={Digsites[DigsiteNames.InfernalSource].backgroundColor}
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
