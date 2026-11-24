
<script lang="ts">
    // 1. internal
    import { page } from '$app/state';
    import { resolve } from '$app/paths';
    import { fade } from 'svelte/transition';
   	import { formatDate, DATE_FORMATS } from '#lib/utils/date.js';

    // 3. components
	import Subscribe from '#lib/components/Subscribe.svelte';

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

    // 4. residents (current/past split is done in +layout.server.ts)
    const visibleResidents = $derived(page.data.residents ?? []);
    const showingPast = $derived(page.data.residentsMode === 'past');
</script>

<!-- SNIPPETS -->
{#snippet residents()}
    <header class="sidebar-header justify-end">
        <h3>{showingPast ? 'past' : 'current'} residents</h3>
    </header>
    <div class="sidebar-content">
        <ul>
            {#each visibleResidents as resident (resident.id)}
                <li class="not-last:border-b border-black/10 flex gap-4 justify-between py-0.5">
                    <a href={resolve(resident.id)}>
                        {resident.title}
                    </a>
                    <span class="opacity-35 font-tz-mono">
                        {#if resident.period.start}{formatDate(resident.period.start, DATE_FORMATS.compact)}{/if}{#if resident.period.end} – {formatDate(resident.period.end, DATE_FORMATS.compact)}{/if}
                    </span>
                </li>
            {/each}
        </ul>
    </div>
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
                <li class="text-tz text-purple-500">{newsitems[nth].category}</li>
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
<!-- Markup -->
<!-- headline -->
<div class="font-tz">
    {page.data.layoutData?.headline}
</div>
<!-- sections -->
<div class="flex flex-col justify-end gap-y-lg">
    {#if page.data.layoutData?.news.length }
    <figure class="sidebar-section">
        <header class="sidebar-header flex justify-between">
            {@render updatesNav()}
            <h3><a href="/updates">updates</a></h3>
        </header>
        <div class="sidebar-content">
            {@render updates()}
        </div>
    </figure>
    {/if}
    {#if visibleResidents.length}
    <figure class="sidebar-section">
        {@render residents()}
    </figure>
    {/if}
    <figure class="sidebar-section">
        <header class="sidebar-header justify-end">
            <h3>newsletter</h3>
        </header>
        <Subscribe />
    </figure>
</div>
