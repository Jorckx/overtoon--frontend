<script lang="ts">
	import GdprBanner from '@beyonk/gdpr-cookie-consent-banner';
	import { onMount } from 'svelte';
	import { initGtm, grantConsent } from '#lib/analytics/gtm.js';
	import { consent } from '#lib/analytics/consent.js';

	let { production }: { production: boolean } = $props();
	let banner = $state<GdprBanner>();

	onMount(() => {
		consent.register(() => banner?.show());
		if (production) initGtm();
		return () => consent.register(undefined);
	});

	function onAnalytics(e: CustomEvent<{ agreed: boolean }>) {
		if (e.detail.agreed && production) grantConsent();
	}
</script>

<GdprBanner
	bind:this={banner}
	cookieName="cookieConsent"
	heading=""
	settingsLabel="Instellingen"
	closeLabel="Sluiten"
	description="Deze website maakt gebruik van cookies om je ervaring te verbeteren. Bekijk ons <a class='underline' href='/privacy-policy'>privacybeleid</a> voor meer informatie."
	showEditIcon={false}
	acceptLabel="Accepteer"
	acceptAllLabel="Accepteren"
	rejectLabel="Beperkt Accepteren"
	canRejectCookies={true}
	choices={{
		necessary: {
			label: 'Noodzakelijke cookies',
			description: 'Wordt gebruikt voor cookiecontrole. Kan niet worden uitgeschakeld.',
			value: true
		},
		tracking: {
			label: 'Trackingcookies',
			description: 'Gebruikt voor reclamedoeleinden.',
			value: true
		},
		analytics: {
			label: 'Analytische cookies',
			description:
				'Wordt gebruikt om Google Analytics te beheren, een tool van derden die door Google wordt aangeboden om gebruikersgedrag te volgen.',
			value: true
		},
		marketing: {
			label: 'Marketingcookies',
			description: 'Wordt gebruikt voor marketinggegevens.',
			value: true
		}
	}}
	on:analytics={onAnalytics}
/>
