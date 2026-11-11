<!-- Figure.svelte -->
<script lang="ts">
    import Image from "#lib/components/Image.svelte";
	let { image, caption = image?.caption, ...rest } = $props();
</script>

<figure class="h-full">
	<Image {image} {...rest} />
	{#if caption}<figcaption>{caption}</figcaption>{/if}
</figure>
