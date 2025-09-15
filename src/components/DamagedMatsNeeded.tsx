import { MaterialDisplay } from '@/app/planner/partials';
import { ArtefactStates, Materials } from '@/data/constants';
import { Artefact, useArtefacts, useGlobalState } from '@/data/providers';
import { useMemo } from 'react';

export function DamagedMatsNeeded({ mode = 'artefacts' }: { mode: 'artefacts' | 'bank-cleaner' }) {
  const { artefacts } = useArtefacts();
  const { materialStorage } = useGlobalState();
  const materialsNeeded = useMemo(() => {
    const _materialsNeeded: { [key: string]: number } = {};
    if (mode === 'artefacts') {
      artefacts.forEach((artefact: Artefact) => {
        Object.entries(artefact.materials).forEach(([material, amount]) => {
          let numDamaged = Object.values(artefact.collections)
            .map((state) => Number(state === ArtefactStates.Damaged))
            .reduce((a, b) => a + b, 0);
          numDamaged += Object.values(artefact.misc)
            .map((state) => Number(state === ArtefactStates.Damaged))
            .reduce((a, b) => a + b, 0);
          numDamaged += Object.values(artefact.quests)
            .map((state) => Number(state === ArtefactStates.Damaged))
            .reduce((a, b) => a + b, 0);
          numDamaged += Object.values(artefact.mysteries)
            .map((state) => Number(state === ArtefactStates.Damaged))
            .reduce((a, b) => a + b, 0);
          numDamaged += Object.values(artefact.researchers)
            .map((state) => Number(state === ArtefactStates.Damaged))
            .reduce((a, b) => a + b, 0);
          if (numDamaged === 0) return;

          _materialsNeeded[material] = (_materialsNeeded[material] || 0) + amount * numDamaged;
        });
      });
    } else if (mode === 'bank-cleaner') {
      artefacts.forEach((artefact: Artefact) => {
        Object.entries(artefact.materials).forEach(([material, amount]) => {
          _materialsNeeded[material] = (_materialsNeeded[material] || 0) + amount * artefact.count.damaged;
        });
      });
    }

    return _materialsNeeded;
  }, [artefacts, mode]);
  return (
    <div className="flex flex-col gap-0 md:gap-4 md:grid md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
      {Object.entries(materialsNeeded)
        .filter(([, amount]) => amount > 0)
        .sort(([name1], [name2]) => name1.localeCompare(name2))
        .map(([material, amount]) => (
          <MaterialDisplay
            key={material}
            name={material}
            storage={materialStorage[material as Materials]}
            amount={amount}
            diff={materialStorage[material as Materials] - amount}
            isArchMaterial={Object.keys(materialStorage).includes(material)}
          />
        ))}
    </div>
  );
}
