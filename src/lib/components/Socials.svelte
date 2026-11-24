<script lang="ts">
	import Discord from '#lib/components/icon/socials/discord.svelte';
	import Instagram from '#lib/components/icon/socials/instagram.svelte';
	import Facebook from '#lib/components/icon/socials/facebook.svelte';
	import TikTok from '#lib/components/icon/socials/tiktok.svelte';
	import Twitter from '#lib/components/icon/socials/twitter.svelte';
	import Youtube from '#lib/components/icon/socials/youtube.svelte';
	let { platforms, size = 'var(--text-base)' } = $props();
	let noSpacelowercase = (str: string) => str.replace(/\s+/g, '').toLowerCase();
</script>

<span class="flex gap-1">
	{#each platforms as platform, i (i)}
		<a
			href={platform.link}
			target="_blank"
			rel="noopener noreferrer"
			class="block"
			style="width: {size}; height: {size};"
			aria-label="social {platform.name}"
		>
			{#if noSpacelowercase(platform.name) !== ''}
				{#if noSpacelowercase(platform.name) === 'discord'}
					<Discord />
				{:else if noSpacelowercase(platform.name) === 'instagram'}
					<Instagram />
				{:else if noSpacelowercase(platform.name) === 'facebook'}
					<Facebook />
				{:else if noSpacelowercase(platform.name) === 'tiktok'}
					<TikTok />
				{:else if noSpacelowercase(platform.name) === 'twitter'}
					<Twitter />
				{:else if noSpacelowercase(platform.name) === 'youtube'}
					<Youtube />
				{/if}
			{/if}
		</a>
	{/each}
</span>
