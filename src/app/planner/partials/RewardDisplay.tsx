import { Collection } from '@/data/constants';
import { useContextMenu } from '@/data/providers';
import { Icon } from '@/components';
import { SingleRewardDisplay } from '.';
import { Collapsible } from '@/components/Collapsible';

export const RewardDisplay: RewardDisplay = ({ selectedCollectionData, mode, numberOfRecurringCompletions }) => {
  const { createWikiContextMenu } = useContextMenu();
  return (
    <Collapsible label="Rewards">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full justify-center items-start md:items-center">
        <div
          key={`${selectedCollectionData.name}_experience}`}
          onContextMenu={createWikiContextMenu('Experience')}
          className="flex flex-row md:flex-col gap-x-2 items-center text-orange-100 px-2 cursor-help"
        >
          <Icon
            src={`/assets/collections/Experience.png`}
            alt={'Experience'}
            className="h-6 md:h-8 w-6 md:w-8 object-contain"
          />
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
    </Collapsible>
  );
};

type RewardDisplay = React.FC<{
  selectedCollectionData: Collection;
  mode: 'first' | 'recurring';
  numberOfRecurringCompletions: number;
}>;
