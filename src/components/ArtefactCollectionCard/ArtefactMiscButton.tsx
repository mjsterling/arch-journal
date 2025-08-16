import { ArtefactStates } from "@/data/constants/Artefact";
import { Artefact, useArtefacts } from "@/data/providers/ArtefactProvider";
import { useGlobalState } from "@/data/providers/GlobalStateProvider";
import Icon from "../Icon";

export default function ArtefactButton({
  artefact,
  type,
  typeKey,
  image,
  status,
}: {
  artefact: Artefact;
  type: "mysteries" | "researchers" | "quests" | "misc";
  typeKey: string;
  image: string;
  status: ArtefactStates;
}) {
  const { createContextMenu, wiki } = useGlobalState();
  const { setArtefact } = useArtefacts();
  const handleClick = () => {
    const newArtefact = { ...artefact };
    switch (artefact[type][typeKey]) {
      case ArtefactStates.NotFound:
        newArtefact[type][typeKey] = ArtefactStates.Damaged;
        break;
      case ArtefactStates.Damaged:
        newArtefact[type][typeKey] = ArtefactStates.Restored;
        break;
      case ArtefactStates.Restored:
        newArtefact[type][typeKey] = ArtefactStates.Completed;
        break;
      default:
        break;
    }
    setArtefact(newArtefact);
  };
  const handleDoubleClick = () => {
    const newArtefact = { ...artefact };
    newArtefact[type][typeKey] = ArtefactStates.Completed;
    setArtefact(newArtefact);
  };
  const handleContextMenu = (e: React.MouseEvent) =>
    createContextMenu(e, [
      [
        {
          label: "Set to Not Found",
          callback: () => {
            const newArtefact = { ...artefact };
            newArtefact[type][typeKey] = ArtefactStates.NotFound;
            setArtefact(newArtefact);
          },
        },
        {
          label: "Set to Damaged",
          callback: () => {
            const newArtefact = { ...artefact };
            newArtefact[type][typeKey] = ArtefactStates.Damaged;
            setArtefact(newArtefact);
          },
        },
        {
          label: "Set to Restored",
          callback: () => {
            const newArtefact = { ...artefact };
            newArtefact[type][typeKey] = ArtefactStates.Restored;
            setArtefact(newArtefact);
          },
        },
        {
          label: "Set to Completed",
          callback: () => {
            const newArtefact = { ...artefact };
            newArtefact[type][typeKey] = ArtefactStates.Completed;
            setArtefact(newArtefact);
          },
        },
      ],
      [
        ...(type !== "misc"
          ? [
              {
                label: "[WIKI]" + typeKey,
                callback: () => wiki(typeKey),
              },
            ]
          : []),
      ],
    ]);

  return (
    <button
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      className={[
        "relative flex flex-col gap-1 items-center justify-center",
        "rounded-md h-full",
        "min-h-13 min-w-13 max-h-13 max-w-13",
        "transition-all duration-200 gap-1",
        "border-2 z-0 hover:z-10",
        status === "Not Found"
          ? "bg-gray-200/30 border-gray-300/60 hover:bg-orange-600/85 cursor-pointer"
          : status === "Damaged"
          ? "bg-orange-700/70 border-orange-700 hover:bg-yellow-500/85 cursor-pointer"
          : status === "Restored"
          ? "bg-yellow-600/70 border-yellow-600 hover:bg-green-700/85 cursor-pointer"
          : status === "Completed"
          ? "bg-green-800/60 border-green-800 cursor-help"
          : "",
      ].join(" ")}
      title={typeKey}
    >
      <Icon
        src={image}
        alt={typeKey}
        className="min-h-10 min-w-10 max-h-10 max-w-10 object-contain transition-all"
      />
    </button>
  );
}
