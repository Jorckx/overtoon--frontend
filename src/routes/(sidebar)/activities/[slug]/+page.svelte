<script lang="ts">
	// 2. internal
    import { page } from '$app/state';
	// import { localizeHref } from '#lib/paraglide/runtime.js';
	// import { resolve } from '$app/paths';

	// 2. components
	import Image from '#lib/components/Image.svelte';
	import Sidebar from '#lib/components/Sidebar/index.svelte';
	import ActivityTabs from '#lib/components/Sidebar/ActivityTabs.svelte';
	// import Arrow from '#lib/components/icon/Arrow.svelte';

</script>
<!-- SNIPPETS -->
{#snippet sidebarContent()}
    <ActivityTabs/>
{/snippet}

<!-- MARKUP -->
{#if page.data.pageData}
    <figure class="col-span-1 h-[calc(100dvh-var(--hh))] relative">
        <Image image={page.data.pageData?.cover}/>
    </figure>
    <Sidebar content={sidebarContent} />
{:else}
    page not found…
{/if}
