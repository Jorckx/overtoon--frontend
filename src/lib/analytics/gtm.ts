const GTM_ID = 'GTM-TZGZNDV2';

declare global {
	interface Window {
		dataLayer: Record<string, unknown>[];
	}
}

function push(entry: Record<string, unknown>) {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push(entry);
}

export function initGtm() {
	// default consent first, then load GTM
	push({
		event: 'gtm.consent',
		'gtm.consent.default': {
			ad_storage: 'denied',
			ad_user_data: 'denied',
			ad_personalization: 'denied',
			analytics_storage: 'denied',
			functionality_storage: 'granted',
			security_storage: 'granted',
			wait_for_update: 500
		}
	});

	push({ 'gtm.start': Date.now(), event: 'gtm.js' });
	const script = document.createElement('script');
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
	document.head.appendChild(script);
}

export function grantConsent() {
	push({
		event: 'gtm.consent',
		'gtm.consent.update': {
			ad_storage: 'granted',
			analytics_storage: 'granted',
			ad_user_data: 'granted',
			ad_personalization: 'granted'
		}
	});
}
