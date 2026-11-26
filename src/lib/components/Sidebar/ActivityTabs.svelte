
<script lang="ts">
    // 1. internal
    import { page } from '$app/state';
    import { resolve } from '$app/paths';
    import { localizeHref } from '#lib/paraglide/runtime.js';
   	// import { formatPeriod } from '#lib/utils/formatPeriod.js';

    // 3. state
    let activeTab = $state<string>('text');
</script>

<!-- SNIPPETS -->
{#snippet artists()}
    <header class="sidebar-header justify-end">
        <h3>Artists</h3>
    </header>
    <div class="sidebar-content">
        <ul>
            {#each page.data.pageData.artists as artist (artist.id)}
                <li class="not-last:border-b border-black/10 flex gap-4 justify-between py-0.5">
                    <a href={resolve(artist.id)}>
                        {artist.title}
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
        class="tab-button {activeTab === 'text' ? '' : 'opacity-35'}"
        onclick={() => (activeTab = 'text')}
    >
        text
    </button>
    <!-- sec tab -->
    {#if page.data.pageData?.artists.length}
    <button type="button" role="tab"
        aria-selected={activeTab === 'details'}
        class="tab-button {activeTab === 'details' ? '' : 'opacity-35'}"
        onclick={() => (activeTab = 'details')}
    >
       details
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
                    <a href={link.id}>
                        {link.label}
                    </a>
                </li>
            {/each}
        </ul>
    </div>
{/snippet}

<!-- Markup -->
<div class="grid grid-rows-[auto_minmax(0,1fr)_auto] flex-col h-full gap-y-main">
    <!-- headline -->
    <header>
        <a href={resolve(localizeHref('/activities'))} class="flex justify-end text-base font-bold items-center gap-x-sm leading-tight mb-sm">
            ← activities
        </a>
        <h1 class="tab-title">{page.data.pageData?.title}</h1>
        <h2 class="tab-subtitle">{page.data.pageData?.subtitle}</h2>
    </header>

    <!-- views -->
    <div class="flex flex-col justify-start">
        <!-- info -->
        {#if activeTab === 'text'}
        <div class="tab-text">{@html page.data.pageData?.text}</div>
        <!-- activities -->
        {:else if activeTab === 'details'}
        <div class="my-main flex flex-col gap-y-main h-full overflow-y-scroll">
            {#if page.data.pageData?.artists.length}
            <figure>
                {@render artists()}
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
    <div class="flex justify-between gap-4 text-sm border-t-6 border-black pt-1" role="tablist">
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
