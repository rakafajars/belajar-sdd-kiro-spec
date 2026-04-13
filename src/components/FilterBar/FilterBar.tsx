import { FilterType } from '../../types';

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'Semua', value: 'all' },
  { label: 'Belum Selesai', value: 'active' },
  { label: 'Selesai', value: 'completed' },
];

export function FilterBar({ currentFilter, onFilterChange }: FilterBarProps) {
  return (
    <div role="group" aria-label="Filter tugas" className="flex gap-2">
      {FILTERS.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          aria-pressed={currentFilter === value}
          data-active={currentFilter === value}
          className={currentFilter === value
              ? 'flex-1 px-3 py-2 text-sm font-black uppercase border-4 border-black bg-pink-400 text-black shadow-none translate-x-0.5 translate-y-0.5 transition-all'
              : 'flex-1 px-3 py-2 text-sm font-black uppercase border-4 border-black bg-white text-black shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all'
            }
        >
          {label}
        </button>
      ))}
    </div>
  );
}
