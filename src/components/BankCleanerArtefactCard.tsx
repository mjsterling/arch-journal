import { ArrowPathIcon, MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Artefact, useArtefacts } from "@/data/providers/ArtefactProvider";
import { Digsites } from "@/data/constants/Digsites";
import Icon from "./Icon";
import { PlusMinusInput } from "./PlusMinusInput";

export const BankCleanerArtefactCard = ({
  artefact,
}: {
  artefact: Artefact;
}) => {
  const digsite = Digsites[artefact.digsite];
  const { setArtefact } = useArtefacts();
  return (
    <div
      className="relative border-2 flex flex-col px-3 py-3 gap-2 transition-colors border-orange-100"
      style={{
        backgroundColor: digsite.backgroundColor,
        borderColor:
          artefact.count.damaged || artefact.count.restored
            ? digsite.textColor
            : digsite.borderColor,
      }}
    >
      {artefact.count.damaged > 0 || artefact.count.restored > 0 ? (
        <button className="absolute right-3 top-3 hover:scale-110 transition-all">
          <ArrowPathIcon
            className="w-5 h-5 cursor-pointer"
            style={{ color: digsite.textColor }}
            onClick={() => {
              setArtefact({
                ...artefact,
                count: {
                  damaged: 0,
                  restored: 0,
                },
              });
            }}
            title="Reset"
          />
        </button>
      ) : null}
      <div className="flex flex-col items-center gap-3">
        <span className="text-[15px] font-medium text-center text-orange-100 text-nowrap">
          {artefact.name}
        </span>
        <Icon
          src={artefact.image}
          alt={artefact.name}
          className="w-10 h-10 object-contain cursor-help"
          contextMenu
        />
      </div>
      <div className="grid grid-cols-2">
        <PlusMinusInput
          label="Damaged"
          value={artefact.count.damaged}
          textColor={digsite.textColor}
          borderColor={digsite.borderColor}
          onChange={(value) => {
            setArtefact({
              ...artefact,
              count: {
                ...artefact.count,
                damaged: Math.max(0, value),
              },
            });
          }}
        />
        <PlusMinusInput
          label="Restored"
          value={artefact.count.restored}
          textColor={digsite.textColor}
          borderColor={digsite.borderColor}
          onChange={(value) => {
            setArtefact({
              ...artefact,
              count: {
                ...artefact.count,
                restored: Math.max(0, value),
              },
            });
          }}
        />
      </div>
    </div>
  );
};
