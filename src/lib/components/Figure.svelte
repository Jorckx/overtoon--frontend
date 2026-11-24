<!-- Figure.svelte -->
<script lang="ts" module>
	const enlargeLabel = 'Enlarge image'
	const closeLabel = 'Close'
	const expandedMaxHeight = '80dvh'
    // import { fade } from 'svelte/transition';
</script>

<script lang="ts">
	import { tick, type ComponentProps } from 'svelte'
	import Image from '#lib/components/Image.svelte'

	type ImageProps = ComponentProps<typeof Image>
	type Props = Omit<ImageProps, 'image'> & {
		image?: ImageProps['image'] & { caption?: string }
		caption?: string
		/** Opt-in: click the image to open it enlarged in a modal viewbox */
		expandable?: boolean
	}

	let { image, caption = image?.caption, expandable = false, ...rest }: Props = $props()

	let dialogEl: HTMLDialogElement | undefined = $state()
	let opened = $state(false) // only load the enlarged image after the first open

	const canExpand = $derived(expandable && image?.type !== 'video')
	const label = $derived(image?.alt ? `${enlargeLabel}: ${image.alt}` : enlargeLabel)

	async function handleOpen() {
		opened = true
		await tick()
		dialogEl?.showModal()
	}

	function handleClose() {
		dialogEl?.close()
	}

	// a click on the dialog itself (not its content) is a click on the backdrop
	function handleBackdropClick(event: MouseEvent) {
		if (event.target === dialogEl) handleClose()
	}
</script>

<figure class="h-full group">
    <!-- Image -->
	<Image {image} {...rest} />
    <!-- caption -->
	{#if caption}
		<figcaption class="absolute brick hidden group-hover:block bg-black px-2 py-1 inset-0 top-auto text-left text-white text-sm">{caption}</figcaption>
	{/if}

    <!-- if expandable -->
	{#if canExpand}
		<button type="button" class="absolute px-main leading-tight hidden group-hover:block bottom-0 right-0 bg-black/30 text-left text-white font-normal text-lg cursor-pointer" aria-label={label} onclick={handleOpen}>+</button>
    	{#if opened}
  		<dialog
 			bind:this={dialogEl}
 			class="fixed inset-0 m-0 h-dvh max-h-none w-dvw max-w-none bg-transparent p-4 backdrop:bg-black/90"
 			aria-label={image?.alt || image?.name}
 			onclick={handleBackdropClick}
  		>
 			<div class="flex h-full w-full items-center justify-center">
				<Image {image} fit="contain" sizes="100vw" maxh={expandedMaxHeight} />
 			</div>
 			<button
				type="button"
				class="page-subtitle bg-black focus:outline-0 absolute top-0 right-0 cursor-pointer text-white text-lg font-black"
				aria-label={closeLabel}
				onclick={handleClose}
 			>
				close
 			</button>
  		</dialog>
    	{/if}
	{/if}
</figure>
