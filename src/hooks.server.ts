import { ADMIN_LOGIN, MODE } from '$app/env/private';
import type { Handle } from '@sveltejs/kit/hooks';
import { getLang } from '#lib/utils/i18n.ts';

// Sets <html lang="%lang%"> from the URL language
export const handle: Handle = ({ event, resolve }) => {
	if (MODE !== 'production') {
		const auth = event.request.headers.get('Authorization');
		if (auth !== `Basic ${btoa(ADMIN_LOGIN)}`) {
			return new Response('Not authorized', {
				status: 401,
				headers: {
					'WWW-Authenticate': 'Basic realm="User Visible Realm", charset="UTF-8"'
				}
			});
		}
	}

	const lang = getLang(event.params);
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
