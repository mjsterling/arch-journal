import { useMemo } from 'react';
import { DigsiteNames, Digsites } from '../../data/Digsites';
import { Collections } from '../../data/Collections';
import { Artefact, useArtefacts } from '../../data/ArtefactProvider';
import CollectorButton from './CollectorButton';
import { useGlobalState } from '@/app/data/GlobalStateProvider';
import { ArtefactStates } from '@/app/data/Artefact';

export default function ArtefactCard(props: { artefact: Artefact }) {
  const { artefact } = props;
  const { setArtefact } = useArtefacts();
  const { createContextMenu, wiki, showCompleted } = useGlobalState();
  const digsiteInfo = useMemo(() => {
    const digsite = Digsites[artefact.digsite as DigsiteNames];
    if (!digsite) return null;
    return digsite;
  }, [artefact.digsite]);

  const isComplete = useMemo(() => {
    return artefact.collections
      ? Object.values(artefact.collections).every(
          (status) => status === 'Completed'
        )
      : false;
  }, [artefact]);

  const markAllAsCompleted = () => {
    const newArtefact = { ...artefact };
    Object.keys(newArtefact.collections).forEach((collection) => {
      newArtefact.collections[collection] = ArtefactStates.Completed;
    });
    setArtefact(newArtefact);
  };

  if (showCompleted === false && isComplete) return null;

  return (
    <div
      className={[
        'w-full bg-gray-800 border-2  rounded-lg px-8 py-4 flex justify-between gap-4 cursor-help',
        isComplete ? 'border-green-500 opacity-50' : 'border-white',
      ].join(' ')}
      style={
        digsiteInfo?.backgroundColor
          ? { backgroundColor: digsiteInfo?.backgroundColor }
          : {}
      }
      id={artefact.name.replace(/\W/g, '')}
      onContextMenu={(e) =>
        createContextMenu(e, [
          [{ label: 'Mark all as Completed', callback: markAllAsCompleted }],
          [
            {
              label: 'Wiki: ' + artefact.name,
              callback: () => wiki(artefact.name),
            },
          ],
        ])
      }
    >
      <div className="flex flex-row gap-4 justify-center items-center font-bold text-orange-200">
        <img
          src={artefact.image}
          alt={artefact.name}
          className="h-8 w-8 object-contain transition-all"
        />
        <p className="text-wrap w-40 text-center">{artefact.name}</p>
      </div>
      <div className="flex flex-row gap-3 items-center">
        {artefact.collections &&
          Object.entries(artefact.collections).map(([name, status]) => {
            const { collector, image } = Collections.find(
              (collection) => collection.name === name
            ) ?? { collector: '', image: '', shortName: '' };
            return (
              <CollectorButton
                key={`collectorbutton_${artefact.name}__${name}`}
                artefact={artefact}
                setArtefact={setArtefact}
                collection={name}
                collector={collector}
                image={image}
                status={status}
              />
            );
          })}
      </div>
      <div className="flex flex-row justify-center gap-1 items-center">
        <p className="text-2xl text-orange-200 font-bold w-16 text-center px-2">
          {artefact.level}
        </p>

        <img
          src={digsiteInfo?.icon}
          alt={artefact.digsite}
          className="transition-all h-10 w-10 object-cover rounded-full cursor-help"
          onContextMenu={(e) =>
            createContextMenu(e, [
              [
                {
                  label: 'Wiki: ' + artefact.digsite + ' Dig Site',
                  callback: () => wiki(artefact.digsite + ' Dig Site'),
                },
              ],
            ])
          }
        />
      </div>
    </div>
  );
}
