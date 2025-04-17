import { useMemo } from 'react';
import { Artefact } from '../data/Artefact';
import { DigsiteNames, Digsites } from '../data/Digsites';

export default function ArtefactCard({ artefact }: { artefact: Artefact }) {
  const digsiteInfo = useMemo(() => {
    const digsite = Digsites[artefact.digsite as DigsiteNames];
    if (!digsite) return null;
    return digsite;
  }, [artefact.Digsite]);
  return (
    <div
      className="w-full bg-gray-800 border-2 border-white rounded-lg px-8 py-4 flex justify-between gap-4"
      style={
        digsiteInfo?.backgroundColor
          ? { backgroundColor: digsiteInfo?.backgroundColor }
          : {}
      }
    >
      <div className="flex flex-row gap-4 justify-center items-center font-bold text-orange-200">
        <a
          className=""
          href={'https://www.runescape.wiki/w/' + artefact.name}
          target="_blank"
          rel="noopener noreferrer"
          title={artefact.name}
        >
          <img
            src={artefact.image}
            alt={artefact.name}
            className="h-8 w-8 object-cover  drop-shadow-gray-200 drop-shadow-xs hover:drop-shadow-sm hover:drop-shadow-white transition-all"
          />
        </a>
        <p className="text-wrap w-40 text-center">{artefact.name}</p>
      </div>
      <div className="flex flex-row justify-center gap-1 items-center">
        <p className="text-2xl text-orange-200 font-bold w-16 text-center px-2">
          {artefact.level}
        </p>
        <a
          href={digsiteInfo?.url}
          target="_blank"
          rel="noopener noreferrer"
          title={artefact.digsite + ' Dig Site'}
        >
          <img
            src={digsiteInfo?.icon}
            alt={artefact.digsite}
            className="transition-all h-10 w-10 object-cover rounded-full drop-shadow-white drop-shadow-xs hover:drop-shadow-sm hover:drop-shadow-white"
          />
        </a>
      </div>
    </div>
  );
}
