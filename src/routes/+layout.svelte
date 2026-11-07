<script lang="ts">
    // import type { Path } from '$app/types';
    import '../app.css';
    import { resolve } from '$app/paths';
    import { localizeHref } from '#lib/paraglide/runtime.js';
    let { data, children } = $props();
    // import { page } from '$app/state';
    // import favicon from '#lib/assets/favicon.svg';
    //
    // 2. Components
    import Ooo from '#lib/components/Ooo.svelte';
    import Menu from '#lib/components/Menu.svelte';
    import Seo from '#lib/components/Seo.svelte';
    import Logo from '#lib/components/Logo.svelte';

    // 3. states
	let hh = $state<number>(0)
	let sbh = $derived(hh + 3)
</script>

<Seo globalseo={data.layoutData?.seo} isdev={data.devmode} />

<div class="wrapper">
    <!-- header -->
    <a
        href={resolve(localizeHref('/'))}
        class="logo z-100 border-b-3 p-main"
        bind:clientHeight={hh}
    ><Logo /></a>

    {#if hh}
    <header
        class="sidebar"
        style="--hh: {sbh}px"
    >
        <Menu />
    </header>
    {/if}

    <!-- main -->
    <main class="main">
        {@render children()}
        <Ooo/>
    </main>
    <!-- <Sidebar /> -->
</div>
