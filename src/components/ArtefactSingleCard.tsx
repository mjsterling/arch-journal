import { Artefact } from '@/data/providers';

export function ArtefactSingleCard({ artefact }: { artefact: Artefact }) {
  return (
    <div className="w-full h-24 flex flex-row gap-4 justify-between items-center">
      <img src={artefact.image} alt={artefact.name} className="h-10 w-10 object-cover rounded-full" />
    </div>
  );
}
