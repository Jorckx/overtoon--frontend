<script lang="ts">
	// 2. internal
	let { data, children } = $props();
	import { page } from '$app/state';
	import { onNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import '#lib/styles/app.css';
	import { register } from 'swiper/element/bundle';
	import { deLocalizeHref } from '#lib/paraglide/runtime.js';

	// 2. Components
	import Logo from '#lib/components/header/LogoAnimated.svelte';
	import LogoO from '#lib/components/header/LogoO.svelte';
	import Ooo from '#lib/components/Ooo.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import Header from '#lib/components/header/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Consent from '#lib/components/Consent.svelte';

	register();
	// shared by the page (/artists) and the sidebar filter, which are siblings

	// 3. STATE
	const path = $derived(deLocalizeHref(page.url.pathname));
	const hasFooter = ['/about'];
	const OooRight = ['/artists', '/residencies', '/activities', '/about', '/updates'];
	const OooUp = ['/artists', '/activities'];
    const slideOoo = $derived(OooRight.includes(path))
    const pushOoo = $derived(OooUp.includes(path))
	let hh = $state(200);
	let y = $state(0)
	let w = $state(0)

	// 3. ON NAVIGATE
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	// 3. ONMOUNT
	onMount(() => {
		const hash = location.hash;
		if (!hash) return;
		setTimeout(() => {
			document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}, 300);
	});

	// // 3. DATA DEBUG
	// import Datarow from '#lib/components/data/row.svelte'
	// import Datawrapper from '#lib/components/data/wrapper.svelte'

</script>
<svelte:window bind:scrollY={y} bind:innerWidth={w} />

<!-- SEO / GDPR -->
<Seo globalseo={data.layoutData?.seo} isdev={data.devmode} />
<Consent production={!data.devmode} />

<!-- SNIPPETS -->
{#snippet logoheader()}
    <div class="logo-header grid items-center relative" bind:clientHeight={hh}>
        <LogoO active={y > 50} />
        <Logo duration={3000} interval={10000} hide={y > 50} />
    </div>
{/snippet}

<!-- MARKUP -->
<Header {logoheader} {y} {w} />

<main style:--hh="{hh}px" style:--thm={page.data.theme || 'var(--color-cyan-400)'} class="min-h-[calc(100dvh-var(--hh))] pt-(--hh)">
	{@render children()}
</main >

<!-- Ooo -->
<Ooo {slideOoo} {pushOoo} />

{#if hasFooter.includes(path)}
	<Footer />
{/if}

<!-- DATA DEBUG -->
<!-- {#snippet datarows()}
	<Datarow data={JSON.stringify(page.data.pageData, null, 2)} sum="page data" />
	<Datarow data={JSON.stringify(page.data.layoutData, null, 2)} sum="layout data" />
{/snippet}
<Datawrapper content={datarows} /> -->
<style>
    @reference '#lib/styles/app.css';
    .logo-header{
        @apply
            col-span-1
            z-100 min-w-0 h-full flex items-start p-main lg:pl-0 lg:ml-main duration-300
            lg:border-b-6 border-black;
    }
</style>
