import { useArtefacts } from '@/data/providers';
import { hexToArgbInt, imageToBase64BGRA, pixelsToText } from '@/data/utils';
import { useEffect, useState } from 'react';

export function useBankCleaner() {
  const { artefacts, setArtefacts } = useArtefacts();
  const [scanning, setScanning] = useState(false);
  const [cache, setCache] = useState<{ [key: string]: { base64: string; width: number; height: number } }>({});

  const readArtefact = async (imageUrl: string) => {
    const alt1 = window.alt1;
    try {
      let base64: string;
      let width: number;
      let height: number;
      if (cache[imageUrl]) {
        base64 = cache[imageUrl].base64;
        width = cache[imageUrl].width;
        height = cache[imageUrl].height;
      } else {
        const image = await imageToBase64BGRA(imageUrl);
        if (!image.base64) {
          console.log('cannot load image');
          return null;
        }

        base64 = image.base64;
        width = image.width;
        height = image.height;
      }

      const subImages: Array<{ x: number; y: number }> = JSON.parse(
        alt1.bindFindSubImg(1, base64, width, 0, 0, alt1.rsWidth, alt1.rsHeight)
      );

      if (!subImages.length) {
        return null;
      }

      const boxWidth = 40;
      const boxHeight = 15;

      let count = 0;
      subImages.forEach((subImage: { x: number; y: number }) => {
        const yellowPixels: Array<{ x: number; y: number }> = [];
        const boxLocation = {
          x: Math.round(subImage.x - (boxWidth - width) / 2),
          y: Math.round(subImage.y - (boxWidth - height) / 2),
        };
        alt1.overLayRect(hexToArgbInt('#FFFFFF'), boxLocation.x, boxLocation.y, 40, 40, 2000, 1);
        for (let x = boxLocation.x; x < boxLocation.x + 15; x++) {
          for (let y = boxLocation.y; y < boxLocation.y + boxHeight; y++) {
            const pixelData = alt1.bindGetPixel(1, x, y);
            if (pixelData === hexToArgbInt('#FFFF00')) {
              yellowPixels.push({ x, y });
              alt1.overLayRect(hexToArgbInt('#0F0'), x, y, 1, 1, 2000, 1);
            }
          }
        }
        if (yellowPixels.length) {
          const number = pixelsToText(yellowPixels);
          if (/^\d+$/.test(number)) {
            count += Number(number);
          }
        } else {
          count += 1;
        }
      });
      return count;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const importArtefacts = async () => {
    if (scanning) return;
    setScanning(true);
    if (window.alt1) {
      const alt1 = window.alt1;
      alt1.bindRegion(0, 0, alt1.rsWidth, alt1.rsHeight);
      const newArtefacts = await Promise.all(
        artefacts.map(async (artefact) => {
          const damaged = await readArtefact(`/assets/artefacts/damaged/${artefact.name.replace(/[ \/]/g, '_')}.png`);
          const restored = await readArtefact(`/assets/artefacts/${artefact.name.replace(/[ \/]/g, '_')}.png`);
          return { ...artefact, count: { damaged: damaged ?? 0, restored: restored ?? 0 } };
        })
      );

      setArtefacts([...newArtefacts]);
    } else {
      alert('Alt1 is not available. Please ensure you are using the Alt1 client.');
    }
    setScanning(false);
  };

  const clearAll = () => {
    const newArtefacts = [...artefacts];
    for (const artefact of newArtefacts) {
      artefact.count = { damaged: 0, restored: 0 };
    }
    setArtefacts([...newArtefacts]);
  };

  const [prefetch, setPrefetch] = useState<'idle' | 'loading' | 'done'>('idle');
  const prefetchImages = async () => {
    if (prefetch !== 'idle') return;
    setPrefetch('loading');
    const newCache: { [key: string]: { base64: string; width: number; height: number } } = {};
    await Promise.all(
      artefacts.map(async (artefact) => {
        const imageUrlDamaged = `/assets/artefacts/damaged/${artefact.name.replace(/[ \/]/g, '_')}.png`;
        const imageUrlRestored = `/assets/artefacts/${artefact.name.replace(/[ \/]/g, '_')}.png`;
        const damagedImage = await imageToBase64BGRA(imageUrlDamaged);
        const restoredImage = await imageToBase64BGRA(imageUrlRestored);
        if (damagedImage.base64) {
          newCache[imageUrlDamaged] = damagedImage;
        }
        if (restoredImage.base64) {
          newCache[imageUrlRestored] = restoredImage;
        }
      })
    );
    setCache(newCache);
    setPrefetch('done');
  };

  useEffect(() => {
    prefetchImages();
  });

  return { scanning, prefetch, importArtefacts, clearAll };
}
