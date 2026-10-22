<script lang="ts">
	interface Props {
		image?: {
			width: number;
			height: number;
			dimensions: string;
			srcset: string;
			webp: string;
			url: string;
			alt?: string;
			name: string;
			type: string;
			caption?: string;
		};
		onload?: () => void;
		delay?: number;
		websrc?: string;
		web?: boolean;
		webalt?: string;
		webcaption?: string;
		bg?: boolean;
		minh?: string;
		maxh?: string;
		fit?: string;
	}
	let {
		image,
		onload,
		delay = 0,
		websrc = '',
		web = false,
		webalt = '',
		webcaption = '',
		bg = false,
		minh = 'auto',
		maxh = 'auto',
		fit = 'contain'
	}: Props = $props();

	let imgElement: HTMLImageElement | null = $state(null);
	let isLoaded = $state(false);

	// Create placeholder only when image exists
	let placeholder = $derived(() => {
		if (!image) return '';
		return `data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22${image.width}%22%20height=%22${image.height}%22%20style=%22background:transparent%22%3E%3C/svg%3E`;
	});

	// Background styles
	let styles = $derived(() => {
		if (!bg) return {};
		return {
			backgroundImage: `url(${image?.srcset.split(' ')[0] || websrc})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat'
		};
	});

	// Intersection Observer for lazy loading
	$effect(() => {
		if (!imgElement || web) return;
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !isInView) {
						isInView = true;
						// Start loading the image
						if (image && imgElement) {
							imgElement.src = image.srcset.split(' ')[0];
							imgElement.srcset = image.srcset;
						}
					}
				});
			},
			{
				rootMargin: '50px', // Start loading 50px before entering viewport
				threshold: 0.1
			}
		);
		observer.observe(imgElement);
		return () => {
			observer.disconnect();
		};
	});

	function handleError() {
		console.warn('Failed to load image:', image?.name);
	}
	// in view
	let isInView = $state(false);
	let oninview = (event: CustomEvent<{ visible: boolean }>) => {
		isInView = event.detail.visible;
	};

	// Handle image load event
	function handleLoad() {
		isLoaded = true;
		oninview;
		onload?.();
	}
</script>

<figure>
	{#if web}
		<picture
			style={Object.entries(styles())
				.map(([key, value]) => `${key}: ${value}`)
				.join('; ')}
			class:bg
		>
			<img src={websrc} alt={webalt} {onload} onerror={handleError} />
		</picture>
	{:else if image}
		{#if image.type === 'video'}
			<video muted autoplay loop playsinline width={image.width} height="10px">
				<source src={image.url} />
				<track kind="captions" />
			</video>
		{:else}
			<picture
				style={Object.entries(styles())
					.map(([key, value]) => `${key}: ${value}`)
					.join('; ')}
				class:bg
			>
				<source srcset={isInView ? image.webp : ''} type="image/webp" />
				<img
					bind:this={imgElement}
					src={placeholder()}
					srcset=""
					loading="lazy"
					class="lazyload"
					class:loaded={isLoaded}
					class:inview={isInView}
					style="transition-delay: {delay}s; max-height: {maxh}; min-height: {minh}; object-fit: {fit}"
					decoding="async"
					fetchpriority="high"
					sizes="(min-width: 768px) 100vw, 100vw"
					alt={image.alt ? image.alt : image.name}
					onload={handleLoad}
					onerror={handleError}
				/>
			</picture>
		{/if}
	{/if}

	{#if web && webcaption !== ''}
		<figcaption>
			{webcaption}
		</figcaption>
	{:else if image?.caption}
		<figcaption>
			{image.caption}
		</figcaption>
	{/if}
</figure>

<style>
	img.lazyload {
		opacity: 0;
		transition: opacity 400ms ease-in-out;
		transition-delay: 0.35s !important;
	}
	img.lazyload.loaded.inview {
		opacity: 1;
	}

	picture {
		z-index: 2;
		content-visibility: auto;
		display: flex;
		justify-content: center;
		position: relative;
	}
	figcaption {
		margin: 0;
		font-size: var(--fs-sm);
		text-align: left;
		padding-top: 0.5em;
		margin-bottom: 0.5em;
		z-index: 4;
		line-height: 1;
		/* color: var(--color-indigo-600); */
		transition: opacity 1s var(--bezier-2);
		opacity: 0.5;
	}
	@media screen and (min-width: 764px){
		figcaption{
			padding-left: 2rem;
		}
	}
	figure {
		max-height: 100%;
		position: relative;
	}
	figure:hover figcaption {
		opacity: 1;
	}
	img {
		/* border: 1px solid #e2e2e2; */
		/* pointer-events: none; */
		/* -webkit-touch-callout: none; */
		overflow: hidden;
		object-position: center;
		object-fit: contain;
		 height: 100%;
		/* margin: auto; */
		width: fit-content;
		max-width: 100%;
	}
</style>
