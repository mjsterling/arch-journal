import Header from '../components/Header';
import ArtefactProvider from '../data/ArtefactProvider';
import { Screens, useGlobalState } from '../data/GlobalStateProvider';
import Artefacts from './Artefacts';
import Collections from './Collections';
import Materials from './Materials';

export default function Views() {
  const { screen } = useGlobalState();
  return (
    <ArtefactProvider>
      <Header />
      <div className="h-full w-full">
        {screen === Screens.Artefacts && <Artefacts />}
        {screen === Screens.Collections && <Collections />}
        {screen === Screens.Materials && <Materials />}
      </div>
    </ArtefactProvider>
  );
}
