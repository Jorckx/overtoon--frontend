<script lang="ts">
	import { page } from '$app/state';
	let { globalseo, isdev } = $props();
	import favicon from '#lib/assets/favicon.svg';

	const pageSeo = $derived(page.data?.pageData?.seo ?? {});
	const seotitle = $derived(
		globalseo?.sitetitle + (pageSeo?.seotitle ? ` | ${pageSeo?.seotitle}` : '')
	);
	const description = $derived(pageSeo?.seometa || globalseo?.seometa);
	const image = $derived(pageSeo?.shareimage?.url || globalseo?.shareimage?.url);
</script>

<svelte:head>
   	<link rel="icon" href={favicon} />
    <title>{seotitle}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={pageSeo?.seotags || globalseo?.seotags} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={page.url.href} />
    <meta property="og:title" content={seotitle} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content={page.url.href} />
    <meta name="twitter:title" content={seotitle} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    <link rel="canonical" href={page.url.href} />
    {#if isdev}
    	<meta name="robots" content="noindex, nofollow" />
    {/if}
</svelte:head>
