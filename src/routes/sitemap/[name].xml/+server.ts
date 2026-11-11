import { error } from '@sveltejs/kit';
import { SITEMAPS, kqlSitemap, urlset, xmlResponse } from '#lib/utils/sitemap.js';

export async function GET({ params }) {
	const config = SITEMAPS[params.name as keyof typeof SITEMAPS];
	if (!config) error(404, 'Sitemap not found');

	const entries = await kqlSitemap(config.query, {
		prefix: 'prefix' in config ? config.prefix : ''
	});
	return xmlResponse(urlset(entries));
}
