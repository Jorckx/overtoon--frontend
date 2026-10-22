<script lang="ts">
    import { page } from '$app/state';
    import '../app.css';
	import favicon from '#lib/assets/favicon.svg';
	import Ooo from '#lib/components/Ooo.svelte';
	import Menu from '#lib/components/Menu.svelte';
	// import Sidebar from '#lib/components/Sidebar.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
	import Logo from '#lib/components/Logo.svelte';
	import { DEFAULT_LANG, LANGS, localizeHref, switchLangHref, type Lang } from '#lib/utils/i18n.ts';
	const lang = $derived<Lang>(page.data.lang ?? DEFAULT_LANG);
	let hh = $state()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<div class="wrapper">
    <!-- header -->
    <a href={localizeHref('/', lang)} class="logo z-100 border-b-3 p-main" bind:clientHeight={hh}>
        <Logo />
    </a>
    <header class="sidebar bg-gradient" style="--hh: {hh + 3}px">
        <Menu {hh} />
    </header>
    <!-- main -->
    <main class="main">
        {@render children()}
        <Ooo/>
    </main>
    <!-- <Sidebar /> -->
</div>
