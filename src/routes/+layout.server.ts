// import { posts } from '$lib/queries/data.ts';
import { useKqlQuery } from '#lib/utils/useKirby.ts';
import { getMetaQuery, globalMetaQuery, siteQuery } from '#lib/queries/index.ts';
import { dev } from '$app/env';

let devmode = false;
if (dev) {
	devmode = true;
}
export async function load({ url }) {
	const { pathname } = url;
	// retun for static files like favicon.ico
	if (pathname.includes('.')) return { devmode };
	// resolve path to match kirby collection slugs
  try {
    const siteData = await useKqlQuery(siteQuery)
		const seoData = await useKqlQuery(getMetaQuery(pathname));
		const seoGlobal = await useKqlQuery(globalMetaQuery);
		return {
			// seo data
			seoData: seoData,
			seoGlobal: seoGlobal,
			// global site data
			siteData: siteData,
			devmode: devmode,
			metamessage: url.pathname.slice(1)
		};
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : 'Unknown error';
		return {
			seoData: null,
			seoGlobal: null,
			siteData: null,
			devmode: devmode,
			metamessage: url.pathname.slice(1),
			error: errorMessage
		};
	}
}
