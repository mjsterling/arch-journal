import { Collection } from '@/data/constants';
import { useContextMenu } from '@/data/providers';
import { Icon } from '@/components';
import { SingleRewardDisplay } from '.';

export const RewardDisplay: RewardDisplay = ({ selectedCollectionData, mode, numberOfRecurringCompletions }) => {
  const { createWikiContextMenu } = useContextMenu();
  return (
    <div className="flex flex-row gap-8 w-full justify-center items-center">
      <div
        key={`${selectedCollectionData.name}_experience}`}
        onContextMenu={createWikiContextMenu('Experience')}
        className="flex flex-col items-center text-orange-100 px-2 cursor-help"
      >
        <Icon src={`/assets/collections/Experience.png`} alt={'Experience'} className="h-8 w-8 object-contain" />
        <p className="text-base font-semibold">
          {Intl.NumberFormat('en-AU').format(
            Math.round(
              selectedCollectionData.artefacts!.map((artefact) => artefact.xp).reduce((a, b) => a + b, 0) *
                (mode === 'recurring' ? numberOfRecurringCompletions : 1)
            )
          )}
        </p>
      </div>
      {Object.entries(
        (mode === 'first' && selectedCollectionData.reward) || selectedCollectionData.recurringReward
      ).map(([reward, amount]) => (
        <SingleRewardDisplay
          key={`${selectedCollectionData.name}_${reward}`}
          selectedCollectionData={selectedCollectionData}
          reward={reward}
          amount={amount!}
          numberOfRecurringCompletions={numberOfRecurringCompletions}
        />
      ))}
    </div>
  );
};

type RewardDisplay = React.FC<{
  selectedCollectionData: Collection;
  mode: 'first' | 'recurring';
  numberOfRecurringCompletions: number;
}>;
