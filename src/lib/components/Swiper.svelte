<script lang="ts">
    // 1. internal
    import type { Snippet } from 'svelte';
    import type { SwiperOptions } from 'swiper/types';
    import { onMount } from 'svelte';
    import { defaultParams } from '#lib/utils/SwiperParams.js';
    // register once in the root layout:
    // import { register } from 'swiper/element/bundle';
	// register();

	import Arrow from '#lib/components/icon/Arrow.svelte'

	interface Props {
  	  data: unknown[],
      params?: null | SwiperOptions,
      slide: Snippet<[unknown]>;
      nav?: boolean,
      ratio?: string,
      height?: string,
      variant?: 'cards' | 'images',
	}

    let {
      data,
      params = defaultParams,
      slide,
      nav = false,
      ratio,
      height,
      variant = 'cards',
    }: Props = $props();

	// JAVASCRIPT
  	let isMobile = $state<boolean>(false);
  	let swiperEl = $state<null | SwiperOptions>(null);
	const BREAKPOINT = 768;
	// loop needs enough slides to fill the viewport, fewer get repeated
	const minLoopSlides = 6;

	const count = $derived(data?.length ?? 0);
	const slides = $derived.by(() => {
		if (count === 0) return [];
		const repeats = count < minLoopSlides ? Math.ceil(minLoopSlides / count) : 1;
		return Array.from({ length: count * repeats }, (_, i) => ({
			item: data[i % count],
			isClone: i >= count,
		}));
	});

	// swiper
	onMount(() => {
		const mq = window.matchMedia(`(max-width: ${BREAKPOINT - 1}px)`);
		isMobile = mq.matches;
		const handler = (e) => { isMobile = e.matches; };
		mq.addEventListener('change', handler);

		// Apply swiper parameters when element is ready
		if (!isMobile && count > 1) {
			requestAnimationFrame(() => {
				if (swiperEl) {
					Object.assign(swiperEl, params);
					swiperEl.initialize();
				}
			});
		}
		return () => mq.removeEventListener('change', handler);
	});

</script>


{#if count === 1}
    <div class="single-image flex items-end justify-center" style:height={height ?? '60dvh'}>
        {@render slide(data[0])}
    </div>
{:else if isMobile && variant === 'images'}
    <div class="image-row flex w-dvw gap-4 overflow-x-auto" style:height={height ?? '60dvh'}>
    	{#each data as item, i (i)}
    		<div class="h-full shrink-0">
    			{@render slide(item)}
    		</div>
    	{/each}
    </div>
    {:else if isMobile}
    <div class="gallery w-dvw pr-intro pt-[var(--hh)+50rem]">
    	{#each data as item, i (i)}
    		{@render slide(item)}
    	{/each}
    </div>
{:else}
<div
    class="swiper-wrapper relative content-end w-full min-w-0 max-w-full"
    style:height={height ? height : '80vh'}

>
	<swiper-container bind:this={swiperEl} class="swiper h-full w-full max-w-full" init="false">
  		{#each slides as { item, isClone }, i (i)}
      		<swiper-slide
                class="content-end {variant === 'images' ? 'image-slide' : 'card-slide'}"
	            style:--ratio={ratio ? ratio : 'inherit'}
                aria-hidden={isClone ? 'true' : undefined}
                inert={isClone}
            >
     			{@render slide(item)}
      		</swiper-slide>
  		{/each}
	</swiper-container>
    {#if (nav || variant === 'images') && count > 1}
    	<div class="swiper-nav flex justify-end">
    		<div class="swiper-prev font-black"><Arrow rotate={90} /></div>
    		<div class="swiper-next font-black"><Arrow rotate={270} /></div>
    	</div>
	{/if}
</div>
{/if}

<style>
@reference '#lib/styles/app.css';
swiper-container::part(wrapper) {
    transition-timing-function: linear !important;
	overflow: visible;
}

swiper-slide {
	width: auto;
	height: 100%;
	display: flex;
	overflow: visible;
	align-items: flex-end;
}
/* Cards: the slide takes the swiper height, the card fills it (h-full) and its
   width follows the content (image ratio), which slidesPerView 'auto' measures. */
swiper-slide.card-slide {
	align-items: stretch;
	/* equal-width slides: every card image scales the same. Override with --card-w */
	width: var(--card-w, clamp(14rem, 30vw, 30rem));
	flex-shrink: 0;
}
swiper-slide.card-slide > :global(*) {
	height: 100%;
	width: 100%;
}
/* Image slideshow: slide takes the swiper height, width follows the image ratio.
   !important beats the inline height/width styles set by Image.svelte. */
swiper-slide.image-slide {
	height: 100%;
	width: auto;
	align-items: stretch;
}
swiper-slide.image-slide :global(figure) {
	display: block;
	height: 100%;
	margin: 0;
}
.image-row :global(img),
.image-row :global(video),
.single-image :global(img),
.single-image :global(video),
swiper-slide.image-slide :global(img),
swiper-slide.image-slide :global(video) {
	height: 100% !important;
	width: auto !important;
	max-width: none;
	object-fit: cover;
	display: block;
}
.swiper-next, .swiper-prev{
    @apply p-main cursor-pointer bg-gray-200 text-(--txt2);
}
.swiper-nav{
    @apply absolute right-0 bottom-0 z-200;
}
</style>
