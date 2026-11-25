<script lang="ts">
    // 1. internal
    import { page } from '$app/state';
	import reveal from "#lib/utils/reveal.js"
    import { filterByFields, getFieldValues } from '#lib/utils/filter/fieldFilter.js';
    import { artistFilter } from '#lib/utils/filter/filterContext.svelte.js';
	import { cardParams } from '#lib/utils/SwiperParams.js'

    // 1. components
	import CardRow from '#lib/components/CardArtistRow.svelte';
	import CardArtist from '#lib/components/CardArtist.svelte';
	import Swiper from '#lib/components/Swiper.svelte';
    import FilterButtons from '#lib/components/Filter.svelte'
	// import Intro from '#lib/components/Intro.svelte';
	// import Sidebar from '#lib/components/Sidebar/index.svelte';

	// 4. filter
	artistFilter.set() // first set the artist filter
    let selections = artistFilter.get();
    const filtered = $derived(filterByFields(page.data.artists, selections));
    const hasFilter = $derived(selections.years.length > 0);
    const years = $derived(getFieldValues(page.data.artists ?? [], 'years').reverse()); // newest first

    // 5. residents: current/past split is done in +layout.server.ts We use it here for the filter 'all' label
    const showingPast = $derived(page.data.residentsMode === 'past');
</script>

<!-- SNIPPETS -->
{#snippet card(artist)}
    <CardArtist item={artist} />
{/snippet}
{#snippet row(artist)}
    <CardRow item={artist} />
{/snippet}

<!-- MARKUP -->
<!-- <div class="grid grid-rows-1 h-fit lg:grid-cols-(--interface-cols)"> -->
<article class="w-full min-w-0 grid grid-rows-[auto_minmax(0,1fr)] grid-cols-1 h-full" >
    <!-- filter -->
    <fieldset class="m-0 flex justify-between mx-main p-sm gap-x-lg fixed border-t-3 bottom-0 left-0 right-0 z-200">
        <span class="font-marfa text-base font-bold">Residents by year</span>
        <FilterButtons
            label="Filter by residency year"
            allLabel={showingPast ? 'latest' : 'current'}
            hideAll
            options={years}
            single
            bind:selected={selections.years}
        />
    </fieldset>

    {#if !hasFilter}
        <!-- current -->
        <section class="w-full h-full mt-lg">
            <!-- filtered residents are defined in the root layout load -->
            <Swiper variant="cards" data={page.data.randomArtists}  height="100%" slide={card} params={cardParams} />
        </section>
    {:else}
        <!-- filtered grid -->
        <section class="artists-grid min-h-[200vh] mt-lg">
            <ul class="w-3/4 mx-auto flex flex-col flex-wrap justify-start">
            {#each filtered as artist, i (i)}
                <li class="grow-0 js:reveal reveal-bottom" use:reveal={{delay: i * 80, duration: '600ms', opacityDuration: '300ms'}}>
                    {@render row(artist)}
                </li>
            {/each}
            </ul>
        </section>
    {/if}
</article>
