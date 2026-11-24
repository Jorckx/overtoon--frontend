type FieldValue = string | number | (string | number)[] | undefined;

const valueSeparator = ',';

export const parseFieldValues = (value: FieldValue): string[] => {
  const parts = Array.isArray(value) ? value : String(value ?? '').split(valueSeparator);
  return parts.map((part) => String(part).trim()).filter(Boolean);
};

/** Unique, sorted values found in `field` across all items. */
export const getFieldValues = <K extends string, T extends { [P in K]?: FieldValue }>(
  items: T[],
  field: K
): string[] =>
  [...new Set(items.flatMap((item) => parseFieldValues(item[field])))].sort((a, b) =>
    a.localeCompare(b)
  );

/**
 * Keeps items matching every field selection (AND across fields) where an item
 * has at least one of the selected values (OR within a field). Empty selections are ignored.
 */
export const filterByFields = <K extends string, T extends { [P in K]?: FieldValue }>(
  items: T[],
  selections: Record<K, string[]> | undefined
): T[] => {
  const active = Object.entries<string[]>(selections ?? {}).filter(([, selected]) => selected.length > 0);
  return items.filter((item) =>
    active.every(([field, selected]) =>
      parseFieldValues(item[field as K]).some((value) => selected.includes(value))
    )
  );
};
