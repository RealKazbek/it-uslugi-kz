/** One selectable row of a combobox. `value` is what the form submits. */
export interface ComboboxOption {
  value: string;
  label: string;
}

/** A block of rows. Pinned groups always stay visible and are never counted as search results. */
export interface ComboboxGroup {
  label?: string;
  pinned?: boolean;
  options: ComboboxOption[];
}
