import type { Handle } from '@sveltejs/kit/hooks';
import { getLang } from '#lib/utils/i18n.ts';

// Sets <html lang="%lang%"> from the URL language
export const handle: Handle = ({ event, resolve }) => {
	const lang = getLang(event.params);
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
