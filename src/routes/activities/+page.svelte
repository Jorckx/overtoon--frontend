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
<article class="w-full min-w-0 grid grid-rows-[auto_minmax(0,1fr)] grid-cols-1 h-full mb-xl" >
    <!-- FILTER -->
    <fieldset class="m-0 flex justify-center mx-main gap-x-lg fixed border-t-2 backdrop-blur-md bg-linear-to-r from-(--thm) via-white/80 to-(--thm) bottom-0 left-0 right-0 z-200">
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
        <ul class="lg:w-full gap-x-main mx-auto flex flex-row flex-wrap justify-between">
        {#each [...filtered,...filtered,...filtered] as activity, i (i)}
            <li class=" js:reveal" use:reveal={{delay: 100, duration: '0ms', opacityDuration: '600ms', once: false}}>
                {@render row(activity)}
            </li>
        {/each}
        </ul>
    </section>


</article>
