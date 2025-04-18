'use client';
import GlobalStateProvider from './data/GlobalStateProvider';
import Views from './views/Views';

export default function Home() {
  return (
    <div className="h-full min-h-screen w-full bg-gray-600">
      <GlobalStateProvider>
        <Views />
      </GlobalStateProvider>
    </div>
  );
}
