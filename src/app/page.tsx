'use client';
import Header from './components/Header';
import Artefacts from './views/Artefacts';
import Collections from './views/Collections';
import Materials from './views/Materials';

import GlobalStateProvider, {
  useGlobalState,
  Screens,
} from './data/GlobalStateProvider';
import ArtefactProvider from './data/ArtefactProvider';

export default function Home() {
  const { screen } = useGlobalState();
  return (
    <GlobalStateProvider>
      <div className="h-full min-h-screen w-full bg-gray-950">
        <Header />
        <ArtefactProvider>
          <div className="h-full w-full">
            {screen === Screens.Artefacts && <Artefacts />}
            {screen === Screens.Collections && <Collections />}
            {screen === Screens.Materials && <Materials />}
          </div>
        </ArtefactProvider>
      </div>
    </GlobalStateProvider>
  );
}
