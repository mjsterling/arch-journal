import { Collections } from '@/data/constants';
import { ArtefactCollectionButton } from './ArtefactCollectionButton';
import { ArtefactMiscButton } from './ArtefactMiscButton';
import { Artefact } from '@/data/providers';

export function ArtefactButtons({ artefact, className }: { artefact: Artefact; className?: string }) {
  return (
    <div
      className={`flex flex-row flex-wrap md:flex-nowrap gap-1.5 md:gap-2 justify-center lg:justify-start ${className}`}
    >
      {Object.entries(artefact.collections).map(([name, status]) => {
        const { collector, image } = Collections.find((collection) => collection.name === name) ?? {
          collector: '',
          image: '',
          shortName: '',
        };
        return (
          <ArtefactCollectionButton
            mode="artefactPage"
            key={`ArtefactButton_${artefact.name}__${name}`}
            artefact={artefact}
            collection={name}
            collector={collector}
            image={image}
            status={status}
          />
        );
      })}
      {Object.entries(artefact.mysteries).map(([name, status]) => {
        return (
          <ArtefactMiscButton
            key={`ArtefactButton_${artefact.name}__${name}`}
            artefact={artefact}
            type="mysteries"
            typeKey={name}
            image={'/assets/collections/mysteries.png'}
            status={status}
          />
        );
      })}
      {Object.entries(artefact.researchers).map(([name, status]) => {
        return (
          <ArtefactMiscButton
            key={`ArtefactButton_${artefact.name}__${name}`}
            artefact={artefact}
            type="researchers"
            typeKey={name}
            image={'/assets/collections/researchers.png'}
            status={status}
          />
        );
      })}
      {Object.entries(artefact.quests).map(([name, status]) => {
        return (
          <ArtefactMiscButton
            key={`ArtefactButton_${artefact.name}__${name}`}
            artefact={artefact}
            type="quests"
            typeKey={name}
            image={'/assets/collections/quests.png'}
            status={status}
          />
        );
      })}
      {Object.entries(artefact.misc).map(([name, status]) => {
        return (
          <ArtefactMiscButton
            key={`ArtefactButton_${artefact.name}__${name}`}
            artefact={artefact}
            type="misc"
            typeKey={name}
            image={'/assets/collections/misc.png'}
            status={status}
          />
        );
      })}
    </div>
  );
}
