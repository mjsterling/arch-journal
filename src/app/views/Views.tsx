import Header from '../components/Header';
import ArtefactProvider from '../data/ArtefactProvider';
import { Screens, useGlobalState } from '../data/GlobalStateProvider';
import Artefacts from './Artefacts';
import Collections from './Collections';
import MaterialStorage from './MaterialStorage';
import Planner from './Planner';

export default function Views() {
  const { screen } = useGlobalState();
  return (
    <ArtefactProvider>
      <Header />
      <div className="h-full w-full p-6 md:px-12 lg:px-16">
        {screen === Screens.Artefacts && <Artefacts />}
        {screen === Screens.Collections && <Collections />}
        {screen === Screens.MaterialStorage && <MaterialStorage />}
        {screen === Screens.Planner && <Planner />}
      </div>
    </ArtefactProvider>
  );
}
