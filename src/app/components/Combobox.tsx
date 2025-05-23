import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { useRef, useState } from 'react';

export const Combobox = ({
  placeholder,
  onSelect,
  options,
  className = '',
}: {
  placeholder: string;
  onSelect: (option: { value: string; displayValue: string }) => void;
  options: { value: string; displayValue: string }[];
  className?: string;
}) => {
  const [displayedOptions, setDisplayedOptions] =
    useState<{ value: string; displayValue: string }[]>(options);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const stripSpaces = (str: string) => str.replace(/(^\s+)|(\s+$)/g, '');

  const [highlightedOption, setHighlightedOption] = useState(-1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value) {
      setDisplayedOptions(
        options.filter(
          (option) =>
            option.value
              .toLowerCase()
              .includes(stripSpaces(e.target.value).toLowerCase()) ||
            option.displayValue
              .toLowerCase()
              .includes(stripSpaces(e.target.value).toLowerCase())
        )
      );
    } else {
      setDisplayedOptions([]);
    }
  };

  const clearInput = () => {
    console.log('clear input');
    setInputValue('');
    setDisplayedOptions(options);
    setIsOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Down':
      case 'ArrowDown':
        setHighlightedOption((prev) =>
          Math.min(prev + 1, displayedOptions.length - 1)
        );
        scrollToHighlightedOption();
        break;
      case 'Up':
      case 'ArrowUp':
        setHighlightedOption((prev) => Math.max(0, prev - 1));
        scrollToHighlightedOption();
        break;
      case 'Enter':
        if (highlightedOption >= 0) {
          onSelect(displayedOptions[highlightedOption]);
          setHighlightedOption(-1);
          clearInput();
        }
        break;
      default:
        break;
    }
  };

  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const scrollToHighlightedOption = () => {
    if (optionRefs.current[highlightedOption]) {
      optionRefs.current[highlightedOption]?.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <div className={['w-full relative', className].join(' ')}>
      <div className="flex flex-row gap-2 border border-orange-100 rounded-md p-2">
        <MagnifyingGlassIcon className="w-6 h-6 text-orange-100" />
        <input
          type="text"
          className="w-full text-orange-100 !outline-none"
          placeholder={placeholder}
          value={inputValue}
          onFocus={() => setIsOpen(true)}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        {inputValue.length ? (
          <button onClick={clearInput} className="cursor-pointer">
            <XMarkIcon className="w-6 h-6 text-orange-100" />
          </button>
        ) : null}
      </div>

      {isOpen && options.length > 0 && (
        <ul
          className={[
            'absolute bg-gray-950 rounded mt-1 w-full',
            isOpen ? 'border border-orange-100' : 'border-none',
            'max-h-120 overflow-y-auto',
          ].join(' ')}
        >
          {displayedOptions.map((option, index) => (
            <li
              ref={(el) => {
                optionRefs.current[index] = el;
              }}
              key={option.value}
              onClick={() => onSelect(option)}
              className={[
                'p-2 cursor-pointer',
                index === highlightedOption ? 'bg-[#fff1]' : '',
              ].join(' ')}
              onMouseOver={() => setHighlightedOption(index)}
            >
              {option.displayValue}
            </li>
          ))}
          {!displayedOptions.length && inputValue && (
            <li className="p-2 text-gray-500">No collections found</li>
          )}
        </ul>
      )}
    </div>
  );
};
