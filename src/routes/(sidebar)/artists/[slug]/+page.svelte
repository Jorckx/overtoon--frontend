<script lang="ts">
    import { page } from '$app/state';
	import Image from '#lib/components/Image.svelte';
	import Sidebar from '#lib/components/Sidebar/index.svelte';
	import ArtistTabs from '#lib/components/Sidebar/ArtistTabs.svelte';
</script>
<!-- SNIPPETS -->
{#snippet sidebarContent()}
    <ArtistTabs/>
{/snippet}
{#if page.data.pageData}
    <figure class="col-span-1 h-[calc(100dvh-var(--hh))] relative hidden lg:block">
        <Image image={page.data.pageData?.cover}/>
    </figure>
    <Sidebar content={sidebarContent} />
{:else}
    page not found…
{/if}
