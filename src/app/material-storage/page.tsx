'use client';
import { useEffect, useState } from 'react';
import { useGlobalState } from '@/data/providers';
import { MaterialsByType, DigsiteNames, Digsites } from '@/data/constants';
import { MaterialStorageTitle, MaterialStorageInput } from './partials';
import * as a1lib from 'alt1';

import { imageToBase64BGRA, hexToArgbInt, pixelsToText } from '@/data/utils';

export default function MaterialStorage() {
  const { materialStorage, updateMaterialStorage } = useGlobalState();

  const [alt1Active, setAlt1Active] = useState(false);
  useEffect(() => {
    if (window.alt1) setAlt1Active(true);
  }, []);

  const importMaterialCounts = async () => {
    if (window.alt1) {
      const alt1 = window.alt1;
      for (const materialType in MaterialsByType) {
        const region = alt1.bindRegion(0, 0, alt1.rsWidth, alt1.rsHeight);
        try {
          const { base64, width, height } = await imageToBase64BGRA(`/assets/ocr/${materialType}.png`);
          if (!base64) {
            console.log('cannot load image');
            continue;
          }
          const subImages = JSON.parse(alt1.bindFindSubImg(region, base64, width, 0, 0, alt1.rsWidth, alt1.rsHeight));

          if (!subImages.length) {
            continue;
          }

          const boxWidth = 38;
          const boxHeight = 15;
          const numberLocations =
            materialType === 'Agnostic'
              ? new Array(10).fill(0).map((_, i) => subImages[0].x + i * 45)
              : new Array(5).fill(0).map((_, i) => subImages[0].x + i * 45);

          numberLocations.forEach((location, index) => {
            const yellowPixels: Array<{ x: number; y: number }> = [];
            const boxLocation = { x: location, y: subImages[0].y + 25 };
            for (let x = boxLocation.x; x < boxLocation.x + boxWidth; x++) {
              for (let y = boxLocation.y; y < boxLocation.y + boxHeight; y++) {
                const pixelData = alt1.bindGetPixel(1, x, y);
                if (pixelData === hexToArgbInt('#FFFF00')) {
                  yellowPixels.push({ x, y });
                  alt1.overLayRect(hexToArgbInt('#0F0'), x, y, 1, 1, 5000, 1);
                }
              }
            }
            const count = pixelsToText(yellowPixels);
            if (/^\d+$/.test(count)) {
              updateMaterialStorage(MaterialsByType[materialType][index], Number(count));
            }
          });
        } catch (error) {
          continue;
        }
      }
    } else {
      alert('Alt1 is not available. Please ensure you are using the Alt1 client.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-4 py-8">
      <div className="flex w-full justify-end">
        {alt1Active ? (
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
