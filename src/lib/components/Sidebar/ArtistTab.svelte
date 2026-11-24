
<script lang="ts">
    // 1. internal
    import { page } from '$app/state';
    import { resolve } from '$app/paths';
   	import { formatDate, DATE_FORMATS } from '#lib/utils/date.js';

    // 2. state
    let activeTab = $state<string>('text');
</script>

<!-- SNIPPETS -->
{#snippet activities()}
    <div class="sidebar-content border-t">
        <ul>
            {#each page.data.pageData.activities as activity (activity.id)}
                <li class="not-last:border-b border-black/10 flex gap-4 justify-between py-0.5">
                    <a href={resolve(activity.id)}>
                        {activity.title}
                    </a>
                    <span class="opacity-35 font-tz-mono">
                        {#if activity.start}
                            {formatDate(activity.start, DATE_FORMATS.compact)}
                        {/if}
                        {#if activity.end}
                             – {formatDate(activity.end, DATE_FORMATS.compact)}
                        {/if}
                    </span>
                </li>
            {/each}
        </ul>
    </div>
{/snippet}
{#snippet tabs()}
    <!-- prim tab -->
    <button type="button" role="tab"
        aria-selected={activeTab === 'text'}
        class="cursor-pointer font-bold {activeTab === 'text' ? '' : 'opacity-35'}"
        onclick={() => (activeTab = 'text')}
    >
        info
    </button>
    <!-- sec tab -->
    <div class="flex gap-x-main">
        {#if page.data.pageData?.activities.length}
        <button type="button" role="tab"
            aria-selected={activeTab === 'activities'}
            class="cursor-pointer font-bold {activeTab === 'activities' ? '' : 'opacity-35'}"
            onclick={() => (activeTab = 'activities')}
        >
            activities
        </button>
        {/if}
        {#if page.data.pageData?.links.length}
        <button type="button" role="tab"
            aria-selected={activeTab === 'links'}
            class="cursor-pointer font-bold {activeTab === 'links' ? '' : 'opacity-35'}"
            onclick={() => (activeTab = 'links')}
        >
            links
        </button>
        {/if}
    </div>
{/snippet}
{#snippet links()}
    <div class="sidebar-content border-t">
        <ul>
            {#each page.data.pageData.links as link (link.id)}
                <li class="not-last:border-b border-black/10 flex gap-4 justify-between py-0.5">
                    <a href={link.id}>
                        {link.label}
                    </a>
                </li>
            {/each}
        </ul>
    </div>
{/snippet}
{#snippet periods()}
    <div class="sidebar-content border-none mb-0">
        <ul>
            {#each page.data.pageData.periods as period, i (i)}
                <li class="border-t border-black/10 flex gap-4 justify-between py-0.5">
                    {period.start}
                </li>
            {/each}
        </ul>
    </div>
{/snippet}

<!-- Markup -->
<div class="grid grid-rows-[auto_minmax(0,1fr)_auto] flex-col h-full gap-y-main">
    <!-- headline -->
    <header>
        <h1 class="font-tz text-md leading-tight sticky top-0">{page.data.pageData?.title}</h1>
    </header>

    <!-- views -->
    <div class="flex flex-col justify-start gap-y-main">
        <!-- info -->
        {#if activeTab === 'text'}
            {@render periods()}
            <div class="desc relative text-sm h-full overflow-y-scroll">{@html page.data.pageData?.text}</div>
        <!-- activities -->
        {:else if activeTab === 'activities'}
            <div class="mb-lg flex flex-col gap-y-main">
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
            </div>
        {/if}
    </div>

    <!-- tabs -->
    <div class="flex justify-between gap-4 text-sm border-t border-black pt-1" role="tablist">
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
