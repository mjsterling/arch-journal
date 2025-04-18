import { useArtefacts } from '../data/ArtefactProvider';
import ArtefactCard from '../components/ArtefactCard/ArtefactCard';
import { useGlobalState } from '../data/GlobalStateProvider';

export default function Artefacts() {
  const { artefacts } = useArtefacts();
  const { showCompleted, setShowCompleted } = useGlobalState();
  return (
    <div className="w-full h-full flex flex-col gap-4 px-16 py-16">
      {artefacts?.map((artefact) => (
        <ArtefactCard key={artefact.name} artefact={artefact} />
      ))}
    </div>
  );
}
