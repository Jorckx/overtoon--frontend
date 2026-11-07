<script lang="ts">
	let { images, index = 0 } = $props();
	// import { page } from '$app/state';
	// import function to register Swiper custom elements
	// import { tick } from 'svelte';
	import { register } from 'swiper/element/bundle';
	import type { SwiperContainer } from 'swiper/element';
	import { FreeMode } from 'swiper/modules';
	import Image from './Image.svelte';
	import { inView } from '$lib/utils/useInView';
	import { activeProject } from '$lib/utils/shared.svelte';

	// import Arrow from '$lib/components/Icons/Arrow.svelte';
	// import ArrowSvg from '$lib/assets/Arrow.svg?url';

	// register Swiper custom elements
	register();

	// JAVASCRIPT

	// let isMobile = $state(false);
	let swiperEl: SwiperContainer | undefined = $state();
	// const BREAKPOINT = 768;

	// let visible = $state(false);
	// async function handleInView() {
	// 	// visible = true;
	// 	console.log('visible');
	// 	await tick();
	// 	swiperEl?.swiper?.update();
	// }

	const swiperParams = {
		// https://swiperjs.com/swiper-api#parameters
		// slidesPerView: 1,
		enabled: true, // Disabled by default for mobile
		direction: 'horizontal',
		roundLengths: true,
		alignSelf: 'start',
		centeredSlides: false,
		loop: true,
		speed: 0,
		// pagination: {
		// 	el: 'swiper-pagination-0',
		// 	type: 'fraction'
		// },
		lazyload: true,
		on: {
			slideChange: (swiper: any) => {
				if (activeProject.index === index) {
					activeProject.activeslide = swiper.realIndex + 1;
				}
			}
		},
		mousewheel: {
			enabled: false,
			releaseOnEdges: true
		},
		keyboard: {
			enabled: true,
			onlyInViewport: true
		},
		modules: [FreeMode],
		freeMode: false
	};

	// onMount(() => {
	// 	const mq = window.matchMedia(`(max-width: ${BREAKPOINT - 1}px)`);
	// 	isMobile = mq.matches;
	// 	const handler = (e: MediaQueryListEvent) => {
	// 		isMobile = e.matches;
	// 	};
	// 	mq.addEventListener('change', handler);

	// 	return () => mq.removeEventListener('change', handler);
	// });
	// Triggered by Intersection Observer
	async function handleInView(isInView: boolean) {
		if (isInView) {
			// Notify the parent that THIS specific slider is now active
			// onVisible(index, images.length);
			activeProject.slidesCount = images.length;
			// await tick();
			// swiperEl?.swiper?.update();
		}
	}

	$effect(() => {
		if (swiperEl) {
			Object.assign(swiperEl, swiperParams);
			swiperEl.initialize();
		}
		// if (activeProject.index === index) {
		// 	activeProject.activeslide = swiperEl?.swiper?.activeIndex;
		// }
	});
</script>

<swiper-container
	bind:this={swiperEl}
	init="false"
	use:inView={{ threshold: 0.4, once: false }}
	oninview={(e: CustomEvent) => handleInView(e.detail.visible)}
>
	{#each images as img, i (i)}
		<swiper-slide
			onclick={() => {swiperEl?.swiper?.slideNext();}}
			onpointerdown={() => {swiperEl?.swiper?.slideNext();}}
			onkeydown={() => swiperEl?.swiper?.slideNext()}
			role="button"
			tabindex="0"
		>
			<Image image={img} maxh="80vh" />
		</swiper-slide>
	{/each}
</swiper-container>

<style>
	swiper-container {
		height: calc(100vh - 3.6rem);
		height: 100vh;
		height: 100svh;
		position: relative;
		width: 100%;
		/*background-color: white;*/
	}
	swiper-container:has(:nth-child(2)) {
		cursor:
			url('/Arrow.svg') 0 0,
			auto;
	}
	swiper-slide {
		/*aspect-ratio: 4 / 3;*/
		height: calc(100vh - 3.6rem);
		min-height: 100vh;
	}
	swiper-slide :global(figure) {
		height: calc(100vh - 3.6rem);
		height: 100vh;
		height: 100svh;
		display: flex;
		align-items: center;
		padding: var(--pd-lg);
	}
	@media screen and (min-width: 768px) {
		/*swiper-container {
			height: calc(100vh - 3.6rem);
			height: calc(100svh - 3.6rem);
		}
		swiper-slide {
			height: calc(100vh - 3.6rem);
			height: calc(100svh - 3.6rem);
		}*/
		/* picture is set to 'content' in Image component, while we need to set it to block */
		swiper-slide :global(figure) {
			/*height: calc(100vh - 3.6rem);*/
			/*height: calc(100svh - 3.6rem);*/
			display: flex;
			align-items: center;
		}
	}
</style>
