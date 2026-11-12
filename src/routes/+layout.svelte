<script lang="ts">
    // 1. Components
    let { data, children } = $props();
    import { page } from '$app/state';
    import '#lib/styles/app.css';
   	import { register } from 'swiper/element/bundle';
	register()
    import { deLocalizeHref } from '#lib/paraglide/runtime.js';

    // 2. Components
    import Ooo from '#lib/components/Ooo.svelte';
    import Statusbar from '#lib/components/Statusbar.svelte';
    import Seo from '#lib/components/Seo.svelte';
    import Header from '#lib/components/Header.svelte';
    // import StickyO from '#lib/components/StickyO.svelte';

    // 3. states
    const currentPath = $derived(page.url.pathname)
    const hideSidebar = $derived(deLocalizeHref(currentPath) !== '/')
	let hh = $state<number>(0)
</script>

<Seo globalseo={data.layoutData?.seo} isdev={data.devmode} />

<div class="">
    <header bind:clientHeight={hh} class="sticky top-0 z-900 grid lg:grid-cols-(--interface-cols) grid-rows-1 h-fit">
        <Header />
    </header>
    {#if hh}
    <div class="grid min-h-0 lg:grid-cols-(--interface-cols) grid-rows-1 h-fit" style="--hh: {hh}px">
        <main class="main" class:scrollable={hideSidebar}>
            {@render children()}
            <Ooo {hideSidebar} />
        </main>
        <div class="overflow-hidden hidden lg:block">
            <Statusbar hide={hideSidebar} />
        </div>
    </div>
    {/if}
</div>

<style>

    .sidebar-hidden {
        --interface-cols: 1fr 0fr !important; /* your "hidden" columns */
    }
</style>
