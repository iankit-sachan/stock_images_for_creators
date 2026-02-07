import { SORT_OPTIONS } from '../../lib/constants';
import type { SortOption } from '../../types';

interface SortBarProps {
  active: SortOption;
  onChange: (sort: SortOption) => void;
}

export default function SortBar({ active, onChange }: SortBarProps) {
  return (
    <div className="flex items-center gap-2">
      {SORT_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value as SortOption)}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
            active === option.value
              ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
