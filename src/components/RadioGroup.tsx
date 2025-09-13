export const RadioGroup = <T extends string>({ label, options, value, setValue }: RadioGroupProps<T>) => {
  return (
    <div className="flex flex-col justify-center w-full items-start">
      <span className="md:hidden text-orange-100 pb-2">{label}</span>

      <div className="grid grid-cols-2 md:flex flex-wrap justify-center gap-4 items-center text-orange-100">
        <span className="hidden md:inline text-orange-100">{label}</span>
        {options.map(({ key, label, labelMobile, disabled = false }) => (
          <RadioOption
            key={`${key}-${label ?? ''}`}
            value={key}
            label={label}
            labelMobile={labelMobile}
            disabled={disabled}
            selectedValue={value}
            setSelectedValue={setValue}
          />
        ))}
      </div>
    </div>
  );
};

const RadioOption = <T extends string>({
  value,
  label,
  labelMobile,
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
    <span className="md:hidden">{labelMobile ?? label ?? value.charAt(0).toUpperCase() + value.slice(1)}</span>
    <span className="hidden md:inline">{label ?? value.charAt(0).toUpperCase() + value.slice(1)}</span>
  </button>
);

type RadioGroupProps<T> = {
  value: T;
  label?: string;
  options: { key: T; label: string; labelMobile?: string; disabled?: boolean }[];
  setValue: (value: T) => void;
};

type RadioOptionProps<T> = {
  value: T;
  label: string;
  labelMobile?: string;
  selectedValue: T;
  setSelectedValue: (sort: T) => void;
  disabled: boolean;
};
