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
    import FilterSelect from '#lib/components/FilterSelect.svelte'
	// import Intro from '#lib/components/Intro.svelte';
	// import Sidebar from '#lib/components/Sidebar/index.svelte';

	// 4. filter
	artistFilter.set() // first set the artist filter
    let selections = artistFilter.get();
    const filtered = $derived(filterByFields(page.data.artists, selections));
    const hasFilter = $derived(selections.years.length > 0);
    const years = $derived(getFieldValues(page.data.artists ?? [], 'years').reverse()); // newest first
</script>

<!-- SNIPPETS -->
{#snippet card(artist)}
    <CardArtist item={artist}  />
{/snippet}
{#snippet row(artist)}
    <CardRow item={artist} />
{/snippet}

<!-- MARKUP -->

<article class="w-full min-w-0 grid grid-rows-[auto_minmax(0,1fr)] grid-cols-1 h-full p-main lg:p-0" >
    <!-- filter -->
    <fieldset class="m-0 flex justify-center mx-main fixed border-t-2 bg-linear-to-r from-(--thm) via-white to-(--thm) bottom-0 left-0 right-0 z-200">
        <FilterSelect
            label="By year"
            allLabel="selection"
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
            <ul class="lg:w-full w-full lg:px-main flex flex-col flex-wrap justify-start">
            {#each filtered as artist, i (i)}
                <li class="grow-0 js:reveal reveal-bottom" use:reveal={{delay: 80, duration: '600ms', opacityDuration: '300ms'}}>
                    {@render row(artist)}
                </li>
            {/each}
            </ul>
        </section>
    {/if}
</article>
