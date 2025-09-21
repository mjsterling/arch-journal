import { CheckIcon } from '@heroicons/react/16/solid';

export const Checkbox = ({
  label,
  checked,
  toggle,
  className,
}: {
  label: string;
  checked: boolean;
  toggle: () => void;
  className?: string;
}) => (
  <div className={`flex gap-2 items-center text-orange-100 ${className}`}>
    <button
      value={checked ? 'checked' : 'unchecked'}
      className={[
        'rounded-md border border-orange-100 cursor-pointer',
        'bg-transparent text-orange-100 text-nowrap!',
        'transition-colors ease-in-out min-h-6 max-h-6 min-w-6 max-w-6 flex justify-center items-center',
      ].join(' ')}
      onClick={toggle}
    >
      {checked ? <CheckIcon className="min-w-5 max-w-5 min-h-5 max-h-5 text-orange-100" /> : null}
    </button>
    <span className="text-nowrap!">{label}</span>
  </div>
);
