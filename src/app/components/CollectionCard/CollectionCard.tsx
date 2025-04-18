import { useMemo } from 'react';
import { Digsites } from '../../data/Digsites';
import { Artefact, useArtefacts } from '../../data/ArtefactProvider';
import { Collection } from '../../data/Collections';
import { ArtefactStates } from '../../data/Artefact';
import ArtefactButton from './ArtefactButton';

export default function CollectionCard(collection: Collection) {
  const { setArtefact } = useArtefacts();
  const digsiteName = useMemo(() => {
    if (!collection.artefacts?.[0]?.digsite) return null;
    return collection.artefacts[0].digsite;
  }, [collection]);

  const digsiteInfo = useMemo(() => {
    if (!digsiteName) return null;
    const digsite = Digsites[digsiteName];
    return digsite;
  }, [collection]);

  const isComplete = useMemo(() => {
    return collection.artefacts
      ? collection.artefacts.every((artefact) =>
          Object.values(artefact.collections).every(
            (status) => status === 'Completed'
          )
        )
      : false;
  }, [collection]);

  const markAllAsCompleted = () => {
    collection.artefacts?.forEach((artefact: Artefact) => {
      const newArtefact = { ...artefact };
      Object.keys(newArtefact.collections).forEach((collection) => {
        newArtefact.collections[collection] = ArtefactStates.Completed;
      });
      setArtefact(newArtefact);
    });
  };

  return (
    <div
      className="w-full bg-gray-800 border-2 border-white rounded-lg px-8 py-4 grid grid-cols-[3fr_6fr_1fr] justify-between gap-8 cursor-help"
      style={
        digsiteInfo?.backgroundColor
          ? { backgroundColor: digsiteInfo?.backgroundColor }
          : {}
      }
      id={collection.name.replace(/\W/g, '')}
    >
      <div className="flex flex-row gap-4 justify-start items-center font-bold text-orange-200">
        <img
          src={collection.image}
          alt={collection.collector}
          className="w-8 h-8 object-contain"
        />
        <p className="text-center">{collection.name}</p>
      </div>
      <div className="flex flex-row gap-2 justify-start">
        {collection.artefacts &&
          collection.artefacts.map((artefact: Artefact) => {
            console.log(artefact);
            return (
              <ArtefactButton
                artefact={artefact}
                key={artefact.name}
                setArtefact={function (artefact: Artefact): void {
                  throw new Error('Function not implemented.');
                }}
                collection={collection.name}
                collector={collection.collector}
                image={artefact.image}
                status={artefact.collections[collection.name]}
              />
            );
          })}
      </div>
      <div className="flex flex-row justify-center gap-1 items-center">
        <p className="text-2xl text-orange-200 font-bold w-12 text-center px-2">
          {collection.levelToComplete}
        </p>
        <a
          href={digsiteInfo?.url}
          target="_blank"
          rel="noopener noreferrer"
          title={digsiteName + ' Dig Site'}
        >
          <img
            src={digsiteInfo?.icon}
            alt={digsiteName ?? ''}
            className="transition-all h-10 w-10 object-cover rounded-full"
          />
        </a>
      </div>
    </div>
  );
}
