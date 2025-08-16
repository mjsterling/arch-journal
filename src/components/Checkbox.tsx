import { CheckIcon } from '@heroicons/react/16/solid';

export const Checkbox = ({ label, checked, toggle }: { label: string; checked: boolean; toggle: () => void }) => (
  <div className="flex gap-2 items-center text-orange-100">
    <button
      value={checked ? 'checked' : 'unchecked'}
      className={[
        'rounded-md border border-orange-100 cursor-pointer',
        'bg-transparent text-orange-100',
        'transition-colors ease-in-out h-6 w-6 flex justify-center items-center',
      ].join(' ')}
      onClick={toggle}
    >
      {checked ? <CheckIcon className="w-5 h-5 text-orange-100" /> : null}
    </button>
    {label}
  </div>
);
