'use client';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

export const ImportDataModal = ({
  open,
  setOpen,
  importData,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  importData: (data: string) => void;
}) => {
  const [data, setData] = useState('');
  if (!open) return null;
  return (
    <div className="fixed w-screen h-screen left-0 p-8 top-0 bg-black/50">
      <div className="fixed w-full h-full left-0 top-0 z-10 cursor-pointer" onClick={() => setOpen(false)} />
      <div className="flex items-center justify-center h-full z-20">
        <div className="bg-gray-900 p-4 rounded shadow-md text-orange-100">
          <div className="flex w-full justify-between">
            <h2 className="text-lg font-semibold mb-2">Import Data</h2>
            <button onClick={() => setOpen(false)} className="text-orange-100 cursor-pointer">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <p className="mb-4">Paste your save data below to import.</p>
          <textarea className="mb-4 w-full h-32 border rounded p-2" onChange={(e) => setData(e.target.value)} />
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white border-orange-100 cursor-pointer border px-4 py-2 rounded"
              onClick={() => {
                importData(data);
              }}
            >
              Import
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
