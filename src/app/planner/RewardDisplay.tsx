import { Collection } from "@/data/constants/Collections";
import { useContextMenu } from "@/data/providers/ContextMenuProvider";
import Icon from "../../components/Icon";

export const RewardDisplay = ({
  selectedCollectionData,
  mode,
  numberOfRecurringCompletions,
}: {
  selectedCollectionData: Collection;
  mode: "first" | "recurring";
  numberOfRecurringCompletions: number;
}) => {
  const { createWikiContextMenu } = useContextMenu();
  return (
    <div className="flex flex-row gap-8 w-full justify-center items-center">
      <div
        key={`${selectedCollectionData.name}_experience}`}
        onContextMenu={createWikiContextMenu("Experience")}
        className="flex flex-col items-center text-orange-100 px-2 cursor-help"
      >
        <Icon
          src={`/assets/collections/Experience.png`}
          alt={"Experience"}
          className="h-8 w-8 object-contain"
        />
        <p className="text-base font-semibold">
          {Intl.NumberFormat("en-AU").format(
            Math.round(
              selectedCollectionData
                .artefacts!.map((artefact) => artefact.xp)
                .reduce((a, b) => a + b, 0) *
                (mode === "recurring" ? numberOfRecurringCompletions : 1)
            )
          )}
        </p>
      </div>
      {Object.entries(
        (mode === "first" && selectedCollectionData.reward) ||
          selectedCollectionData.recurringReward
      ).map(([reward, amount]) => {
        return (
          <SingleRewardDisplay
            key={`${selectedCollectionData.name}_${reward}`}
            selectedCollectionData={selectedCollectionData}
            reward={reward}
            amount={amount!}
            numberOfRecurringCompletions={numberOfRecurringCompletions}
          />
        );
      })}
    </div>
  );
};

const SingleRewardDisplay = ({
  selectedCollectionData,
  reward,
  amount,
  numberOfRecurringCompletions = 1,
}: {
  selectedCollectionData: Collection;
  reward: string;
  amount: number;
  numberOfRecurringCompletions?: number;
}) => {
  const { createWikiContextMenu } = useContextMenu();
  return (
    <div
      key={`${selectedCollectionData.name}_${reward}`}
      onContextMenu={createWikiContextMenu(reward)}
      className="flex flex-col items-center text-orange-100 px-2 cursor-help"
    >
      <Icon
        src={`/assets/collections/${reward.replace(/ /g, "_")}.${
          reward === "Tetracompass piece" || reward === "Elder Trove"
            ? "gif"
            : "png"
        }`}
        alt={reward}
        className="h-8 w-8 object-contain"
      />
      <p className="text-base font-semibold">
        {reward}{" "}
        {amount > 1
          ? `x ${Intl.NumberFormat("en-AU").format(
              amount! * numberOfRecurringCompletions
            )}`
          : ""}
      </p>
    </div>
  );
};
