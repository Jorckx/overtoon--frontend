<script lang="ts">
    import { page } from '$app/state';
    import Blocks from '#lib/components/Blocks.svelte'
	import Image from '#lib/components/Image.svelte';
	import Sidebar from '#lib/components/Sidebar/index.svelte';
	import ArtistTab from '#lib/components/Sidebar/ArtistTab.svelte';
	// import { localizeHref } from '#lib/paraglide/runtime.js';

</script>
<!-- SNIPPETS -->
{#snippet sidebarContent()}
    <ArtistTab/>
{/snippet}
{#if page.data.pageData}
    <div class="grid ">
        <figure class="col-span-2 h-[calc(100dvh-var(--hh))]">
            <Image image={page.data.pageData?.cover}/>
        </figure>
        <Blocks />
    </div>
    <Sidebar content={sidebarContent} theme='var(--color-pink-300)' />
{:else}
    page not found…
{/if}
