import { JSX } from 'react';

export const RadioGroup = <T extends string>({ label, options, value, setValue }: RadioGroupProps<T>) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 items-center text-orange-100">
      {label}
      {options.map(({ key, label, disabled = false }) => (
        <RadioOption
          key={`${key}-${label ?? ''}`}
          value={key}
          label={label}
          disabled={disabled}
          selectedValue={value}
          setSelectedValue={setValue}
        />
      ))}
    </div>
  );
};

const RadioOption = <T extends string>({
  value,
  label,
  selectedValue,
  setSelectedValue,
  disabled,
}: RadioOptionProps<T>) => (
  <button
    value={value === selectedValue ? 'checked' : 'unchecked'}
    className={[
      'flex gap-2 items-center text-orange-100',
      disabled ? 'opacity-50 cursor-default' : 'cursor-pointer',
    ].join(' ')}
    onClick={() => setSelectedValue(value)}
    disabled={disabled}
  >
    <div
      className="border-orange-100 bg-transparent border  rounded-sm text-orange-100
      transition-colors ease-in-out h-6 w-6 flex justify-center items-center"
    >
      {value === selectedValue ? <div className="w-4.5 h-4.5 bg-orange-100 rounded-sm" /> : null}
    </div>
    {label ?? value.charAt(0).toUpperCase() + value.slice(1)}
  </button>
);

type RadioGroupProps<T> = {
  value: T;
  label?: string;
  options: { key: T; label: string; disabled?: boolean }[];
  setValue: (value: T) => void;
};

type RadioOptionProps<T> = {
  value: T;
  label: string;
  selectedValue: T;
  setSelectedValue: (sort: T) => void;
  disabled: boolean;
};
