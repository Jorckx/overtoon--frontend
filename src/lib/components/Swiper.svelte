<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	import type { SwiperOptions } from 'swiper/types';
	import { Pagination } from 'swiper/modules';
	import { onMount } from 'svelte';
	// register() once in the root layout: import { register } from 'swiper/element/bundle';

	interface Props {
		data: T[];
		slide: Snippet<[T, number]>;
		/** Merged over the defaults */
		params?: SwiperOptions;
		nav?: boolean;
		/** Below this viewport width a plain stacked list is rendered. 0 = always swiper. */
		stackBelow?: number;
		class?: string;
	}

	let { data, slide, params = {}, nav = false, stackBelow = 768, class: className = '' }: Props = $props();

	let stacked = $state(false);
	let swiperEl = $state<(HTMLElement & { initialize: () => void }) | null>(null);

	const defaults: SwiperOptions = {
		slidesPerView: 'auto',
		spaceBetween: 0,
		loop: true,
		grabCursor: true,
		direction: 'horizontal',
		modules: [Pagination],
		navigation: { nextEl: '.swiper-next', prevEl: '.swiper-prev' },
		keyboard: { enabled: true, onlyInViewport: false }
	};

	onMount(() => {
		if (!stackBelow) return;
		const mq = window.matchMedia(`(max-width: ${stackBelow - 1}px)`);
		stacked = mq.matches;
		const handler = (e: MediaQueryListEvent) => (stacked = e.matches);
		mq.addEventListener('change', handler);
		return () => mq.removeEventListener('change', handler);
	});

	// (re)initialise whenever the element appears
	$effect(() => {
		if (!swiperEl) return;
		Object.assign(swiperEl, { ...defaults, ...params });
		swiperEl.initialize();
	});
</script>

{#if stacked}
	<ul class="stack {className}">
		{#each data as item, i (i)}
			<li>{@render slide(item, i)}</li>
		{/each}
	</ul>
{:else}
	<div class="host {className}">
		{#if nav}
			<div class="swiper-nav">
				<button type="button" class="swiper-prev" aria-label="Previous">&larr;</button>
				<button type="button" class="swiper-next" aria-label="Next">&rarr;</button>
			</div>
		{/if}
		<swiper-container bind:this={swiperEl} init="false">
			{#each data as item, i (i)}
				<swiper-slide>{@render slide(item, i)}</swiper-slide>
			{/each}
		</swiper-container>
	</div>
{/if}

<style>
	/* Fills whatever box the parent gives it and never overflows it */
	.host {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 0;
		min-width: 0;
		overflow: hidden;
	}
	swiper-container {
		flex: 1;
		min-height: 0;
		width: 100%;
		display: block;
	}
	swiper-container::part(wrapper) {
		transition-timing-function: linear;
	}
	/* Slide = full height, width from content (slidesPerView: 'auto').
	   Children size themselves via --fill-w / --fill-h (see Image.svelte). */
	swiper-slide {
		--fill-w: auto;
		--fill-h: 100%;
		width: auto;
		height: 100%;
		display: block;
	}
	swiper-slide > :global(*) {
		height: 100%;
	}

	.stack {
		display: grid;
		gap: var(--space-main, 1rem);
		grid-template-columns: 1fr;
	}
	.stack li {
		--fill-w: 100%;
		--fill-h: auto;
	}

	.swiper-nav {
		display: flex;
		justify-content: flex-end;
		gap: 0.75rem;
		padding: 0 var(--space-main, 1rem);
		margin-bottom: var(--space-main, 1rem);
	}
	.swiper-next,
	.swiper-prev {
		font-weight: 900;
		text-transform: capitalize;
		cursor: pointer;
	}
</style>
