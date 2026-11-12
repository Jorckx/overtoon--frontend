<script lang="ts">
    // 1. Components
    let { data, children } = $props();
    import { page } from '$app/state';
    import '#lib/styles/app.css';
   	import { register } from 'swiper/element/bundle';
	register()
    import { resolve } from '$app/paths';
    import { localizeHref, deLocalizeHref } from '#lib/paraglide/runtime.js';

    // 2. Components
    import Ooo from '#lib/components/Ooo.svelte';
    import Menu from '#lib/components/Menu.svelte';
    import Statusbar from '#lib/components/Statusbar.svelte';
    import Seo from '#lib/components/Seo.svelte';
    import Logo from '#lib/components/LogoAnimated.svelte';
    // import StickyO from '#lib/components/StickyO.svelte';

    // 3. states
    const currentPath = $derived(page.url.pathname)
    const hideSidebar = $derived(deLocalizeHref(currentPath) !== '/')
	let hh = $state<number>(0)
	let sbh = $derived(hh + 3)
</script>

<Seo globalseo={data.layoutData?.seo} isdev={data.devmode} />

<div class="grid h-dvh grid-rows-(--grid-wrapper-rows) overflow-hidden">
<header bind:clientHeight={hh} class="sticky top-0 z-900 grid grid-cols-(--interface-cols) grid-rows-1 h-fit">
    <a href={resolve(localizeHref('/'))} class="z-100 h-full border-b-3 p-main">
        <Logo duration={3000} interval={10000} />
        <!-- <StickyO /> -->
    </a>
    <nav class="w-full" style="--hh: {sbh}px">
        <Menu />
    </nav>
</header>

<div class="grid min-h-0 grid-cols-(--interface-cols) grid-rows-1 overflow-hidden" class:sidebar-hidden={hideSidebar} style="--hh: {hh}px">
    <main class="main">
        {@render children()}
        <Ooo {hideSidebar} />
    </main>
    <div class="overflow-hidden">
        <Statusbar hide={hideSidebar} />
    </div>
</div>
</div>

<style>
    .sidebar-hidden {
        --interface-cols: 1fr 0fr !important; /* your "hidden" columns */
    }
</style>
