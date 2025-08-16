import { Icon } from '@/components';
import { type Collection } from '@/data/constants';
import { useContextMenu } from '@/data/providers';

export const SingleRewardDisplay: SingleRewardDisplay = ({
  selectedCollectionData,
  reward,
  amount,
  numberOfRecurringCompletions = 1,
}) => {
  const { createWikiContextMenu } = useContextMenu();
  return (
    <div
      key={`${selectedCollectionData.name}_${reward}`}
      onContextMenu={createWikiContextMenu(reward)}
      className="flex flex-col items-center text-orange-100 px-2 cursor-help"
    >
      <Icon
        src={`/assets/collections/${reward.replace(/ /g, '_')}.${
          reward === 'Tetracompass piece' || reward === 'Elder Trove' ? 'gif' : 'png'
        }`}
        alt={reward}
        className="h-8 w-8 object-contain"
      />
      <p className="text-base font-semibold">
        {reward} {amount > 1 ? `x ${Intl.NumberFormat('en-AU').format(amount! * numberOfRecurringCompletions)}` : ''}
      </p>
    </div>
  );
};

type SingleRewardDisplay = React.FC<{
  selectedCollectionData: Collection;
  reward: string;
  amount: number;
  numberOfRecurringCompletions?: number;
}>;
