<script lang="ts">
    import { page } from '$app/state';
    import Blocks from '#lib/components/Blocks.svelte'
	import Image from '#lib/components/Image.svelte';
	import Sidebar from '#lib/components/Sidebar/index.svelte';
	import ArtistTab from '#lib/components/Sidebar/ArtistTab.svelte';
	import { localizeHref } from '#lib/paraglide/runtime.js';
	import Arrow from '#lib/components/icon/Arrow.svelte';
	import { resolve } from '$app/paths';

</script>
<!-- SNIPPETS -->
{#snippet sidebarContent()}
    <ArtistTab/>
{/snippet}
{#if page.data.pageData}
    <figure class="col-span-2 h-[calc(100dvh-var(--hh))] relative">
        <Image image={page.data.pageData?.cover}/>
    </figure>
    <Sidebar content={sidebarContent} />
{:else}
    page not found…
{/if}
