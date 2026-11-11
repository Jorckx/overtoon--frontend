<script lang="ts">
    // 1. internal
    import { page } from '$app/state';
    import { resolve } from '$app/paths';
    let { hide = false} = $props()
    import reveal from '#lib/utils/reveal.js';
    import { fade } from 'svelte/transition';
   	import { formatDate } from '#lib/utils/date.js';


    // 3. state
    const nwsl: number = $derived(page.data.layoutData?.news.length)
    let nth = $state(0)
    function next() {
        if (!nwsl) return;
        nth = (nth + 1) % nwsl;
    }
    function prev() {
        if (!nwsl) return;
        nth = (nth - 1 + nwsl) % nwsl;
    }
</script>
<!-- SNIPPETS -->
{#snippet residents()}
    {const residents = [...page.data.residents, ...page.data.residents]}
    <ul>
        {#each residents as resident, i (i)}
            <li class="not-last:border-b border-lightgrey flex gap-4 justify-between py-[2px]">
                <a href={resolve(resident.id)}>
                    {resident.title}
                </a>
                <span class="opacity-35 font-tz-mono">
                    {formatDate(resident.periods[0].start)}
                </span>
            </li>
        {/each}
    </ul>
{/snippet}
{#snippet updates()}
    <div class="grid">
        {const newsitems = page.data.layoutData?.news}
        {#key nth}
            <!-- prevent brief stacking of elements by positioning in the same grid-cel -->
            <ul
                class="col-start-1 row-start-1"
                in:fade={{ duration: 100, delay: 100 }}
                out:fade={{ duration: 100 }}
            >
                <li class="italic text-tz text-purple-500">{newsitems[nth].category}</li>
                {#if newsitems[nth].highlightSum}
                    <li>{newsitems[nth]?.highlightSum}</li>
                {/if}
                {#if newsitems[nth].highlightSub}
                    <li class="opacity-35">{newsitems[nth].highlightSub}</li>
                {/if}
            </ul>
        {/key}
    </div>
{/snippet}
{#snippet updatesNav()}
    <div class="updates-nav">
        <button onclick={prev} class="cursor-pointer font-bold">&larr;</button>
        <button onclick={next} class="cursor-pointer font-bold">&rarr;</button>
    </div>
{/snippet}

<!-- MARKUP -->
<aside class="sticky w-(--sidebar-w) h-full items-end justify-between flex flex-col top-0 bottom-0 right-0" class:hide>
    <!-- inner -->
    <div use:reveal={{delay: 300, duration: '300ms', opacityDuration: '200ms'}} class="js:reveal reveal-right p-main w-full h-full flex flex-col justify-between gap-y-8">
        <!-- headline -->
        <div class="font-tz">
            {page.data.layoutData?.headline}
        </div>
        <!-- sections -->
        <div class="flex flex-col justify-end gap-y-8">
            <figure class="sidebar-section">
                <header class="sidebar-header flex justify-between">
                    {@render updatesNav()}
                    <h3>updates</h3>
                </header>
                <div class="sidebar-content">
                    {@render updates()}
                </div>
            </figure>
            <figure class="sidebar-section">
                <header class="sidebar-header justify-end">
                    <h3>past residents</h3>
                </header>
                <div class="sidebar-content">
                    {@render residents()}
                </div>
            </figure>
            <figure class="sidebar-section">
                <header class="sidebar-header justify-end">
                    <h3>subscribe</h3>
                </header>
                <div class="sidebar-content">
                    <input type="email" placeholder="Enter your e-mail" class="border-b py-2 border-dotted opacity-50 w-full focus:outline-0 "/>
                </div>
            </figure>
        </div>
    </div>
</aside>
<style>
    @reference "#lib/styles/app.css";
    .sidebar-section{
        @apply border-t-3 grid grid-cols-1 grid-rows-[auto_auto] gap-y-2;
    }
    .sidebar-header{
        @apply flex items-center h-fit leading-tight;
    }
    .sidebar-header > h3{
        @apply font-bold;
    }
    .sidebar-content{
        @apply text-sm font-tz;
    }
    aside::after{
        content: '';
        --tw-duration: 1s;
        @apply bg-gradient fixed w-(--sidebar-w) right-0 top-0 bottom-0 z-[-1];
    }

    aside,
    aside::after {
        transition: opacity 0.5s ease-out;
    }
    aside.hide,
    aside.hide::after {
        opacity: 0;
    }
</style>
