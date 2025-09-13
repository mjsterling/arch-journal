import { Artefact, useContextMenu } from '@/data/providers';
import { ArtefactCard, Icon } from '.';

export function ArtefactHotspot({
  hotspot,
  artefacts,
  markAllAsCompleted,
  markAllAsNotFound,
  hotspotMaterials,
  searchQuery,
  highlightedArtefact,
  completed,
}: ArtefactHotspotProps) {
  const { createHotspotContextMenu, createMaterialContextMenu } = useContextMenu();
  return (
    <div key={`${hotspot}_container`} className="relative w-full md:mt-2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col md:flex-row w-full items-start justify-between md:items-center py-2 md:py-4 gap-y-1">
          <div className="flex flex-row justify-between items-center w-full">
            <h2
              className={[
                'text-base sm:text-lg md:text-xl text-orange-100 font-semibold cursor-help',
                completed ? 'opacity-50' : '',
              ].join(' ')}
              key={`${hotspot}_title`}
              onContextMenu={createHotspotContextMenu(
                hotspot,
                completed,
                () => markAllAsNotFound(hotspot),
                () => markAllAsCompleted(hotspot)
              )}
            >
              {hotspot}
            </h2>
          </div>
          <div className="flex flex-row gap-2 md:gap-3 items-center text-orange-100">
            {!completed &&
              Object.entries(hotspotMaterials(hotspot)).map(([material, amount]) => (
                <div
                  key={`${material}_${amount}`}
                  className="flex flex-row gap-0.75 md:gap-1.5 items-center"
                  onContextMenu={createMaterialContextMenu(material)}
                >
                  <Icon
                    src={`/assets/materials/${material.replace(/ /g, '_')}.png`}
                    alt={material}
                    className="h-4 md:h-6 w-4 md:w-6 object-contain object-center"
                  />
                  <p className="text-orange-100 font-semibold text-xs md:text-base">{amount}</p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {artefacts.map((artefact) => (
        <ArtefactCard
          highlighted={artefact.name === highlightedArtefact}
          key={artefact.name}
          artefact={artefact}
          alwaysShow={searchQuery.length > 0}
          combined={true}
        />
      ))}
    </div>
  );
}

type ArtefactHotspotProps = {
  hotspot: string;
  artefacts: Artefact[];
  markAllAsNotFound: (hotspot: string) => void;
  markAllAsCompleted: (hotspot: string) => void;
  hotspotMaterials: (hotspot: string) => { [key: string]: number };
  searchQuery: string;
  highlightedArtefact: string | null;
  completed: boolean;
};
