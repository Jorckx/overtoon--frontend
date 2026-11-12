<!-- Image.svelte -->
<script lang="ts">
	interface ImageData {
		width: number;
		height: number;
		srcset: string;
		webp: string;
		url: string;
		alt?: string;
		name: string;
		type: string;
	}

	interface Props {
		image?: ImageData;
		/** External image instead of `image` */
		web?: boolean;
		websrc?: string;
		webalt?: string;
		/** Optional aspect-ratio override ('16/9', 1.5 …). Omit to fill the parent. */
		ratio?: string | number;
		fit?: string;
		sizes?: string;
		eager?: boolean;
		delay?: number;
		onload?: () => void;
	}

	let {
		image,
		web = false,
		websrc = '',
		webalt = '',
		ratio = '',
		fit = 'cover',
		sizes = '100vw',
		eager = false,
		delay = 0,
		onload
	}: Props = $props();

	let imgEl: HTMLImageElement | undefined = $state();
	let loaded = $state(false);

	const src = $derived(web ? websrc : (image?.srcset.split(' ')[0] ?? ''));
	const alt = $derived(web ? webalt : image?.alt || image?.name || '');
	const isVideo = $derived(!web && image?.type === 'video');

	function handleLoad() {
		loaded = true;
		onload?.();
	}

	// Cached images can finish before the handler is attached
	$effect(() => {
		if (imgEl?.complete && imgEl.naturalWidth > 0) loaded = true;
	});
</script>

{#if isVideo}
	<video
		src={image?.url}
		muted
		autoplay
		loop
		playsinline
		style:object-fit={fit}
		style:aspect-ratio={ratio}
		style:height={ratio ? 'auto' : undefined}
	>
		<track kind="captions" />
	</video>
{:else if src}
	<picture>
		{#if !web && image?.webp}
			<source srcset={image.webp} {sizes} type="image/webp" />
		{/if}
		<img
			bind:this={imgEl}
			{src}
			srcset={!web ? image?.srcset : undefined}
			{sizes}
			{alt}
			width={!web ? image?.width : undefined}
			height={!web ? image?.height : undefined}
			loading={eager ? 'eager' : 'lazy'}
			fetchpriority={eager ? 'high' : 'auto'}
			decoding="async"
			class:loaded
			style:object-fit={fit}
			style:aspect-ratio={ratio}
			style:height={ratio ? '100%' : undefined}
			style:transition-delay="{delay}s"
			onload={handleLoad}
			onerror={() => console.warn('Failed to load image:', src)}
		/>
	</picture>
{/if}

<style>
	/* picture adds no box: img sizes against the real parent */
	picture {
		display: contents;
	}

	img,
	video {
		display: block;
		/* Fill the parent by default; a container can override via --fill-w / --fill-h */
		width: var(--fill-w, 100%);
		height: var(--fill-h, 100%);
		object-position: center;
	}

	img {
		opacity: 0;
		transition: opacity 400ms ease-in-out;
	}
	img.loaded {
		opacity: 1;
	}
</style>
