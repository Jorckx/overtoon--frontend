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
    <CardArtist item={artist} />
{/snippet}

<!-- MARKUP -->
<!-- <div class="grid grid-rows-1 h-fit lg:grid-cols-(--interface-cols)"> -->
<article class="w-full min-w-0 grid grid-rows-[auto_minmax(0,1fr)] grid-cols-1 h-full" >
    <div class="bottom-0 w-full z-200 backdrop-blur-sm">
        <FilterButtons
            label="Filter by residency year"
            allLabel="Current"
            options={years}
            single
            bind:selected={selections.years}
        />
    </div>
    <section class="w-full h-full js:reveal reveal-zoom" use:reveal={{delay:20, duration: '300ms', opacityDuration: '400ms'}}>
        <Swiper variant="cards" data={filtered}  height="calc(100vh - var(--hh))" slide={card} params={cardParams} />
    </section>

    <!-- <div class="text-center border-b text-bold font-tz mb-main">2026</div> -->
    <!-- <section class="artists">
        <ul class="w-3/4 mx-auto flex flex-row flex-wrap justify-start">
        {#each [...filtered, ...filtered,...filtered] as artist, i (i)}
            <li class="w-1/4 grow-0 js:reveal revael-bottom" use:reveal={{delay: (i % 5) * 80, duration: '600ms', opacityDuration: '200ms'}}>
                {@render card(artist)}
            </li>
        {/each}
        </ul>
    </section> -->
</article>
<!-- <Sidebar content={sidebarContent} /> -->

<style>
    @reference "#lib/styles/app.css";

    .artists {
        /* fade the last 4rem to transparent */
          -webkit-mask-image: linear-gradient(to bottom, #000 calc(100% - 4rem), transparent);
                  mask-image: linear-gradient(to bottom, #000 calc(100% - 4rem), transparent);
    }
</style>
