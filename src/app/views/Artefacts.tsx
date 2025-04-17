import { useArtefacts } from '../data/ArtefactProvider';
import ArtefactCard from '../components/ArtefactCard';

export default function Artefacts() {
  const artefacts = useArtefacts();
  return (
    <div className="w-full h-full flex flex-col gap-6 px-16 py-16">
      {artefacts?.map((artefact) => (
        <ArtefactCard key={artefact.name} artefact={artefact} />
      ))}
    </div>
  );
}
