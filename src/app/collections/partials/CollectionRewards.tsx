import { Icon } from '@/components';
import { Collection } from '@/data/constants';
import { useArtefacts } from '@/data/providers';
import { shortNumber } from '@/data/utils';
import { useMemo } from 'react';

export function CollectionRewards({ collection }: { collection: Collection }) {
  const { artefacts } = useArtefacts();
  const chronotes = useMemo(() => {
    const baseChronotes =
      collection.reward && !collection.isComplete
        ? collection.reward?.Chronotes!
        : collection.recurringReward.Chronotes!;
    const artefactChronotes = artefacts
      .filter((artefact) => artefact.collections[collection.name])
      .reduce((acc, artefact) => {
        return acc + (artefact.chronotes ?? 0);
      }, 0);
    return baseChronotes + artefactChronotes;
  }, [artefacts, collection]);
  return (
    <div className="flex gap-3 items-center md:items-start">
      {collection.reward &&
        !collection.isComplete &&
        Object.entries(collection.reward).map(([name, amount]) => (
          <div className="flex gap-1 items-center" key={`${collection}_Reward_${name}`}>
            <Icon
              src={`/assets/collections/${name.replace(/ /g, '_')}.${
                name === 'Tetracompass piece' || name === 'Elder Trove' ? 'gif' : 'png'
              }`}
              alt={name}
              title={name}
              contextMenu
              className="h-5 w-5 object-contain cursor-help"
            />
            <span className="text-sm text-orange-100">
              {name === 'Chronotes' ? shortNumber(chronotes) : amount ? shortNumber(amount) : ''}
            </span>
          </div>
        ))}
      {(!collection.reward || collection.isComplete) &&
        Object.entries(collection.recurringReward).map(([name, amount]) => (
          <div className="flex gap-1 items-center text-sm" key={`${collection}_Reward_${name}`}>
            <Icon
              src={`/assets/collections/${name.replace(/ /g, '_')}.${
                name === 'Tetracompass piece' || name === 'Elder Trove' ? 'gif' : 'png'
              }`}
              alt={name}
              title={name}
              contextMenu
              className="h-5 w-5 object-contain cursor-help"
            />
            <span className="text-sm text-orange-100">{amount ? shortNumber(amount) : ''}</span>
          </div>
        ))}
    </div>
  );
}
