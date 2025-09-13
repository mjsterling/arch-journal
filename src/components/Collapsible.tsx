import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

export function Collapsible({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full bg-gray-950 rounded-lg overflow-hidden transition-colors hover:bg-gray-800 p-3">
      <button
        className={[
          'w-full flex flex-row justify-between items-center text-orange-100 cursor-pointer',
          isOpen ? 'pb-3' : 'pb-0',
        ].join(' ')}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        {isOpen ? (
          <ChevronUpIcon className="h-5 w-5 text-orange-100" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-orange-100" />
        )}
      </button>
      {isOpen && <div className="flex flex-col gap-4 px-3 py-5 bg-gray-950 rounded-lg">{children}</div>}
    </div>
  );
}
