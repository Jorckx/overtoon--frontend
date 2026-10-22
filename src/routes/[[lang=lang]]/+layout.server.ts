import { useKqlQuery } from '#lib/utils/useKirby.ts';
import { getLang } from '#lib/utils/i18n.ts';
import { globalMetaQuery, siteQuery } from '#lib/queries/index.ts';
import { dev } from '$app/env';

let devmode = false;
if (dev) {
	devmode = true;
}
export async function load({ url, params }) {
	const lang = getLang(params);
	// retun for static files like favicon.ico
	if (url.pathname.includes('.')) return { devmode, lang };
	try {
		const [siteData, seoGlobal] = await Promise.all([
			useKqlQuery(siteQuery, lang),
			useKqlQuery(globalMetaQuery, lang)
		]);
		return {
			lang: lang,
			// seo data
			seoGlobal: seoGlobal,
			// global site data
			siteData: siteData,
			devmode: devmode,
			metamessage: url.pathname.slice(1)
		};
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : 'Unknown error';
		return {
			lang: lang,
			seoGlobal: null,
			siteData: null,
			devmode: devmode,
			metamessage: url.pathname.slice(1),
			error: errorMessage
		};
	}
}
