<script lang="ts">
    // 1. internal
    import { page } from '$app/state';
    import { filterByFields, getFieldValues } from '#lib/utils/filter/fieldFilter.js';
    import { activityFilter } from '#lib/utils/filter/filterContext.svelte.js';
    import reveal from "#lib/utils/reveal.js"

    // 1. components
    import FilterButtons from '#lib/components/Filter.svelte'
    import CardRow from '#lib/components/CardActivity.svelte'

    // 3. filter
	activityFilter.set() // first set the artist filter
    let selections = activityFilter.get();
    const filtered = $derived(filterByFields(page.data.activities, selections));
    // const hasFilter = $derived(selections.years.length > 0);
    // const years = $derived(getFieldValues(page.data.activities ?? [], 'year').reverse()); // newest first
    const eventtype = $derived(getFieldValues(page.data.activities ?? [], 'eventtype').reverse()); // newest first

</script>
<!-- SNIPPETS -->
{#snippet row(activity)}
    <CardRow item={activity} />
{/snippet}

<!-- MARKUP -->
<article class="w-full min-w-0 grid grid-rows-[auto_minmax(0,1fr)] grid-cols-1 h-full" >
    <!-- FILTER -->
    <fieldset class="m-0 flex justify-center mx-main p-sm gap-x-lg fixed border-t-6 bg-linear-to-r from-transparent via-white to-transparent bottom-0 left-0 right-0 z-200">
        <FilterButtons
            label="Filter by artists"
            allLabel="All"
            options={eventtype}
            single
            bind:selected={selections.eventtype}
        />
    </fieldset>

    <!-- ITEMS -->
    <section class="mt-lg p-main">
        <ul class="lg:w-3/4 gap-x-main mx-auto flex flex-row flex-wrap justify-between">
        {#each [...filtered,...filtered,...filtered] as activity, i (i)}
            <li class="w-2/3 grow-0 js:reveal reveal-bottom" use:reveal={{delay: i * 80, duration: '600ms', opacityDuration: '300ms'}}>
                {@render row(activity)}
            </li>
        {/each}
        </ul>
    </section>


</article>
