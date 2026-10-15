<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import Ooo from '#lib/components/Ooo.svelte';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{data.siteData.title}
{@render children()}

<Ooo/>
