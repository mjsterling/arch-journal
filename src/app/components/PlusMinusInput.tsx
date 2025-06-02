import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';

export const PlusMinusInput = ({
  label,
  value,
  onChange,
  textColor,
  borderColor,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  textColor: string;
  borderColor: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xs font-medium" style={{ color: textColor }}>
        {label}
      </span>
      <div className="flex items-center gap-1">
        <button
          tabIndex={-1}
          className="p-1 cursor-pointer hover:scale-150 transition-all"
          style={{ color: value === 0 ? borderColor : textColor }}
          onClick={() => onChange(value - 1)}
        >
          <MinusIcon className="w-4 h-4" />
        </button>
        <input
          className="text-white border-b-2 w-8 font-semibold transition-colors text-center text-lg"
          style={{
            borderColor,
            color: value ? undefined : textColor,
          }}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value || '0'))}
        />

        <button
          tabIndex={-1}
          className="p-1 cursor-pointer hover:scale-130 transition-all"
          style={{ color: textColor }}
          onClick={() => onChange(value + 1)}
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
