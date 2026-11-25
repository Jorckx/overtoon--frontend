<script lang="ts">
	let { data, children } = $props();
	import { page } from '$app/state';
	import { onNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import '#lib/styles/app.css';
	import { register } from 'swiper/element/bundle';
	import { deLocalizeHref } from '#lib/paraglide/runtime.js';

	import Ooo from '#lib/components/Ooo.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Consent from '#lib/components/Consent.svelte';

	register();
	// shared by the page (/artists) and the sidebar filter, which are siblings

	// 3. STATE
	const path = $derived(deLocalizeHref(page.url.pathname));
	const OooRight = ['/artists', '/residencies', '/activities', '/about', '/updates'];
	const OooUp = ['/artists', '/activities'];
	const hasFooter = ['/about'];
    const slideOoo = $derived(OooRight.includes(path))
    const pushOoo = $derived(OooUp.includes(path))
	let hh = $state(0);

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

<!-- SEO / GDPR -->
<Seo globalseo={data.layoutData?.seo} isdev={data.devmode} />
<Consent production={!data.devmode} />

<!-- MARKUP -->
<header bind:clientHeight={hh} class="sticky top-0 z-900 h-fit">
	<Header />
</header>

{#if hh}
<main style:--hh="{hh}px" style:--thm={page.data.theme || 'var(--color-cyan-400)'} class="h-[calc(100dvh-var(--hh))]">
	{@render children()}
</main >
{/if}

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
