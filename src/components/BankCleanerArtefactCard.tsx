import { ArrowPathIcon } from '@heroicons/react/20/solid';
import { Artefact, useArtefacts } from '@/data/providers';
import { Digsites } from '@/data/constants';
import { Icon, PlusMinusInput } from '.';

export function BankCleanerArtefactCard({ artefact }: { artefact: Artefact }) {
  const digsite = Digsites[artefact.digsite];
  const { setArtefact } = useArtefacts();
  return (
    <div
      className="relative border-2 flex flex-col px-3 py-3 gap-2 transition-colors border-orange-100"
      style={{
        backgroundColor: digsite.backgroundColor,
        borderColor: artefact.count.damaged || artefact.count.restored ? digsite.textColor : digsite.borderColor,
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
        <span className="text-[15px] font-medium text-center text-orange-100 text-nowrap">{artefact.name}</span>
      </div>
      <div className="grid grid-cols-[1fr_36px_1fr] gap-1">
        <PlusMinusInput
          label="Damaged"
          value={artefact.count.damaged}
          textColor={digsite.textColor}
          borderColor={digsite.borderColor}
          onChange={(value: number) => {
            setArtefact({
              ...artefact,
              count: {
                ...artefact.count,
                damaged: Math.max(0, value),
              },
            });
          }}
        />
        <div className="flex justify-center items-center">
          <Icon src={artefact.image} alt={artefact.name} className="w-9 h-9 object-contain cursor-help" contextMenu />
        </div>

        <PlusMinusInput
          label="Restored"
          value={artefact.count.restored}
          textColor={digsite.textColor}
          borderColor={digsite.borderColor}
          onChange={(value: number) => {
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
}
