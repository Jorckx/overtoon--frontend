<script lang="ts">
    // 1. internal
    import { page } from '$app/state';
	import CardArtist from '#lib/components/CardArtistRound.svelte';
	import reveal from "#lib/utils/reveal.js"
    import { filterByFields, getFieldValues } from '#lib/utils/filter/fieldFilter.js';
    import { artistFilter } from '#lib/utils/filter/filterContext.svelte.js';
	import {cardParams} from '#lib/utils/SwiperParams.js'

    // 1. components
	// import Intro from '#lib/components/Intro.svelte';
	import Swiper from '#lib/components/Swiper.svelte';
    import FilterButtons from '#lib/components/Filter.svelte'
	import Sidebar from '#lib/components/Sidebar/index.svelte';

	// 4. filter
	artistFilter.set() // first set the artist filter
    let selections = artistFilter.get();
    const filtered = $derived(filterByFields(page.data.artists, selections));
    const years = $derived(getFieldValues(page.data.artists ?? [], 'years').reverse()); // newest first
</script>

<!-- SNIPPETS -->
{#snippet sidebarContent()}
    <div>
    <header class="sidebar-header justify-end mb-main">
        <h3>filter artists by year</h3>
    </header>
    <FilterButtons
        label="Filter by residency year"
        allLabel="All"
        options={years}
        single
        bind:selected={selections.years}
    />
    </div>
{/snippet}
{#snippet card(artist)}
    <CardArtist item={artist} ratio="1" />
{/snippet}

<!-- MARKUP -->
<article class="grid grid-rows-1 h-fit lg:grid-cols-(--interface-cols)">
<!-- <article class="w-full min-w-0 grid grid-rows-[auto_minmax(0,1fr)] grid-cols-1 h-full" > -->
    <!-- <div class="sticky top-0 z-200 backdrop-blur-sm">
        <FilterButtons
            label="Filter by residency year"
            allLabel="All artists"
            options={years}
            single
            bind:selected={selections.years}
        />
    </div> -->
    <!-- <section class="w-full h-full js:reveal reveal-zoom" use:reveal={{delay:20, duration: '300ms', opacityDuration: '400ms'}}>
        <Swiper variant="cards" data={filtered}  height="100%" slide={card} params={cardParams} />
    </section> -->

    <!-- <div class="text-center border-b text-bold font-tz mb-main">2026</div> -->
    <section>
        <ul class="w-[calc(100dvw-var(--sidebar-w))] mr-auto flex flex-row flex-wrap justify-start">
        {#each [...filtered, ...filtered,...filtered] as artist, i (i)}
            <li class="w-1/3 grow js:reveal reveal-bottom" use:reveal={{delay: (i % 5) * 80, duration: '600ms', opacityDuration: '200ms'}}>
                {@render card(artist)}
            </li>
        {/each}
        </ul>
    </section>
<Sidebar content={sidebarContent} />
</article>
