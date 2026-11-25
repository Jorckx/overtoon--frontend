import { getContext, setContext } from 'svelte';

export const createFilterContext = <K extends string>(name: string, fields: readonly K[]) => {
  const key = Symbol(name);

  return {
    /** Call once, in the layout that owns the filter. */
    set() {
      const selections = $state(
        Object.fromEntries(fields.map((field) => [field, [] as string[]]))
      ) as Record<K, string[]>;
      setContext(key, selections);
      return selections;
    },
    /** Call in any descendant (page or component). */
    get() {
      return getContext<Record<K, string[]>>(key);
    }
  };
};

// one definition per filter set
export const artistFilter = createFilterContext('artists', ['years']);
export const activityFilter = createFilterContext('projects', ['year', 'eventtype']);
