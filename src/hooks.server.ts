import { getTextDirection } from '#lib/paraglide/runtime.js';
import { paraglideMiddleware } from '#lib/paraglide/server.js';

// https://claude.ai/share/49d0470a-66c6-4e41-8d47-b1dd91d538a8
import { type Handle, sequence } from '@sveltejs/kit/hooks';
type Event = Parameters<Handle>[0]['event'];

import { ADMIN_LOGIN, MODE } from '$app/env/private';
import { getPreview } from '#lib/utils/useKirby.js';
// import { getLang } from '#lib/utils/i18n.js';

// ─── Cache policy ────────────────────────────────────────────────────────────
const EDGE_TTL = 7200; // seconds Cloudflare may hold HTML; purging is the real invalidation

const CACHE = {
	// browsers and any other cache: always revalidate
	'cache-control': 'public, max-age=0, must-revalidate',
	// Cloudflare edge only
	'Cloudflare-CDN-Cache-Control': `max-age=${EDGE_TTL}`
};

const NO_CACHE = {
	'cache-control': 'private, no-store',
	'Cloudflare-CDN-Cache-Control': 'no-store'
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const isAuthorized = (request: Request): boolean =>
	request.headers.get('Authorization') === `Basic ${btoa(ADMIN_LOGIN)}`;

// Responses this hook should not touch at all
const isPassThrough = (event: Event, response: Response): boolean =>
	event.url.pathname.startsWith('/_app/') || response.status === 304;

const isCacheable = (event: Event, response: Response): boolean =>
	// MODE === 'production' &&
	// enable once staging testing is done
	['GET', 'HEAD'].includes(event.request.method) &&
	!getPreview(event.url) &&
	response.status === 200 &&
	!response.headers.has('set-cookie');

const setHeaders = (response: Response, headers: Record<string, string>): void => {
	for (const [key, value] of Object.entries(headers)) response.headers.set(key, value);
};

// ─── Hook ────────────────────────────────────────────────────────────────────
const originalHandle: Handle = async ({ event, resolve }) => {
	// 1. Staging gate
	if (MODE !== 'production' && !isAuthorized(event.request)) {
		return new Response('Not authorized', {
			status: 401,
			headers: {
				'WWW-Authenticate': 'Basic realm="User Visible Realm", charset="UTF-8"',
				...NO_CACHE
			}
		});
	}

	// 2. Per-request state: 'site' is the default tag, load functions can add more
	event.locals.cacheTags = new Set(['site']);

	// 3. Render, with <html lang="%lang%"> filled in
	// replaced by paraglide.js add-on
	// const lang = getLang(event.params);
	const response = await resolve(event, {
		// transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});

	// 4. Leave hashed assets and 304s alone
	if (isPassThrough(event, response)) return response;

	// 5. Set cache headers
	if (isCacheable(event, response)) {
		setHeaders(response, {
			...CACHE,
			'Cache-Tag': [...event.locals.cacheTags].join(',')
		});
	} else {
		setHeaders(response, NO_CACHE);
	}

	return response;
};

// paraglide (i18n)
const handleParaglide: Handle = ({ event, resolve }) => paraglideMiddleware(event.request, ({ request, locale }) => {
	return resolve({ ...event, request }, {
		transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale).replace('%paraglide.dir%', getTextDirection(locale))
	});
});

export const handle = sequence(originalHandle, handleParaglide);
