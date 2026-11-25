
<script lang="ts">
    // 1. internal
    import { page } from '$app/state';
    import { resolve } from '$app/paths';
   	// import { formatDate, DATE_FORMATS } from '#lib/utils/formatDate.js';
	import { formatPeriod } from '#lib/utils/formatPeriod.js';
	import { localizeHref } from '#lib/paraglide/runtime.js';

    // 2. state
    let activeTab = $state<string>('text');
</script>

<!-- SNIPPETS -->
{#snippet activities()}
    <header class="sidebar-header justify-end">
        <h3>projects</h3>
    </header>
    <div class="sidebar-content">
        <ul>
            {#each page.data.pageData.activities as activity (activity.id)}
                <li class="not-last:border-b border-black/10 grid grid-cols-[auto_1fr] gap-4 justify-between py-0.5">
                    <a href={resolve(activity.id)}>
                        {activity.title}
                    </a>
                    <span class="opacity-35 font-marfa font-bold text-end">
                        {formatPeriod(activity)}
                    </span>
                </li>
            {/each}
        </ul>
    </div>
{/snippet}
{#snippet presentations()}
    <header class="sidebar-header justify-end">
        <h3>presentations</h3>
    </header>
    <div class="sidebar-content">
        <ul>
            {#each page.data.pageData.presentations as presentation (presentation.id)}
                <li class="not-last:border-b border-black/10 flex gap-4 justify-between py-0.5">
                    <a href={resolve(presentation.id)}>
                        {presentation.desc}
                    </a>
                </li>
            {/each}
        </ul>
    </div>
{/snippet}
{#snippet tabs()}
    <!-- prim tab -->
    <button type="button" role="tab"
        aria-selected={activeTab === 'text'}
        class="cursor-pointer text-base font-bold {activeTab === 'text' ? '' : 'opacity-35'}"
        onclick={() => (activeTab = 'text')}
    >
        text
    </button>
    <!-- sec tab -->
    {#if page.data.pageData?.activities.length}
    <button type="button" role="tab"
        aria-selected={activeTab === 'activities'}
        class="cursor-pointer text-base font-bold {activeTab === 'activities' ? '' : 'opacity-35'}"
        onclick={() => (activeTab = 'activities')}
    >
       projects / links
    </button>
    {/if}
{/snippet}
{#snippet links()}
    <header class="sidebar-header justify-end">
        <h3>links</h3>
    </header>
    <div class="sidebar-content">
        <ul>
            {#each page.data.pageData.links as link (link.id)}
                <li class="not-last:border-b border-black/10 flex gap-4 justify-between py-0.5">
                    <a href={link.id} target="_blank">
                        {link.label}
                    </a>
                </li>
            {/each}
        </ul>
    </div>
{/snippet}
{#snippet periods()}
    <header class="sidebar-header justify-end">
        <h3>residency</h3>
    </header>
    <div class="sidebar-content mb-0">
        <ul>
            {#each page.data.pageData.periods as period, i (i)}
                <li class="not-last:border-b border-black/10 font-marfa font-bold flex gap-4 justify-between py-0.5">
                    {formatPeriod(period)}
                </li>
            {/each}
        </ul>
    </div>
{/snippet}

<!-- Markup -->
<div class="grid grid-rows-[auto_minmax(0,1fr)_auto] flex-col h-full gap-y-main">
    <!-- headline -->
    <header>
        <a href={resolve(localizeHref('/artists'))} class="flex justify-end text-base font-bold items-center gap-x-sm leading-tight mb-sm">
            ← artists
        </a>
        <h1 class="font-tz text-md leading-tight sticky top-0">{page.data.pageData?.title}</h1>
    </header>

    <!-- views -->
    <div class="flex flex-col justify-start">
        <!-- info -->
        {#if activeTab === 'text'}
        <div class="desc relative font-marfa text-sm h-full overflow-y-scroll">{@html page.data.pageData?.text}</div>
        <!-- activities -->
        {:else if activeTab === 'activities'}
        <div class="my-main flex flex-col gap-y-main h-full overflow-y-scroll">
            <figure>
                {@render periods()}
            </figure>
            {#if page.data.pageData?.activities.length}
            <figure>
                {@render activities()}
            </figure>
            {/if}
            {#if page.data.pageData?.links.length}
            <figure>
                {@render links()}
            </figure>
            {/if}
            {#if page.data.pageData?.presentations?.length}
            <figure>
                {@render links()}
            </figure>
            {/if}
        </div>
        {/if}
    </div>

    <!-- tabs -->
    <div class="flex justify-between gap-4 text-sm border-t-3 border-black pt-1" role="tablist">
        {@render tabs()}
    </div>
</div>

<style>
    @reference "#lib/styles/app.css";
    .desc :global(p){
        @apply mb-[1em];
    }
    .desc {
        padding-bottom: 2rem;
        /* fade the last 4rem to transparent */
          -webkit-mask-image: linear-gradient(to bottom, #000 calc(100% - 4rem), transparent);
                  mask-image: linear-gradient(to bottom, #000 calc(100% - 4rem), transparent);
    }
</style>
