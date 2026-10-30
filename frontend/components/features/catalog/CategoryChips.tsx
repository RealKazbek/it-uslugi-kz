'use client';

export interface Chip {
  slug: string;
  name: string;
}

interface CategoryChipsProps {
  label: string;
  chips: Chip[];
  active: string;
  onSelect: (slug: string) => void;
}

function chipClass(isActive: boolean): string {
  const state = isActive ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-foreground';
  return `min-h-11 rounded-full border px-4 text-sm font-semibold ${state}`;
}

/** Category filter as toggle buttons. The active one carries aria-pressed. */
export function CategoryChips({ label, chips, active, onSelect }: CategoryChipsProps) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <button
          key={chip.slug}
          type="button"
          aria-pressed={active === chip.slug}
          onClick={() => onSelect(chip.slug)}
          className={chipClass(active === chip.slug)}
        >
          {chip.name}
        </button>
      ))}
    </div>
  );
}
